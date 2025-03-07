# NutriGuard: Early Malnutrition Detection in Children Under 5

## Project Structure
```
NutriGuard/
│
├── backend/
│   ├── app/
│   ├── model_files/
│   ├── tests/
│   ├── scripts/
│   ├── requirements.txt
│   └── run.py
│
├── frontend/
│   ├── web/
│   └── mobile/
│
├── notebooks/
│   └── model_training.ipynb
│
├── data/
│   └── malnutrition_dataset.csv
│
└── README.md
```

## Description
NutriGuard is an AI-powered system designed for the early detection of malnutrition in children under the age of five in the Western Province of Rwanda. By leveraging Rwanda Demographic Health Survey (DHS) data from the 2021 report and Ntaganzwa HealthCare Data, the system analyzes key health indicators to provide an early warning system for malnutrition.

## Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git
- Virtual environment (venv recommended)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/DavidkingMazimpaka/NutriGuard_Mission_Capstone.git
cd NutriGuard_Mission_Capstone
```

### 2. Backend Setup
#### 2.1 Create Virtual Environment
```bash
# On macOS/Linux
python3 -m venv backend/env

# On Windows
python -m venv backend\env
```

#### 2.2 Activate Virtual Environment
```bash
# On macOS/Linux
source backend/env/bin/activate

# On Windows
backend\env\Scripts\activate
```

#### 2.3 Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 3. Model Training
```bash
# Run model training script
python scripts/train_model.py
```

### 4. Run Backend Server
```bash
# Start FastAPI server
python run.py
```
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### 5. Frontend Setup (Optional)
#### Web Frontend
```bash
cd ../frontend/web
npm install
npm start
```

#### Mobile Frontend
```bash
cd ../frontend/mobile
flutter pub get
flutter run
```

## Running Tests
```bash
# Backend tests
cd backend
pytest tests/
```

## Environment Configuration
1. Create a `.env` file in the `backend/` directory
2. Add necessary environment variables:
```
MODEL_PATH=model_files/malnutrition_model.h5
SCALER_PATH=model_files/scaler.joblib
LOG_LEVEL=INFO
```
## Designs
The project includes the following design components:
- Figma Mockups: UI/UX designs for the mobile and web interfaces. [View Mockups](https://www.figma.com/proto/jgtbH2Xs0YMXiesIClfGWi/NutriGuard?node-id=0-1&t=9lzvu1IxIhSQkn9T-1)


## Deployment Considerations
- Use Gunicorn for production deployment
- Configure environment-specific settings
- Set up HTTPS and proper authentication

## Project Components
1. **Machine Learning Model**
   - Located in: `backend/model_files/`
   - Training script: `backend/scripts/train_model.py`
   - Model: TensorFlow/Keras Neural Network

2. **Backend API**
   - Framework: FastAPI
   - Main application: `backend/app/main.py`
   - Prediction routes: `backend/app/routes/prediction.py`

3. **Frontend**
   - Web: React
   - Mobile: Flutter

## Troubleshooting
- Ensure all dependencies are installed
- Check Python and pip versions
- Verify model files are present in `backend/model_files/`

## Contributing
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Contact
- **Maintainer:** David Mazimpaka
- **Email:** mazimpakadavid607@gmail.com
