from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.routes.prediction import router as prediction_router
from app.routes.auth_router import router as auth_router
from app.routes.children import router as children_router
from app.routes.child_data import router as child_data_router
from app.routes.allChildren import router as allChildren_router

# Create FastAPI app
app = FastAPI(
    title="Malnutrition Classification API",
    description="API for predicting malnutrition status in children under 5",
    version="1.0.0"
)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers POST
app.include_router(prediction_router, prefix="/api", tags=["Predictions"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(children_router, prefix="/api/children", tags=["Children"])

# Include routers GET
app.include_router(child_data_router, prefix="/api", tags=["Child Data"])
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