import pickle
import os
import numpy as np
from typing import Dict, Any, Tuple
from joblib import load
from app.utils.preprocessing import preprocess_input

class MalnutritionModel:
    def __init__(self):
        # Define the base project directory
        base_project_dir = "C:\\Users\\daluc\\MyProjects\\NutriGuard_Mission_Capstone\\backend"
        base_path = os.path.join(base_project_dir, "model_files")
        
        # Define paths for model files
        model_path = os.path.join(base_path, "malnutrition_model.pkl")
        scaler_path = os.path.join(base_path, "scaler.joblib")
        label_encoder_path = os.path.join(base_path, "label_encoder.joblib")
        
        # Print the model path for debugging
        print(f"Loading model from: {model_path}")
        
        # Load model
        try:
            with open(model_path, 'rb') as f:
                self.model = pickle.load(f)
            print("Model loaded successfully")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise
        
        # Load scaler if it exists
        if os.path.exists(scaler_path):
            try:
                self.scaler = load(scaler_path)
                print("Scaler loaded successfully")
            except Exception as e:
                print(f"Error loading scaler: {str(e)}")
                self.scaler = None
        else:
            print(f"Scaler file not found at: {scaler_path}")
            self.scaler = None
            
        # Load label encoder if it exists
        if os.path.exists(label_encoder_path):
            try:
                self.label_encoder = load(label_encoder_path)
                print("Label encoder loaded successfully")
            except Exception as e:
                print(f"Error loading label encoder: {str(e)}")
                self.label_encoder = None
        else:
            print(f"Label encoder file not found at: {label_encoder_path}")
            self.label_encoder = None
        
    def predict(self, input_data: Dict[str, Any]) -> Tuple[str, float, Dict[str, Any]]:
        """
        Process input data and make a prediction
        
        Args:
            input_data: Dictionary containing input features
            
        Returns:
            Tuple of (prediction label, probability, processed features)
        """
        # Preprocess input data
        features = preprocess_input(input_data)
        
        # IMPORTANT: Create a feature array with ALL features
        # Include both numerical and categorical features for scaling
        if self.scaler:
            # Create the complete feature vector with all 7 features for scaling
            feature_array = np.array([[
                features['Age'],
                features['Height'], 
                features['Weight'],
                features['Low Income'],
                features['Lower Middle Income'],
                features['Upper Middle Income'],
                features['Sex_1']
            ]])
            
            # Scale all features together
            scaled_features = self.scaler.transform(feature_array)
            
            # Use the scaled features for prediction
            input_features = scaled_features
        else:
            # If no scaler, use raw features
            input_features = np.array([[
                features['Age'],
                features['Height'], 
                features['Weight'],
                features['Low Income'],
                features['Lower Middle Income'],
                features['Upper Middle Income'],
                features['Sex_1']
            ]])
        
        # Debugging output
        print(f"Input features shape: {input_features.shape}")
        print(f"Input features: {input_features}")
        
        # Make prediction
        try:
            # Handle different model types
            if hasattr(self.model, 'predict_proba'):
                # For sklearn models with probability support
                probabilities = self.model.predict_proba(input_features)
                predicted_class_index = np.argmax(probabilities[0])
                probability = float(probabilities[0][predicted_class_index])
                
                if self.label_encoder:
                    predicted_class = self.label_encoder.inverse_transform([predicted_class_index])[0]
                else:
                    raw_prediction = self.model.predict(input_features)[0]
                    predicted_class = str(raw_prediction)
                    
            elif hasattr(self.model, 'predict'):
                # For models with only predict method
                prediction = self.model.predict(input_features)
                
                # Check if prediction is already the class or needs to be processed
                if isinstance(prediction[0], (np.ndarray, list)):
                    predicted_class_index = np.argmax(prediction[0])
                    probability = float(prediction[0][predicted_class_index])
                    
                    if self.label_encoder:
                        predicted_class = self.label_encoder.inverse_transform([predicted_class_index])[0]
                    else:
                        predicted_class = str(predicted_class_index)
                else:
                    predicted_class = str(prediction[0])
                    probability = 1.0  # No probability available
            else:
                raise ValueError("Model does not have a predict method")
                
            print(f"Prediction successful: {predicted_class} with probability {probability}")
            return predicted_class, probability, features
            
        except Exception as e:
            print(f"Prediction error: {str(e)}")
            raise

# Create a singleton instance
model_instance = None

def get_model_instance():
    global model_instance
    if model_instance is None:
        model_instance = MalnutritionModel()
    return model_instance