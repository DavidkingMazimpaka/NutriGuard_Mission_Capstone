from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.models.prediction_model import MalnutritionInput, MalnutritionOutput
from app.models.ml_model import predict_malnutrition
from app.database.database import SessionLocal
from app.routes.children import ChildHealthRecord  # Import your existing model
import datetime
from typing import Optional
from pydantic import ValidationError

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/predict", response_model=MalnutritionOutput)
async def predict_malnutrition_api(child_id: int = Query(...), db: Session = Depends(get_db)):
    """
    Predicts malnutrition status based on input measurements from the database.
    Returns malnutrition classification as Critical, High, Moderate, or Low.
    """
    try:
        # Fetch the child's health record from the database
        record = db.query(ChildHealthRecord).filter(ChildHealthRecord.id == child_id).first()
        
        if not record:
            raise HTTPException(status_code=404, detail="Child health record not found")

        # Prepare data for ML model - use numeric Sex value for prediction
        sex_numeric = 1 if record.sex.lower() == "male" else 0
        features = [
            sex_numeric,  # Convert sex to numeric (0/1) for the ML model
            record.age, 
            record.height, 
            record.weight,
            record.height_for_age_z, 
            record.weight_for_height_z,
            record.weight_for_age_z, 
            record.height_m, 
            record.bmi, 
            record.whr
        ]

        # Get prediction from ML model
        predicted_class, confidence, class_probabilities = predict_malnutrition(features)

        return MalnutritionOutput(
            predicted_class=predicted_class,
            confidence=confidence,
            class_probabilities=class_probabilities,
            timestamp=str(datetime.datetime.now())
        )

    except ValidationError as e:
        # Handle Pydantic validation errors
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.get("/model-info")
async def get_model_info():
    """Returns information about the malnutrition prediction model"""
    return {"model": "Malnutrition Detection Model", "version": "1.0"}