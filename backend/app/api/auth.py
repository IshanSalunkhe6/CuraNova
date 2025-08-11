from fastapi import APIRouter, HTTPException, Response, Depends, Request, status
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.core.security import (
    hash_password,
    verify_password,
    create_token,
    decode_token,
    COOKIE_NAME,
    cookie_kwargs,
)
from app.models.user import UserIn, UserLogin, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])

# -----------------------------
# MongoDB client (singleton)
# -----------------------------
_mongo_client: AsyncIOMotorClient | None = None
_db = None

def _get_db_ref():
    """Create (once) and return the selected database (by name) from the URI."""
    global _mongo_client, _db
    if _mongo_client is None:
        _mongo_client = AsyncIOMotorClient(settings.MONGODB_URI)
        # Explicit DB selection so URI doesn't need to include /<db>
        _db = _mongo_client.get_database(settings.DB_NAME)
    return _db

# FastAPI dependency
async def get_db():
    yield _get_db_ref()

def to_user_out(doc) -> UserOut:
    return UserOut(id=str(doc["_id"]), name=doc["name"], email=doc["email"])

@router.post("/signup", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def signup(payload: UserIn, res: Response, db=Depends(get_db)):
    users = db["users"]
    existing = await users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered")

    hashed = hash_password(payload.password)
    doc = {"name": payload.name, "email": payload.email, "password": hashed}
    result = await users.insert_one(doc)
    doc["_id"] = result.inserted_id

    token = create_token({"id": str(result.inserted_id), "email": payload.email, "name": payload.name})
    res.set_cookie(key=COOKIE_NAME, value=token, **cookie_kwargs())
    return to_user_out(doc)

@router.post("/signin", response_model=UserOut)
async def signin(payload: UserLogin, res: Response, db=Depends(get_db)):
    users = db["users"]
    doc = await users.find_one({"email": payload.email})
    if not doc or not verify_password(payload.password, doc["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_token({"id": str(doc["_id"]), "email": doc["email"], "name": doc["name"]})
    res.set_cookie(key=COOKIE_NAME, value=token, **cookie_kwargs())
    return to_user_out(doc)

@router.post("/signout")
async def signout(res: Response):
    res.delete_cookie(COOKIE_NAME, path="/")
    return {"ok": True}

@router.get("/me")
async def me(req: Request):
    token = req.cookies.get(COOKIE_NAME)
    if not token:
        return {"user": None}
    return {"user": decode_token(token)}
