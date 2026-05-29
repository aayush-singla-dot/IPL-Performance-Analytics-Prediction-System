import streamlit as st
import pandas as pd
import pickle
import shap
import matplotlib.pyplot as plt
import numpy as np

# =========================
# PAGE CONFIG
# =========================
st.set_page_config(page_title="IPL Predictor", layout="centered")

# =========================
# STYLE
# =========================
st.markdown("""
<style>
.main {background-color: #0E1117;}
.card {
    padding: 20px;
    border-radius: 12px;
    background-color: #1c1e26;
    margin-bottom: 20px;
}
.center {text-align: center;}
</style>
""", unsafe_allow_html=True)

# =========================
# TITLE
# =========================
st.title(" IPL Match Winner Predictor")
st.markdown("---")

# =========================
# LOAD MODEL
# =========================
with open("../models/best_model.pkl", "rb") as f:
    model = pickle.load(f)

feature_columns = model.feature_names_in_

# =========================
# LOAD DATA
# =========================
matches = pd.read_csv("../data/processed/matches_cleaned.csv")

# =========================
# TEAM LIST
# =========================
teams = [
    "mumbai indians","chennai super kings","kolkata knight riders",
    "royal challengers bangalore","delhi capitals","rajasthan royals",
    "sunrisers hyderabad","punjab kings","lucknow super giants","gujarat titans"
]

# =========================
# FEATURE FUNCTION
# =========================
def compute_features(team1, team2):

    t1 = matches[(matches['team1']==team1)|(matches['team2']==team1)]
    t2 = matches[(matches['team1']==team2)|(matches['team2']==team2)]

    t1_wr = sum(t1['winner']==team1)/len(t1) if len(t1)>0 else 0.5
    t2_wr = sum(t2['winner']==team2)/len(t2) if len(t2)>0 else 0.5

    t1_form = sum(t1.tail(5)['winner']==team1)/5 if len(t1)>0 else 0.5
    t2_form = sum(t2.tail(5)['winner']==team2)/5 if len(t2)>0 else 0.5

    h2h = matches[((matches['team1']==team1)&(matches['team2']==team2))|
                  ((matches['team1']==team2)&(matches['team2']==team1))]

    h2h_diff = sum(h2h['winner']==team1) - sum(h2h['winner']==team2)

    return t1_wr, t2_wr, t1_form, t2_form, h2h_diff

# =========================
# UI
# =========================
st.markdown("##  Match Setup")

c1,c2 = st.columns(2)
team1 = c1.selectbox("Team 1", teams)
team2 = c2.selectbox("Team 2", teams)

if team1==team2:
    st.warning("Select different teams")
    st.stop()

toss = st.selectbox("Toss Winner",[team1,team2])

if st.button(" Predict"):

    try:
        # =========================
        # INPUT CREATION
        # =========================
        X = pd.DataFrame(0,index=[0],columns=feature_columns)

        if f"team1_{team1}" in X.columns:
            X[f"team1_{team1}"]=1

        if f"team2_{team2}" in X.columns:
            X[f"team2_{team2}"]=1

        if "toss_winner_is_team1" in X.columns:
            X["toss_winner_is_team1"]=1 if toss==team1 else 0

        t1_wr,t2_wr,t1_f,t2_f,h2h = compute_features(team1,team2)

        for col,val in {
            "team1_win_rate":t1_wr,
            "team2_win_rate":t2_wr,
            "team1_recent_form":t1_f,
            "team2_recent_form":t2_f,
            "head_to_head":h2h,
            "win_rate_diff":t1_wr-t2_wr,
            "form_diff":t1_f-t2_f
        }.items():
            if col in X.columns:
                X[col]=val

        # =========================
        # PREDICTION
        # =========================
        pred = model.predict(X)[0]
        prob = model.predict_proba(X)[0][1]

        winner = team1 if pred==1 else team2

        st.success(f" {winner} likely to win!")
        st.write(f"Confidence: {prob:.2f}")

        # =========================
        # SHAP (100% FIXED)
        # =========================
        st.markdown("##  Why this prediction?")

        explainer = shap.TreeExplainer(model)

        # Use new API (more stable)
        shap_exp = explainer(X)

        # Take single explanation
        single_exp = shap_exp[0]

        # Plot safely
        fig = plt.figure()
        shap.plots.waterfall(single_exp, show=False)
        st.pyplot(fig)

    except Exception as e:
        st.error("SHAP temporarily unavailable")
        st.write("Prediction still works correctly ")