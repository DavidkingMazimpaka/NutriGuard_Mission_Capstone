from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from ..auth.auth_handler import auth_handler

# Create router
router = APIRouter()

# Database connection
DB_CONNECTION_STRING = "dbname=NutriGuard user=lolo password=lolo@123 host=localhost"

def get_db_connection():
    """Get a database connection"""
    conn = psycopg2.connect(DB_CONNECTION_STRING)
    conn.cursor_factory = RealDictCursor
    return conn

# Authentication models
class UserLogin(BaseModel):
    username: str
    password: str

class UserRegistration(BaseModel):
    username: str
    email: str
    password: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None
    role: str

# Authentication routes
@router.post("/register", response_model=UserResponse)
async def register_user(user: UserRegistration):
    """Register a new user"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Check if username already exists
        cursor.execute("SELECT * FROM users WHERE username = %s", (user.username,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Username already exists")
            
        # Check if email already exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Email already exists")
            
        # Hash the password
        hashed_password = auth_handler.get_password_hash(user.password)
        
        # Insert new user
        cursor.execute(
            """
            INSERT INTO users (username, email, password, full_name, role)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING username, email, full_name, role
            """,
            (user.username, user.email, hashed_password, user.full_name, "user")
        )
        
        new_user = cursor.fetchone()
        conn.commit()
        
        return dict(new_user)
        
    except HTTPException as e:
        raise e
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Error registering user: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.post("/login")
async def login(user: UserLogin):
    """Login a user"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Find user by username
        cursor.execute("SELECT * FROM users WHERE username = %s", (user.username,))
        db_user = cursor.fetchone()
        
        if not db_user:
            raise HTTPException(status_code=401, detail="Invalid username or password")
            
        # Verify password
        if not auth_handler.verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Invalid username or password")
            
        # Generate tokens
        tokens = auth_handler.encode_token(str(db_user["id"]), db_user["role"])
        
        return tokens
        
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error logging in: {str(e)}")
    finally:
        cursor.close()
        conn.close()

@router.post("/refresh")
async def refresh_token(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    """Refresh an access token"""
    try:
        refresh_token = credentials.credentials
        new_token = auth_handler.refresh_access_token(refresh_token)
        return new_token
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error refreshing token: {str(e)}")

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(user = Depends(auth_handler.get_current_user)):
    """Get current user information"""
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Get user info from database
        cursor.execute("SELECT username, email, full_name, role FROM users WHERE id = %s", (user["user_id"],))
        db_user = cursor.fetchone()
        
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return dict(db_user)
        
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting user info: {str(e)}")
    finally:
        cursor.close()
        conn.close()