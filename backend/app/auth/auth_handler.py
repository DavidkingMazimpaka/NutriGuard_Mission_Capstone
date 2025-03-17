import jwt
import time
from typing import Dict, Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi import HTTPException, Security, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import os

# Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")  # Change in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security bearer scheme for JWT
security = HTTPBearer()

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None

class AuthHandler:
    def __init__(self):
        self.secret_key = SECRET_KEY
        self.algorithm = ALGORITHM
        
    def get_password_hash(self, password: str) -> str:
        """Hash a password for storing"""
        return pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hashed password"""
        return pwd_context.verify(plain_password, hashed_password)
        
    def encode_token(self, user_id: str, role: str = "user") -> Dict[str, str]:
        """Create access and refresh tokens"""
        # Create access token payload
        access_payload = {
            'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
            'iat': datetime.utcnow(),
            'sub': user_id,
            'role': role,
            'type': 'access'
        }
        
        # Create refresh token payload
        refresh_payload = {
            'exp': datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
            'iat': datetime.utcnow(),
            'sub': user_id,
            'role': role,
            'type': 'refresh'
        }
        
        # Create tokens
        access_token = jwt.encode(access_payload, self.secret_key, algorithm=self.algorithm)
        refresh_token = jwt.encode(refresh_payload, self.secret_key, algorithm=self.algorithm)
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'bearer'
        }
        
    def decode_token(self, token: str) -> Dict:
        """Decode a JWT token"""
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token has expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid token')
            
    def refresh_access_token(self, refresh_token: str) -> Dict:
        """Create a new access token using a refresh token"""
        try:
            payload = self.decode_token(refresh_token)
            
            # Check if it's a refresh token
            if payload.get('type') != 'refresh':
                raise HTTPException(status_code=401, detail='Invalid refresh token')
                
            # Create new access token
            user_id = payload.get('sub')
            role = payload.get('role', 'user')
            
            access_payload = {
                'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
                'iat': datetime.utcnow(),
                'sub': user_id,
                'role': role,
                'type': 'access'
            }
            
            access_token = jwt.encode(access_payload, self.secret_key, algorithm=self.algorithm)
            
            return {
                'access_token': access_token,
                'token_type': 'bearer'
            }
            
        except HTTPException as e:
            raise e
        except Exception as e:
            raise HTTPException(status_code=401, detail=f'Error refreshing token: {str(e)}')
            
    def get_current_user(self, credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict:
        """Get the current authenticated user from the token"""
        token = credentials.credentials
        payload = self.decode_token(token)
        
        # Check if it's an access token
        if payload.get('type') != 'access':
            raise HTTPException(status_code=401, detail='Invalid access token')
            
        return {
            'user_id': payload.get('sub'),
            'role': payload.get('role', 'user')
        }
        
    def get_current_admin(self, credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict:
        """Get the current authenticated admin from the token"""
        user = self.get_current_user(credentials)
        
        # Check if user is an admin
        if user.get('role') != 'admin':
            raise HTTPException(status_code=403, detail='Insufficient permissions')
            
        return user


# Create an instance of AuthHandler
auth_handler = AuthHandler()