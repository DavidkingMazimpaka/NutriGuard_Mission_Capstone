from fastapi import APIRouter, HTTPException, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.child_health_record import ChildHealthRecord
import datetime
from typing import Optional
from pydantic import BaseModel, Field
import logging
import os
import shutil

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model for input validation (without photoUrl)
class ChildCreate(BaseModel):
    name: str = Field(..., min_length=1, description="Child's name is required")
    sex: int = Field(..., ge=0, le=1, description="Sex should be 0 (Female) or 1 (Male)")
    age: int = Field(..., ge=0, description="Age should be a positive integer")
    height: float = Field(..., gt=0, description="Height should be a positive number")
    weight: float = Field(..., gt=0, description="Weight should be a positive number")
    height_for_age_z: float
    weight_for_height_z: float
    weight_for_age_z: float
    whr: float = Field(..., ge=0, description="WHR should be non-negative")


@router.post("")
async def create_child_record(
    name: str = Form(...),
    sex: int = Form(...),
    age: int = Form(...),
    height: float = Form(...),
    weight: float = Form(...),
    height_for_age_z: float = Form(...),
    weight_for_height_z: float = Form(...),
    weight_for_age_z: float = Form(...),
    whr: float = Form(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Stores child health data in the database for future model training.
    """
    try:
        # Convert sex from numeric (0/1) to string (Female/Male) for database storage
        sex_str = "Male" if sex == 1 else "Female"

        # Calculate BMI
        height_in_meters = height / 100  # Convert height to meters
        bmi = weight / (height_in_meters ** 2)  # BMI formula

        # Save the uploaded photo
        if not os.path.exists("images"):
            os.makedirs("images")
        
        # Generate a unique file path
        file_path = f'images/{name}_{datetime.datetime.utcnow().strftime("%Y%m%d%H%M%S")}.jpg'
        
        # Save the file securely without decoding
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        
        # Create a new child health record
        new_record = ChildHealthRecord(
            name=name,
            sex=sex_str,
            age=age,
            height=height,
            weight=weight,
            height_for_age_z=height_for_age_z,
            weight_for_height_z=weight_for_height_z,
            weight_for_age_z=weight_for_age_z,
            height_m=height_in_meters,
            bmi=bmi,
            whr=whr,
            created_at=datetime.datetime.utcnow(),
            photo_url=file_path  # Store the path in DB
        )
        
        # Add to database and commit
        db.add(new_record)
        db.commit()
        db.refresh(new_record)

        return {"message": "Child health record stored successfully", "id": new_record.id}

    except Exception as e:
        logging.error(f"Error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="An error occurred. Please try again.")
