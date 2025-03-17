# app/models/prediction_model.py
from pydantic import BaseModel, Field
from typing import Dict, Optional

class MalnutritionInput(BaseModel):
    Sex: int = Field(..., description="Sex (0 for female, 1 for male)")
    Age: float = Field(..., description="Age in months")
    Height: float = Field(..., description="Height in cm")
    Weight: float = Field(..., description="Weight in kg")
    height_for_age_z: float = Field(..., description="Height-for-age Z-score")
    weight_for_height_z: float = Field(..., description="Weight-for-height Z-score")
    weight_for_age_z: float = Field(..., description="Weight-for-age Z-score")
    Height_m: float = Field(..., description="Height in meters")
    BMI: float = Field(..., description="Body Mass Index")
    WHR: float = Field(..., description="Weight-Height Ratio")
    
    class Config:
        schema_extra = {
            "example": {
                "Sex": 1,
                "Age": 24.0,
                "Height": 80.0,
                "Weight": 9.5,
                "height_for_age_z": -2.1,
                "weight_for_height_z": -1.8,
                "weight_for_age_z": -2.3,
                "Height_m": 0.8,
                "BMI": 14.8,
                "WHR": 0.12
            }
        }

class MalnutritionOutput(BaseModel):
    predicted_class: str
    confidence: float
    class_probabilities: Dict[str, float]
    timestamp: str