# app/models/prediction_model.py
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Union, Any

class MalnutritionInput(BaseModel):
    # Define your input features here with proper validation
    # Example (replace with your actual features):
    age_months: float = Field(..., description="Age in months", ge=0, le=60)
    weight_kg: float = Field(..., description="Weight in kilograms", gt=0)
    height_cm: float = Field(..., description="Height in centimeters", gt=0)
    muac_cm: Optional[float] = Field(None, description="Mid-upper arm circumference in cm")
    # Add all other features your model needs
    
    class Config:
        schema_extra = {
            "example": {
                "age_months": 24,
                "weight_kg": 9.5,
                "height_cm": 80.0,
                "muac_cm": 13.2,
                # Add example values for other features
            }
        }

class MalnutritionOutput(BaseModel):
    predicted_class: str
    confidence: float
    class_probabilities: Dict[str, float]
    timestamp: str