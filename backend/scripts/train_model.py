import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from joblib import dump
import os

def train_malnutrition_model(data_path, output_dir):
    """
    Train a malnutrition prediction model and save artifacts
    
    Args:
        data_path: Path to the training CSV file
        output_dir: Directory to save model artifacts
    """
    # Load data
    df = pd.read_csv(data_path)
    
    # Extract features and target
    X = df[['Age', 'Height', 'Weight', 'Low Income', 'Lower Middle Income', 'Upper Middle Income', 'Sex_1']]
    y = df['MalnutritionStatus']  # Assuming this is the target column
    
    # Encode target variable
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
    
    # Scale numerical features
    scaler = StandardScaler()
    X_train_scaled = X_train.copy()
    X_test_scaled = X_test.copy()
    
    numerical_cols = ['Age', 'Height', 'Weight']
    X_train_scaled[numerical_cols] = scaler.fit_transform(X_train[numerical_cols])
    X_test_scaled[numerical_cols] = scaler.transform(X_test[numerical_cols])
    
    # Build model
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(32, activation='relu'),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(len(np.unique(y_encoded)), activation='softmax')
    ])
    
    # Compile model
    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Train model
    model.fit(
        X_train_scaled, 
        y_train,
        epochs=50,
        batch_size=32,
        validation_data=(X_test_scaled, y_test),
        verbose=1
    )
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Save model and artifacts
    model.save(os.path.join(output_dir, 'malnutrition_model.h5'))
    dump(scaler, os.path.join(output_dir, 'scaler.joblib'))
    dump(label_encoder, os.path.join(output_dir, 'label_encoder.joblib'))
    
    print(f"Model and artifacts saved to {output_dir}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='Train malnutrition prediction model')
    parser.add_argument('--data', type=str, required=True, help='Path to training data CSV')
    parser.add_argument('--output', type=str, default='../model_files', help='Output directory for model artifacts')
    args = parser.parse_args()
    
    train_malnutrition_model(args.data, args.output)