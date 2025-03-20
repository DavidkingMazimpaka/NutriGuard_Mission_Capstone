from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.child_health_record import ChildHealthRecord
import datetime
from typing import Optional
from pydantic import BaseModel, ValidationError
import logging

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

# Pydantic model for input validation
class ChildCreate(BaseModel):
    name: str 
    sex: int  # 0 = Female, 1 = Male
    age: int
    height: float
    weight: float
    height_for_age_z: float
    weight_for_height_z: float
    weight_for_age_z: float
    whr: float

@router.post("/api/children/")
async def create_child_record(input_data: ChildCreate, db: Session = Depends(get_db)):
    """
    Stores child health data in the database for future model training.
    """
    try:
        # Calculate BMI using the formula
        height_in_meters = input_data.height / 100  # Convert height to meters
        bmi = input_data.weight / (height_in_meters ** 2)  # Calculate BMI
        
        # Convert sex from numeric (0/1) to string (Female/Male) for database storage
        sex_str = "Male" if input_data.sex == 1 else "Female"

        new_record = ChildHealthRecord(
            name=input_data.name,  # Placeholder name
            sex=sex_str,
            age=input_data.age,
            height=input_data.height,
            weight=input_data.weight,
            height_for_age_z=input_data.height_for_age_z,
            weight_for_height_z=input_data.weight_for_height_z,
            weight_for_age_z=input_data.weight_for_age_z,
            height_m=height_in_meters,
            bmi=bmi,
            whr=input_data.whr,
            created_at=datetime.datetime.utcnow()  # Use UTC time
        )
        
        # Add to database and commit
        db.add(new_record)
        db.commit()
        db.refresh(new_record)

        return {"message": "Child health record stored successfully", "id": new_record.id}

    except ValidationError as e:
        logging.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except Exception as e:
        logging.error(f"Database error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")