from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.prediction import router as prediction_router

app = FastAPI(
    title="Malnutrition Classification API",
    description="API for predicting malnutrition status in children under 5",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(prediction_router, prefix="/api/v1", tags=["Predictions"])

@app.get("/", tags=["Health"])
async def root():
    return {"status": "healthy", "message": "Malnutrition Classification API is running"}