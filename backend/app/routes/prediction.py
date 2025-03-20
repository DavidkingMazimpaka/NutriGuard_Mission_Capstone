from fastapi import APIRouter, HTTPException, Depends
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
async def predict_malnutrition_api(input_data: MalnutritionInput, db: Session = Depends(get_db)):
    """
    Predicts malnutrition status based on input measurements.
    Returns malnutrition classification as Critical, High, Moderate, or Low.
    """
    try:
        # Convert sex from numeric (0/1) to string (Female/Male) for database storage
        sex_str = "Male" if input_data.Sex == 1 else "Female"
        
        # Create a new record using your existing ChildHealthRecord model
        new_record = ChildHealthRecord(
            name="Anonymous",  # Since your model requires a name field
            sex=sex_str,  # Store as string in database
            age=int(input_data.Age),  # Convert to int as your model expects
            height=input_data.Height,
            weight=input_data.Weight,
            height_for_age_z=input_data.height_for_age_z,
            weight_for_height_z=input_data.weight_for_height_z,
            weight_for_age_z=input_data.weight_for_age_z,
            height_m=input_data.Height_m,
            bmi=input_data.BMI,
            whr=input_data.WHR
        )
        
        # Add to database and commit
        db.add(new_record)
        db.commit()
        db.refresh(new_record)

        # Prepare data for ML model - use numeric Sex value for prediction
        features = [
            input_data.Sex,  # Keep as numeric (0/1) for the ML model
            input_data.Age, 
            input_data.Height, 
            input_data.Weight,
            input_data.height_for_age_z, 
            input_data.weight_for_height_z,
            input_data.weight_for_age_z, 
            input_data.Height_m, 
            input_data.BMI, 
            input_data.WHR
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