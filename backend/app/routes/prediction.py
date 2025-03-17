from fastapi import APIRouter, HTTPException
from app.models.prediction_model import MalnutritionInput, MalnutritionOutput
from app.models.ml_model import predict_malnutrition
import psycopg2
import datetime

router = APIRouter()

# Connect to PostgreSQL
conn = psycopg2.connect("dbname=NutriGuard user=postgres password='lolo@123' host=localhost port=5432")
cursor = conn.cursor()

@router.post("/predict", response_model=MalnutritionOutput)
async def predict_malnutrition_api(input_data: MalnutritionInput):
    """
    Predicts malnutrition status based on input measurements.
    Returns malnutrition classification as Critical, High, Moderate, or Low.
    """
    try:
        # Store input in PostgreSQL
        insert_query = """
        INSERT INTO child_health_records (sex, age, height, weight, height_for_age_z, 
        weight_for_height_z, weight_for_age_z, height_m, bmi, whr) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """
        values = (
            input_data.Sex, input_data.Age, input_data.Height, input_data.Weight,
            input_data.height_for_age_z, input_data.weight_for_height_z,
            input_data.weight_for_age_z, input_data.Height_m, input_data.BMI, input_data.WHR
        )
        cursor.execute(insert_query, values)
        conn.commit()

        # Prepare data for ML model
        features = [
            input_data.Sex, input_data.Age, input_data.Height, input_data.Weight,
            input_data.height_for_age_z, input_data.weight_for_height_z,
            input_data.weight_for_age_z, input_data.Height_m, input_data.BMI, input_data.WHR
        ]

        # Get prediction from ML model
        predicted_class, confidence, class_probabilities = predict_malnutrition(features)

        return MalnutritionOutput(
            predicted_class=predicted_class,
            confidence=confidence,
            class_probabilities=class_probabilities,
            timestamp=str(datetime.datetime.now())
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.get("/model-info")
async def get_model_info():
    """Returns information about the malnutrition prediction model"""
    return {"model": "Malnutrition Detection Model", "version": "1.0"}
