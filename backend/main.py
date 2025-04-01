from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.routes.prediction import router as prediction_router
from app.routes.auth_router import router as auth_router
from app.routes.allChildren import router as allChildren_router
import uvicorn

# Create FastAPI app
app = FastAPI(
    title="Malnutrition Classification API",
    description="API for predicting malnutrition status in children under 5",
    version="1.0.0"
)

# Define the frontend build directory globally
frontend_build_dir = os.path.join(os.path.dirname(__file__), "frontend", "dist")

# Add CORS middleware with more specific configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:3000", "http://192.168.1.71:8080"],  # Add your frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
    expose_headers=["*"]  # Exposes all headers
)

# Include routers POST
app.include_router(prediction_router, prefix="/api", tags=["predictions"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])

# Include routers GET
app.include_router(allChildren_router, prefix="/api", tags=["All Children"])

# Health check endpoint
@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "healthy", 
        "message": "Malnutrition Classification API is running",
        "docs_url": "/docs",
        "version": "1.0.0"
    }

# Serve Vite React build files in production
@app.on_event("startup")
async def startup_event():
    if os.path.exists(frontend_build_dir):
        app.mount("/", StaticFiles(directory=frontend_build_dir, html=True), name="frontend")

@app.get("/{full_path:path}", include_in_schema=False)
async def serve_react_app(full_path: str):
    index_path = os.path.join(frontend_build_dir, "index.html")
    return FileResponse(index_path)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",  # Allows external connections
        port=8000,       # Default port
        reload=True,     # Enable auto-reload for development
        workers=4,       # Number of worker processes
        log_level="info" # Logging level
    )