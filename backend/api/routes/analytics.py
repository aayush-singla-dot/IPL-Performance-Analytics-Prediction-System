from fastapi import APIRouter, HTTPException
from typing import Optional

router = APIRouter()

@router.get("/teams")
def get_team_analytics(team: Optional[str] = None):
    # Mock data for frontend development
    return {
        "team_name": team if team else "All Teams",
        "total_matches": 150,
        "wins": 85,
        "losses": 65,
        "win_percentage": 56.67,
        "recent_form": ["W", "L", "W", "W", "L"]
    }

@router.get("/players")
def get_player_analytics(player: Optional[str] = None):
    return {
        "player_name": player if player else "Top Players",
        "total_runs": 4500,
        "strike_rate": 135.5,
        "average": 38.4,
        "highest_score": 115
    }

@router.get("/venues")
def get_venue_analytics(venue: Optional[str] = None):
    return {
        "venue_name": venue if venue else "All Venues",
        "matches_played": 80,
        "bat_first_wins": 45,
        "chase_wins": 35,
        "average_first_innings_score": 165
    }
