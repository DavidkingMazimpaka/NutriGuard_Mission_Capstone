from typing import Dict, Any

def preprocess_input(input_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Transform raw input data into features expected by the model
    
    Args:
        input_data: Dictionary with raw input features
        
    Returns:
        Dictionary with processed features ready for model prediction
    """
    # Initialize processed features
    features = {
        'Age': float(input_data['age']),
        'Height': float(input_data['height']),
        'Weight': float(input_data['weight']),
        'Low Income': 0,
        'Lower Middle Income': 0,
        'Upper Middle Income': 0,
        'Sex_1': 1 if input_data['sex'].lower() == 'male' else 0
    }
    
    # One-hot encode income level
    income_level = input_data['income_level'].lower()
    if income_level == 'low':
        features['Low Income'] = 1
    elif income_level == 'lower_middle':
        features['Lower Middle Income'] = 1
    elif income_level == 'upper_middle':
        features['Upper Middle Income'] = 1
        
    return features