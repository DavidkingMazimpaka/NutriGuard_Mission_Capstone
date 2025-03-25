from sqlalchemy import Column, Integer, Float, String, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy import Text
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
    photo_url = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

