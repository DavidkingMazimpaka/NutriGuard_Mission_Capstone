from fastapi import APIRouter, HTTPException, Depends, File, Form, UploadFile
from sqlalchemy.orm import Session
from app.database.database import SessionLocal
from app.models.child_health_record import ChildHealthRecord
from app.models.ml_model import predict_malnutrition
from app.schemas.child_response import ChildHealthResponse
import datetime
from typing import List
from pydantic import BaseModel, Field, ValidationError
import logging
import os
import shutil
import base64
from fastapi.responses import Response
from io import BytesIO

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

@router.post("/predict")
async def create_and_train_child_record(
    name: str = Form(...),
    sex: int = Form(...),
    age: int = Form(...),
    height: float = Form(...),
    weight: float = Form(...),
    height_for_age_z: float = Form(...),
    weight_for_height_z: float = Form(...),
    weight_for_age_z: float = Form(...),
    whr: float = Form(...),
    photo_data: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Stores child health data in the database, trains the model with the data, and saves the prediction results.
    """
    try:
        # Convert sex from numeric (0/1) to string (Female/Male) for database storage
        sex_str = "Male" if sex == 1 else "Female"

        # Calculate BMI
        height_in_meters = height / 100  # Convert height to meters
        bmi = weight / (height_in_meters ** 2)  # BMI formula

        # Read and convert image to base64
        image_content = await photo_data.read()
        # Convert memoryview to bytes before base64 encoding
        image_bytes = bytes(image_content)
        base64_image = base64.b64encode(image_bytes).decode('utf-8')
        
        # Prepare data for ML model
        sex_numeric = 1 if sex == 1 else 0
        features = [
            sex_numeric,
            age,
            height,
            weight,
            height_for_age_z,
            weight_for_height_z,
            weight_for_age_z,
            height_in_meters,
            bmi,
            whr
        ]

        # Get prediction from ML model
        predicted_class, confidence, class_probabilities = predict_malnutrition(features)

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
            photo_data=base64_image,  # Store base64 string
            predicted_class=predicted_class,
            confidence=confidence,
            class_probabilities=class_probabilities
        )
        
        # Add to database and commit
        db.add(new_record)
        db.commit()
        db.refresh(new_record)

        # Create response with base64 image data
        response_data = {
            "id": new_record.id,
            "name": new_record.name,
            "sex": new_record.sex,
            "age": new_record.age,
            "height": new_record.height,
            "weight": new_record.weight,
            "height_for_age_z": new_record.height_for_age_z,
            "weight_for_height_z": new_record.weight_for_height_z,
            "weight_for_age_z": new_record.weight_for_age_z,
            "height_m": new_record.height_m,
            "bmi": new_record.bmi,
            "whr": new_record.whr,
            "photo_data": base64_image,  # Send base64 string in response
            "created_at": new_record.created_at,
            "predicted_class": new_record.predicted_class,
            "confidence": new_record.confidence,
            "class_probabilities": new_record.class_probabilities
        }

        return response_data

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logging.error(f"Error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="An error occurred. Please try again.")

@router.get("/child/{child_id}", response_model=List[ChildHealthResponse])
async def get_child_predictions(child_id: int, db: Session = Depends(get_db)):
    """
    Retrieves all health records for a specific child and their prediction classes.
    """
    try:
        # Fetch all health records for the specified child_id
        records = db.query(ChildHealthRecord).filter(ChildHealthRecord.id == child_id).all()
        
        if not records:
            raise HTTPException(status_code=404, detail="Child health records not found")

        predictions = []

        for record in records:
            # Convert photo_data to base64 string if it exists
            photo_data = record.photo_data
            if isinstance(photo_data, (bytes, memoryview)):
                photo_data = base64.b64encode(bytes(photo_data)).decode('utf-8')

            prediction = ChildHealthResponse(
                id=record.id,
                name=record.name,
                sex=record.sex,
                age=record.age,
                height=record.height,
                weight=record.weight,
                height_for_age_z=record.height_for_age_z,
                weight_for_height_z=record.weight_for_height_z,
                weight_for_age_z=record.weight_for_age_z,
                height_m=record.height_m,
                bmi=record.bmi,
                whr=record.whr,
                photo_data=photo_data,  # Now it's always a string
                created_at=record.created_at,
                predicted_class=record.predicted_class,
                confidence=record.confidence,
                class_probabilities=record.class_probabilities
            )

            predictions.append(prediction)

        return predictions

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logging.error(f"Prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Prediction error")

@router.get("/image/{child_id}")
async def get_image(child_id: int, db: Session = Depends(get_db)):
    """
    Retrieves and serves the image for a specific child record.
    """
    try:
        # Get the child record from the database
        child_record = db.query(ChildHealthRecord).filter(ChildHealthRecord.id == child_id).first()
        
        if not child_record or not child_record.photo_data:
            raise HTTPException(status_code=404, detail="Image not found")
        
        # Convert base64 back to image data
        image_data = base64.b64decode(child_record.photo_data)
        
        # Return the image with appropriate content type
        return Response(content=image_data, media_type="image/jpeg")
    except Exception as e:
        logging.error(f"Error retrieving image: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Error retrieving image")

@router.get("/model-info")
async def get_model_info():
    """Returns information about the malnutrition prediction model"""
    return {
        "model": "Malnutrition Detection Model",
        "version": "1.0",
        "classes": ["normal", "moderate", "high", "critical"]
    }