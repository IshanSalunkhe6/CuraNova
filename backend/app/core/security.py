import time, jwt, bcrypt
from app.core.config import settings

JWT_ALG = "HS256"
COOKIE_NAME = "auth_token"

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def create_token(payload: dict, exp_seconds: int = 60*60*24*7) -> str:
    to_encode = {**payload, "exp": int(time.time()) + exp_seconds}
    return jwt.encode(to_encode, settings.JWT_SECRET, algorithm=JWT_ALG)

def decode_token(token: str):
    try:
        return jwt.decode(token, settings.JWT_SECRET, algorithms=[JWT_ALG])
    except Exception:
        return None

def cookie_kwargs():
    """
    In production (ENV=production), set Secure cookies; in dev keep non-secure for localhost.
    """
    is_prod = (settings.ENV or "").lower() == "production"
    return dict(
        httponly=True,
        samesite="lax",
        secure=is_prod,   # requires HTTPS (Vercel/Render) in prod
        path="/",
    )
