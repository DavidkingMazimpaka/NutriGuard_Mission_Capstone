# schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ChildHealthRecordSchema(BaseModel):
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
    photo_url: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True