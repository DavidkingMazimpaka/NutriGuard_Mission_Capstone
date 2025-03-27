from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.database import SessionLocal
from app.models.child_health_record import ChildHealthRecord
from app.schemas.child_response import ChildHealthResponse
import base64
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/children", response_model=List[ChildHealthResponse])
async def get_all_children(db: Session = Depends(get_db)):
    """
    Retrieves all children from the database.
    """
    try:
        children = db.query(ChildHealthRecord).all()
        if not children:
            return []

        # Convert each record to include properly formatted photo_data
        formatted_children = []
        for child in children:
            # Convert photo_data to base64 string if it exists
            photo_data = child.photo_data
            if isinstance(photo_data, (bytes, memoryview)):
                # Add the data URL prefix for images
                photo_data = f"data:image/jpeg;base64,{base64.b64encode(bytes(photo_data)).decode('utf-8')}"

            formatted_child = ChildHealthResponse(
                id=child.id,
                name=child.name,
                sex=child.sex,
                age=child.age,
                height=child.height,
                weight=child.weight,
                height_for_age_z=child.height_for_age_z,
                weight_for_height_z=child.weight_for_height_z,
                weight_for_age_z=child.weight_for_age_z,
                height_m=child.height_m,
                bmi=child.bmi,
                whr=child.whr,
                photo_data=photo_data,  # Now it's always a string
                created_at=child.created_at,
                predicted_class=child.predicted_class,
                confidence=child.confidence,
                class_probabilities=child.class_probabilities
            )
            formatted_children.append(formatted_child)

        return formatted_children
    except Exception as e:
        logging.error(f"Error retrieving children: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error retrieving children: {str(e)}")