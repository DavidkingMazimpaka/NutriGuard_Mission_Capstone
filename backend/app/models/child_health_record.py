from sqlalchemy import JSON, Column, Integer, Float, String, DateTime, Text
from sqlalchemy.orm import declarative_base
import datetime

Base = declarative_base()

class ChildHealthRecord(Base):
    __tablename__ = "child_health_records"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sex = Column(String, nullable=False)  # "Male" or "Female"
    age = Column(Integer, nullable=False)
    height = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    height_for_age_z = Column(Float, nullable=False)
    weight_for_height_z = Column(Float, nullable=False)
    weight_for_age_z = Column(Float, nullable=False)
    height_m = Column(Float, nullable=False)
    bmi = Column(Float, nullable=False)
    whr = Column(Float, nullable=False)
    photo_data = Column(Text, nullable=True)  # Store base64 image data
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    predicted_class = Column(String, nullable=True)
    confidence = Column(Float, nullable=True)
    class_probabilities = Column(JSON, nullable=True)

