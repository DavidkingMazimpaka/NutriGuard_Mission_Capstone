from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database.database import SessionLocal
from app.models.child_health_record import ChildHealthRecord
from app.schemas.child_health_record import ChildHealthRecordSchema

router = APIRouter()


# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/children", response_model=List[ChildHealthRecordSchema])
async def get_all_children(db: Session = Depends(get_db)):
    """
    Retrieves all children from the database.
    """
    try:
        children = db.query(ChildHealthRecord).all()
        if not children:
            return []
        return children
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving children: {str(e)}")