from sqlalchemy import Column, Integer, Float, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database.database import Base

class ChildHealthRecord(Base):
    __tablename__ = "child_health_records"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    sex = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    height = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    height_for_age_z = Column(Float, nullable=False)
    weight_for_height_z = Column(Float, nullable=False)
    weight_for_age_z = Column(Float, nullable=False)
    height_m = Column(Float, nullable=False)
    bmi = Column(Float, nullable=False)
    whr = Column(Float, nullable=False)
    photo_url = Column(String, nullable=True)
    created_at = Column(String, nullable=False)

    predictions = relationship("ChildHealthPrediction", back_populates="child")

class ChildHealthPrediction(Base):
    __tablename__ = "child_health_predictions"
    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_health_records.id"))
    predicted_class = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    class_probabilities = Column(JSON, nullable=False)
    
    child = relationship("ChildHealthRecord", back_populates="predictions")
