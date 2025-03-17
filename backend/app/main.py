from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.routes.prediction import router as prediction_router
from app.routes.auth_router import router as auth_router

# Create FastAPI app
app = FastAPI(
    title="Malnutrition Classification API",
    description="API for predicting malnutrition status in children under 5",
    version="1.0.0"
)

# Configure CORS for React frontend
origins = [
    "http://localhost:5173",    # Default Vite dev server
    "http://localhost:3000",    # Alternative port
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # More restrictive than "*" for production
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

# Include routers
app.include_router(prediction_router, prefix="/api/v1", tags=["Predictions"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])

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
    """
    Check if we're in production mode and if the frontend build exists
    """
    frontend_build_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
    if os.path.exists(frontend_build_dir):
        app.mount("/", StaticFiles(directory=frontend_build_dir, html=True), name="frontend")
        
        @app.get("/{full_path:path}", include_in_schema=False)
        async def serve_react_app(full_path: str):
            """Serve the React app for any unmatched routes"""
            index_path = os.path.join(frontend_build_dir, "index.html")
            if os.path.exists(index_path):
                return FileResponse(index_path)
            return {"error": "Frontend not found"}