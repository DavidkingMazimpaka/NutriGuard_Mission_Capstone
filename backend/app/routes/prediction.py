from fastapi import APIRouter, HTTPException
from app.models.prediction_model import PredictionInput, PredictionOutput
from app.models.ml_model import get_model_instance

router = APIRouter(
    prefix="/predict",
    tags=["prediction"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=PredictionOutput)
async def predict(input_data: PredictionInput):
    try:
        # Get model instance
        model = get_model_instance()
        
        # Convert Pydantic model to dict
        input_dict = input_data.dict()
        
        # Make prediction
        prediction, probability, features = model.predict(input_dict)
        
        # Create response
        response = PredictionOutput(
            prediction=prediction,
            probability=probability,
            input_data=input_data,
            features=features
        )
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")