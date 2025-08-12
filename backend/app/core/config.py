from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseModel):

    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017")
    # Explicit DB name (so we don't rely on /<db> in the URI)
    DB_NAME: str = os.getenv("DB_NAME", "medai")

    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev_secret_change_me")
    ENV: str = os.getenv("ENV", "development")

settings = Settings()
