from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from backend.services.model_service import model_service
from typing import Optional, Dict, Any

router = APIRouter()

class PredictionRequest(BaseModel):
    team1: str
    team2: str
    venue: str
    toss_winner: str
    toss_decision: str
    model_name: Optional[str] = "best_model"
    # additional optional current form stats can be added here
    additional_features: Optional[Dict[str, Any]] = None

class PredictionResponse(BaseModel):
    prediction: int
    probability: list
    confidence: float
    message: str = "Prediction successful"

@router.post("/", response_model=PredictionResponse)
def predict_match(request: PredictionRequest):
    try:
        input_data = {
            "team1": request.team1,
            "team2": request.team2,
            "venue": request.venue,
            "toss_winner": request.toss_winner,
            "toss_decision": request.toss_decision
        }
        if request.additional_features:
            input_data.update(request.additional_features)
            
        result = model_service.predict(request.model_name, input_data)
        return {
            "prediction": result["prediction"],
            "probability": result["probability"] if result["probability"] else [],
            "confidence": result["confidence"],
            "message": "Prediction successful"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
