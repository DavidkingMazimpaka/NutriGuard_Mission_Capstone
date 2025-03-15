# app/routes/prediction.py
from fastapi import APIRouter, HTTPException, Depends
from app.models.prediction_model import MalnutritionInput, MalnutritionOutput
from app.models.ml_model import get_model

router = APIRouter()

@router.post("/predict", response_model=MalnutritionOutput)
async def predict_malnutrition(input_data: MalnutritionInput):
    """
    Predicts malnutrition status based on input measurements
    
    Returns malnutrition classification as Critical, High, Moderate, or Low
    """
    try:
        # Get model instance
        model = get_model()
        
        # Convert Pydantic model to dict
        features = input_data.dict()
        
        # Get prediction
        result = model.predict(features)
        
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.get("/model-info")
async def get_model_info():
    """Returns information about the malnutrition prediction model"""
    model = get_model()
    return model.get_model_info()