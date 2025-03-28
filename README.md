# NutriGuard: Early Malnutrition Detection in Children Under 5

## Overview

NutriGuard is an AI-powered system designed for the early detection of malnutrition in children under the age of five in the Western Province of Rwanda. The system leverages:
- Rwanda Demographic Health Survey (DHS) data from 2021
- WHO Child Standards growth data
- Ntaganzwa HealthCare Data

## Features

- Early warning system for malnutrition detection
- AI-powered prediction system
- Personalized recommendations
- Growth monitoring and tracking
- Healthcare facility recommendations
- Nutritional guidance

## Tech Stack

### Backend
- Python 3.8+
- FastAPI
- TensorFlow/Keras
- Pandas
- NumPy

### Frontend
- React with TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router
- React Query

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 16.x or higher
- npm or yarn
- Git

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/DavidkingMazimpaka/NutriGuard_Mission_Capstone.git
cd NutriGuard_Mission_Capstone
```

### 2. Backend Setup

#### 2.1 Create and Activate Virtual Environment

```bash
# Create virtual environment
python -m venv backend/env

# Activate virtual environment
# On Windows
backend\env\Scripts\activate
# On macOS/Linux
source backend/env/bin/activate
```

#### 2.2 Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### 2.3 Configure Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
MODEL_PATH=model_files/malnutrition_model.h5
SCALER_PATH=model_files/scaler.joblib
LOG_LEVEL=INFO
```

### 3. Frontend Setup

#### 3.1 Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 3.2 Configure Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Running the Application

### 1. Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Start the FastAPI server
python run.py
```

The backend server will start at:
- API Documentation: http://localhost:8000/docs
- ReDoc Documentation: http://localhost:8000/redoc

### 2. Start the Frontend Development Server

```bash
# Navigate to frontend directory
cd frontend

# Start the development server
npm run dev
```

The frontend application will be available at:
- http://localhost:8080

## Testing

### Backend Tests

```bash
cd backend
pytest tests/
```

## Project Structure

```
NutriGuard/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── models/
│   │   └── services/
│   ├── model_files/
│   ├── tests/
│   ├── scripts/
│   ├── requirements.txt
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── styles/
│   ├── public/
│   └── package.json
│
├── notebooks/
│   └── malnutrition_model_training_evaluation.ipynb
│
└── README.md
```

## API Documentation

The API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Troubleshooting

### Common Issues

1. **Backend Connection Issues**
   - Ensure the backend server is running
   - Check if the port 8000 is available
   - Verify environment variables are set correctly

2. **Frontend Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: 
     ```bash
     rm -rf node_modules
     npm install
     ```

3. **Model Loading Issues**
   - Verify model files exist in `backend/model_files/`
   - Check model file permissions
   - Ensure correct Python version is being used

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## Contact

- **Maintainer:** David Mazimpaka
- **Email:** mazimpakadavid607@gmail.com
- **GitHub:** [DavidkingMazimpaka](https://github.com/DavidkingMazimpaka)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
