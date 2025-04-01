from fastapi.testclient import TestClient
from backend.app.main import app
import pytest
from unittest.mock import patch

client = TestClient(app)

@pytest.fixture
def valid_input_data():
    return {
        "age": 25,
        "height": 165,
        "weight": 60,
        "income_level": "lower_middle",
        "sex": "female"
    }

@patch('app.models.ml_model.MalnutritionModel.predict')
def test_prediction_endpoint(mock_predict, valid_input_data):
    # Mock the prediction method
    mock_predict.return_value = ("normal", 0.85, {
        'Age': 25,
        'Height': 165,
        'Weight': 60,
        'Low Income': 0,
        'Lower Middle Income': 1,
        'Upper Middle Income': 0,
        'Sex_1': 0
    })
    
    # Test the endpoint
    response = client.post("/api/v1/predict/", json=valid_input_data)
    
    assert response.status_code == 200
    assert response.json()["prediction"] == "normal"
    assert response.json()["probability"] == 0.85
    assert "input_data" in response.json()
    assert "features" in response.json()