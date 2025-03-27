from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChildHealthResponse(BaseModel):
    id: int
    name: str
    sex: str
    age: int
    height: float
    weight: float
    height_for_age_z: float
    weight_for_height_z: float
    weight_for_age_z: float
    height_m: float
    bmi: float
    whr: float
    photo_data: Optional[str] = None  # Base64 encoded string
    created_at: datetime
    predicted_class: str
    confidence: float
    class_probabilities: dict

    class Config:
        from_attributes = True