from pydantic import BaseModel, Field, validator, root_validator
from typing import List, Dict, Optional, Union

class MalnutritionInput(BaseModel):
    Sex: int = Field(..., ge=0, le=1, description="Gender (0=Female, 1=Male)")
    Age: float = Field(..., ge=0, le=60, description="Age in months")
    Height: float = Field(..., gt=0, description="Height in cm")
    Weight: float = Field(..., gt=0, description="Weight in kg")
    height_for_age_z: Optional[float] = Field(None, description="Height for age z-score")
    weight_for_height_z: Optional[float] = Field(None, description="Weight for height z-score")
    weight_for_age_z: Optional[float] = Field(None, description="Weight for age z-score")
    Height_m: Optional[float] = Field(None, description="Height in meters")
    BMI: Optional[float] = Field(None, description="Body Mass Index")
    WHR: Optional[float] = Field(None, description="Waist-to-Hip Ratio")
    
    @root_validator(pre=True)
    def calculate_derived_fields(cls, values):
        # Only calculate if we have the necessary base measurements
        if "Height" in values and values["Height"] and "Weight" in values and values["Weight"]:
            # Calculate Height_m if not provided
            if "Height_m" not in values or values["Height_m"] is None:
                values["Height_m"] = values["Height"] / 100.0
                
            # Calculate BMI if not provided
            if "BMI" not in values or values["BMI"] is None:
                height_m = values["Height"] / 100.0
                values["BMI"] = values["Weight"] / (height_m ** 2)
                
        return values
    
    class Config:
        validate_assignment = True
        extra = "ignore"  # Ignore extra fields that might be sent

class MalnutritionOutput(BaseModel):
    predicted_class: str
    confidence: float
    class_probabilities: Dict[str, float]
    timestamp: str