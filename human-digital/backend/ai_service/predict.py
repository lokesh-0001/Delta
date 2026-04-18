import sys
import json
import joblib
import numpy as np
import pandas as pd
import os
import traceback

try:
    input_data = json.loads(sys.argv[1])

    age = float(input_data.get("age", 0))
    bmi = float(input_data.get("bmi", 0))
    sleep = float(input_data.get("sleep", 0))

    BASE = os.path.dirname(__file__)

    diabetes_model = joblib.load(os.path.join(BASE, "diabetes_model.pkl"))
    heart_model = joblib.load(os.path.join(BASE, "heart_model.pkl"))
    lifestyle_model = joblib.load(os.path.join(BASE, "lifestyle_model.pkl"))

    # ✅ Use DataFrames with correct feature names

    diabetes_input = pd.DataFrame([{
        "Pregnancies": 1,
        "Glucose": 120,
        "BloodPressure": 80,
        "SkinThickness": 30,
        "Insulin": 100,
        "BMI": bmi,
        "DiabetesPedigreeFunction": 0.5,
        "Age": age
    }])

    heart_input = pd.DataFrame([{
        "age": age,
        "sex": 1,
        "cp": 3,
        "trestbps": 130,
        "chol": 250,
        "fbs": 0,
        "restecg": 1,
        "thalach": 150,
        "exang": 0,
        "oldpeak": 1.0,
        "slope": 2,
        "ca": 0,
        "thal": 2
    }])

    lifestyle_input = pd.DataFrame([{
        "Age": age,
        "SleepHours": sleep
    }])

    d_pred = diabetes_model.predict(diabetes_input)[0]
    h_pred = heart_model.predict(heart_input)[0]
    l_pred = lifestyle_model.predict(lifestyle_input)[0]

    risk_score = (d_pred + h_pred + l_pred) / 3

    if risk_score > 0.6:
        explanation = "High risk detected. Improve diet, exercise, and sleep."
    elif risk_score > 0.3:
        explanation = "Moderate risk. Maintain a healthy lifestyle."
    else:
        explanation = "Low risk. Keep up the good habits."

    output = {
        "diabetes": int(d_pred),
        "heart": int(h_pred),
        "lifestyle": int(l_pred),
        "risk_score": float(risk_score),
        "explanation": explanation
    }

    print(json.dumps(output))

except Exception as e:
    print(json.dumps({
        "error": str(e),
        "trace": traceback.format_exc()
    }))