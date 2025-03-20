from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
from app.database.database import SessionLocal
from sqlalchemy.orm import Session 
import logging
from ..auth.auth_handler import auth_handler
from app.models.users import User

# Create router
router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication models
class UserLogin(BaseModel):
    username: str
    password: str

class UserRegistration(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str
    role: str

# Authentication routes
@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegistration, db: Session = Depends(get_db)):
    """Register a new user"""
    # Check if username already exists
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Check if email already exists
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Hash the password
    hashed_password = auth_handler.get_password_hash(user.password)

    # Create new user
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserResponse(
        username=new_user.username,
        email=new_user.email,
        role=new_user.role
    )

@router.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    """Login a user"""
    # Find user by username
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # Verify password
    if not auth_handler.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    # Generate tokens
    tokens = auth_handler.encode_token(str(db_user.id), db_user.role)
    return tokens

@router.post("/refresh")
async def refresh_token(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    """Refresh an access token"""
    try:
        refresh_token = credentials.credentials
        new_token = auth_handler.refresh_access_token(refresh_token)
        return new_token
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refreshing token: {str(e)}")

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(user=Depends(auth_handler.get_current_user), db: Session = Depends(get_db)):
    """Get current user information"""
    db_user = db.query(User).filter(User.id == user["user_id"]).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    return UserResponse(
        username=db_user.username,
        email=db_user.email,
        full_name=db_user.full_name,
        role=db_user.role
    )