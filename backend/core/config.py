import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "IPL Performance Analytics API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # SECURITY WARNING: keep the secret key used in production secret!
    SECRET_KEY: str = os.getenv("SECRET_KEY", "b3a5d8f61c2847a9e045b12c7d9a8b41f3e7a1b5c9d2f8e6c4b2a1d0f5e7a9b3")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 days
    
    # Database
    # Using SQLite for simplicity, but can be easily changed to PostgreSQL/MongoDB
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./ipl_analytics.db")

settings = Settings()
