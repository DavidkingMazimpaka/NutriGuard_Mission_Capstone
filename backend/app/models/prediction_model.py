from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List, Union
from enum import Enum

class IncomeLevel(str, Enum):
    low = "low"
    lower_middle = "lower_middle"
    upper_middle = "upper_middle"

class Sex(str, Enum):
    male = "male"
    female = "female"

class PredictionInput(BaseModel):
    age: float = Field(..., description="Age in years")
    height: float = Field(..., description="Height in centimeters")
    weight: float = Field(..., description="Weight in kilograms")
    income_level: IncomeLevel = Field(..., description="Income level category")
    sex: Sex = Field(..., description="Biological sex")
    
    class Config:
        schema_extra = {
            "example": {
                "age": 25,
                "height": 165,
                "weight": 60,
                "income_level": "lower_middle",
                "sex": "female"
            }
        }

class PredictionOutput(BaseModel):
    prediction: str = Field(..., description="Predicted malnutrition status")
    probability: float = Field(..., description="Probability of the prediction")
    input_data: PredictionInput
    features: Dict[str, Any] = Field(..., description="Processed features used for prediction")