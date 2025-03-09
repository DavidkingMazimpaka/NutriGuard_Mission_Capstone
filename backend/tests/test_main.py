import sys
import os
from pathlib import Path
import pytest

# Find the project root directory
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

from app.models.prediction_model import PredictionInput, PredictionOutput, IncomeLevel, Sex


def test_prediction_input_model():
    # Test valid input
    valid_input = {
        "age": 25,
        "height": 165,
        "weight": 60,
        "income_level": "lower_middle",
        "sex": "female"
    }
    input_model = PredictionInput(**valid_input)
    assert input_model.age == 25
    assert input_model.height == 165
    assert input_model.weight == 60
    assert input_model.income_level == IncomeLevel.lower_middle
    assert input_model.sex == Sex.female

    # Test invalid income_level
    with pytest.raises(ValueError):
        PredictionInput(
            age=25,
            height=165,
            weight=60,
            income_level="invalid_level",
            sex="female"
        )