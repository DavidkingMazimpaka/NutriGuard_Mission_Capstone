import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
import argparse
import os

def preprocess_data(input_path, output_path):
    """
    Preprocess raw data for training the malnutrition model
    
    Args:
        input_path: Path to raw data CSV
        output_path: Path to save processed data CSV
    """
    # Load data
    df = pd.read_csv(input_path)
    
    # Handle missing values
    for col in ['Age', 'Height', 'Weight']:
        df[col].fillna(df[col].median(), inplace=True)
    
    # Create income level one-hot encoding
    # Assuming 'IncomeLevel' is a categorical column in the raw data
    if 'IncomeLevel' in df.columns:
        income_dummies = pd.get_dummies(df['IncomeLevel'], prefix='')
        income_dummies.columns = [col.strip() + ' Income' for col in income_dummies.columns]
        df = pd.concat([df, income_dummies], axis=1)
        df.drop('IncomeLevel', axis=1, inplace=True)
    
    # Encode sex (assuming 1 for Male, 0 for Female)
    if 'Sex' in df.columns:
        df['Sex_1'] = df['Sex'].map({'Male': 1, 'Female': 0})
        df.drop('Sex', axis=1, inplace=True)
    
    # Ensure all required columns exist
    required_columns = [
        'Age', 'Height', 'Weight', 
        'Low Income', 'Lower Middle Income', 'Upper Middle Income', 
        'Sex_1', 'MalnutritionStatus'
    ]
    
    for col in required_columns:
        if col not in df.columns:
            if 'Income' in col:
                df[col] = 0  # Default all income levels to 0
            elif col == 'Sex_1':
                df[col] = 0  # Default to female
            else:
                raise ValueError(f"Required column {col} not found and cannot be imputed")
    
    # Save processed data
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df.to_csv(output_path, index=False)
    print(f"Preprocessed data saved to {output_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Preprocess data for malnutrition model')
    parser.add_argument('--input', type=str, required=True, help='Path to raw data CSV')
    parser.add_argument('--output', type=str, required=True, help='Path to save processed data CSV')
    args = parser.parse_args()
    
    preprocess_data(args.input, args.output)