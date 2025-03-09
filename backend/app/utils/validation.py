from typing import Dict, Any, Tuple, List
import numpy as np

def validate_input_ranges(input_data: Dict[str, Any]) -> Tuple[bool, List[str]]:
    """
    Validate that the input values are within reasonable ranges
    
    Args:
        input_data: Dictionary with input features
        
    Returns:
        Tuple of (is_valid, error_messages)
    """
    errors = []
    
    # Age validation (0-120 years)
    if input_data['age'] < 0 or input_data['age'] > 120:
        errors.append("Age must be between 0 and 120 years")
    
    # Height validation (30-250 cm)
    if input_data['height'] < 30 or input_data['height'] > 250:
        errors.append("Height must be between 30 and 250 cm")
    
    # Weight validation (0.5-500 kg)
    if input_data['weight'] < 0.5 or input_data['weight'] > 500:
        errors.append("Weight must be between 0.5 and 500 kg")
    
    return len(errors) == 0, errors