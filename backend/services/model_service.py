import os
import joblib
import pandas as pd
import numpy as np

# Adjust the paths to be relative to the project root
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODELS_DIR = os.path.join(BASE_DIR, "models")
DATA_DIR = os.path.join(BASE_DIR, "data", "feature_store")

class ModelService:
    def __init__(self):
        self.rf_model = None
        self.xgb_model = None
        self.best_model = None
        self.label_encoders = {}
        self.features = []
        self._load_models()

    def _load_models(self):
        try:
            self.rf_model = joblib.load(os.path.join(MODELS_DIR, "random_forest.pkl"))
            print("Loaded Random Forest model")
        except Exception as e:
            print(f"Error loading RF model: {e}")

        try:
            self.xgb_model = joblib.load(os.path.join(MODELS_DIR, "xgboost.pkl"))
            print("Loaded XGBoost model")
        except Exception as e:
            print(f"Error loading XGBoost model: {e}")

        try:
            self.best_model = joblib.load(os.path.join(MODELS_DIR, "best_model.pkl"))
            print("Loaded Best model")
        except Exception as e:
            print(f"Error loading Best model: {e}")

    def preprocess_input(self, data: dict):
        # TODO: Implement full preprocessing logic mapping to training features
        # Example for now: returning a DataFrame
        df = pd.DataFrame([data])
        # Add label encoding logic here as per notebook 03/05/08
        return df

    def predict(self, model_name: str, input_data: dict):
        df = self.preprocess_input(input_data)
        
        model = self.best_model
        if model_name == "random_forest" and self.rf_model:
            model = self.rf_model
        elif model_name == "xgboost" and self.xgb_model:
            model = self.xgb_model
            
        if not model:
            raise ValueError(f"Model {model_name} could not be loaded or is unavailable")
            
        # Mock prediction if features don't match
        try:
            prediction = model.predict(df)
            prob = model.predict_proba(df)[0].tolist() if hasattr(model, 'predict_proba') else None
        except Exception as e:
            print(f"Prediction error: {e}")
            # Mock values for UI development
            prediction = [1]
            prob = [0.4, 0.6]

        return {
            "prediction": int(prediction[0]),
            "probability": prob,
            "confidence": max(prob) if prob else 0.0
        }

model_service = ModelService()
