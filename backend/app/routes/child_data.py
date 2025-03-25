from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.models.prediction_model import MalnutritionOutput
from app.models.ml_model import predict_malnutrition
from app.database.database import SessionLocal
from app.routes.children import ChildHealthRecord 
from app.schemas.child_response import ChildHealthResponse  
from typing import List
from pydantic import ValidationError

router = APIRouter()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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
            # Prepare data for ML model
            sex_numeric = 1 if record.sex.lower() == "male" else 0
            features = [
                sex_numeric,
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

            # Create response object combining record data and predictions
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
                photo_url=record.photo_url,
                created_at=record.created_at,
                predicted_class=predicted_class,
                confidence=confidence,
                class_probabilities=class_probabilities
            )

            predictions.append(prediction)

        return predictions

    except ValidationError as e:
        raise HTTPException(status_code=422, detail=f"Validation error: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.get("/model-info")
async def get_model_info():
    """Returns information about the malnutrition prediction model"""
    return {
        "model": "Malnutrition Detection Model",
        "version": "1.0",
        "classes": ["normal", "moderate", "high", "critical"]
    }