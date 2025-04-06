# NutriGuard: Early Malnutrition Detection in Children Under 5 in Western Province of Rwanda.

## Overview

**NutriGuard** is an AI-powered system designed for the early detection of malnutrition in children under the age of five, with a focus on communities in Rwanda's Western Province. The system leverages:
- Rwanda Demographic Health Survey (DHS) data from 2021  
- WHO Child Standards growth data  
- Ntaganzwa HealthCare data

NutriGuard offers health professionals a simple tool to assess malnutrition risk based on anthropometric data and generate personalized nutritional guidance.

---

## Features

- 🚨 Early warning system for malnutrition detection  
- 🤖 AI-powered prediction and classification (e.g. normal, moderate, severe)  
- 📊 Growth monitoring and tracking  
- 💡 Personalized health and nutrition recommendations  
- 🏥 Nearby healthcare facility suggestions  
- 📚 Educational guidance on nutrition and immunity

---

## Tech Stack

### 🔧 Backend
- Python 3.8+
- FastAPI
- TensorFlow/Keras
- Pandas, NumPy

### 💻 Frontend
- React with TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Router, React Query

---

## Prerequisites

Make sure the following are installed:
- Python 3.8+
- Node.js 16.x or higher
- npm or yarn
- Git

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/DavidkingMazimpaka/NutriGuard_Mission_Capstone.git
cd NutriGuard_Mission_Capstone
```

---

### 2. Backend Setup

#### 2.1 Create and Activate a Virtual Environment

```bash
python -m venv backend/env

# Activate:
# Windows
backend\env\Scripts\activate
# macOS/Linux
source backend/env/bin/activate
```

#### 2.2 Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### 2.3 Environment Variables

Create a `.env` file in `backend/`:

```env
MODEL_PATH=model_files/malnutrition_model.h5
SCALER_PATH=model_files/scaler.joblib
LOG_LEVEL=INFO
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

#### 3.1 Frontend Environment Variables

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Running the Application

### 1. Start the Backend

```bash
cd backend
python run.py
```

API docs will be available at:
- http://localhost:8000/docs  
- http://localhost:8000/redoc

### 2. Start the Frontend

```bash
cd frontend
npm run dev
```

App runs at: http://localhost:8080

---

## Testing

```bash
cd backend
pytest tests/
```

---

## Project Structure

```
NutriGuard/
├── backend/
│   ├── app/
│   ├── model_files/
│   ├── tests/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── notebooks/
└── README.md
```

---

## API Documentation

- Swagger: http://localhost:8000/docs  
- ReDoc: http://localhost:8000/redoc

---

## Troubleshooting

### Backend
- Ensure virtual environment is active
- Confirm model files exist in `backend/model_files/`

### Frontend
- Use the correct Node version (16.x)
- If needed:  
  ```bash
  rm -rf node_modules
  npm install
  ```

---

## Feedback & Future Improvements

Following the defense presentation, panelists did not recommend mandatory changes. However, based on a self-reflection prompted by one panelist, the following improvements have been identified:

- **🖼️ Image Classification Integration (Planned Feature)**  
  Future versions of NutriGuard will explore using computer vision to detect visible signs of malnutrition from a child's image. This would be particularly useful in rural or low-data settings.

- **📱 Mobile App Optimization**  
  Develop a lightweight mobile app version to support offline or poor-network areas.

- **📊 More Feature Engineering**  
  Incorporate additional anthropometric and clinical features for more robust predictions.

- **🌍 Regional Dataset Expansion**  
  Extend training data to other regions of Rwanda for broader applicability.

---

## Contributing

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/improvement`)  
3. Make your changes  
4. Commit (`git commit -am 'Add new feature'`)  
5. Push (`git push origin feature/improvement`)  
6. Create a Pull Request  

---

## Contact

**Maintainer:** David Mazimpaka  
📧 mazimpakadavid607@gmail.com  
🌐 [GitHub](https://github.com/DavidkingMazimpaka)

---

## License

MIT License – see `LICENSE` file.
