from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router

# Create FastAPI app
app = FastAPI(
    title="Malnutrition Prediction API",
    description="API for predicting malnutrition status based on personal attributes",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Welcome to the NutriGuard Malnutrition Prediction API. Use /api/v1/predict for predictions."}