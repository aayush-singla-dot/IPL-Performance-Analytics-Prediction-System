from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

router = APIRouter()

class ExplainRequest(BaseModel):
    team1: str
    team2: str
    venue: str
    toss_winner: str
    toss_decision: str
    model_name: Optional[str] = "best_model"

@router.post("/")
def explain_prediction(request: ExplainRequest):
    try:
        # Mock SHAP response for now
        # TODO: Implement actual SHAP integration in model_service
        return {
            "feature_importance": [
                {"feature": "Toss Winner", "importance": 0.25},
                {"feature": "Venue", "importance": 0.20},
                {"feature": "Team 1 Win Rate", "importance": 0.30},
                {"feature": "Team 2 Win Rate", "importance": 0.15},
                {"feature": "Recent Form", "importance": 0.10}
            ],
            "waterfall_plot_data": [],
            "message": "Explainability generated successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
