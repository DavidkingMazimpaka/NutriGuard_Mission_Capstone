from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Get the database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    logger.error("DATABASE_URL environment variable is not set!")
    raise ValueError("DATABASE_URL environment variable is not set!")

# Initialize SQLAlchemy components
try:
    engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True)
    # Test the connection
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
    logger.info("Successfully connected to the database.")
except Exception as e:
    logger.error(f"Failed to connect to the database: {str(e)}")
    raise

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()

# Import models so that they are registered with SQLAlchemy metadata
# Ensure the import path is correct relative to where database.py is used
from app.models.child_health_record import ChildHealthRecord
