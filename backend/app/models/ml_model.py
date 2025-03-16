# app/models/ml_model.py
import joblib
import pickle
import pandas as pd
import os
import numpy as np
from typing import Dict, List, Union, Any
from app.config import MODEL_FILES_DIR

class MalnutritionModel:
    def __init__(self):
        self.model = None
        self.class_names = None
        self.feature_names = None
        self.metadata = None
        self._load_model()
        
    def _load_model(self):
        """Load the saved model and associated artifacts"""
        base_path = MODEL_FILES_DIR
        
        # Load the model
        model_path = os.path.join(base_path, "malnutrition_rf_model.joblib")
        self.model = joblib.load(model_path)
        
        # Load class names
        with open(os.path.join(base_path, "class_names.pkl"), "rb") as f:
            self.class_names = pickle.load(f)
        
        # Load feature names
        with open(os.path.join(base_path, "feature_names.pkl"), "rb") as f:
            self.feature_names = pickle.load(f)
            
        # Load metadata if it exists
        metadata_path = os.path.join(base_path, "model_metadata.json")
        if os.path.exists(metadata_path):
            import json
            with open(metadata_path, "r") as f:
                self.metadata = json.load(f)
                
                
    def predict(self, features: Dict[str, Any]) -> Dict[str, Any]:
        
        """
        Make a prediction using the loaded model
    
        Args:
        features: Dictionary containing feature values
            
        Returns:
            Dictionary with prediction results
        """
        # Create a copy of the input features
        processed_features = features.copy()
    
        # Map the simplified field names back to what the model expects
        field_mapping = {
            'height_for_age_z': 'Height-for-age (Mean Z-score)',
            'weight_for_height_z': 'Weight-for-height (Mean Z-score)',
            'weight_for_age_z': 'Weight-for-age (Mean Z-score)'
        }
        
        # Replace keys in the dictionary
        for new_key, old_key in field_mapping.items():
            if new_key in processed_features:
                processed_features[old_key] = processed_features.pop(new_key)
        
        # Convert input to DataFrame with correct feature order
        input_df = pd.DataFrame([processed_features])
        
        # Ensure all required features are present
        missing_features = [f for f in self.feature_names if f not in input_df.columns]
        if missing_features:
            raise ValueError(f"Missing required features: {missing_features}")
        
        # Select only the features used by the model in the correct order
        input_df = input_df[self.feature_names]
        
        # Make prediction
        prediction_idx = self.model.predict(input_df)[0]
        prediction_class = self.class_names[prediction_idx]
        
        # Get prediction probabilities
        probabilities = self.model.predict_proba(input_df)[0]
        
        # Create class probability dictionary
        class_probabilities = {
            self.class_names[i]: float(prob) 
            for i, prob in enumerate(probabilities)
        }
        
        # Return prediction result
        return {
            "predicted_class": prediction_class,
            "confidence": float(max(probabilities)),
            "class_probabilities": class_probabilities,
            "timestamp": pd.Timestamp.now().isoformat()
        }
    def get_model_info(self) -> Dict[str, Any]:
        """Return information about the model"""
        return {
            "model_type": self.metadata.get("model_type", "RandomForest") if self.metadata else "RandomForest",
            "features": self.feature_names,
            "classes": self.class_names,
            "metadata": self.metadata
        }

# Singleton instance
model_instance = None

def get_model():
    """Get or create the model singleton"""
    global model_instance
    if model_instance is None:
        model_instance = MalnutritionModel()
    return model_instance