import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# ---------- DIABETES ----------
diabetes = pd.read_csv("diabetes.csv")
X_d = diabetes.drop("Outcome", axis=1)
y_d = diabetes["Outcome"]

X_train, X_test, y_train, y_test = train_test_split(X_d, y_d, test_size=0.2)

model_d = RandomForestClassifier(n_estimators=200)
model_d.fit(X_train, y_train)

joblib.dump(model_d, "diabetes_model.pkl")

# ---------- HEART ----------
heart = pd.read_csv("heart.csv")

# Convert target
heart["target"] = heart["num"].apply(lambda x: 0 if x == 0 else 1)

# Encode categorical columns
le = LabelEncoder()
for col in heart.columns:
    if heart[col].dtype == "object":
        heart[col] = le.fit_transform(heart[col])

X_h = heart.drop(["num", "target"], axis=1)
y_h = heart["target"]

X_train, X_test, y_train, y_test = train_test_split(X_h, y_h, test_size=0.2)

model_h = RandomForestClassifier(n_estimators=200)
model_h.fit(X_train, y_train)

joblib.dump(model_h, "heart_model.pkl")

# ---------- LIFESTYLE ----------
life = pd.read_csv("lifestyle.csv")

life["risk"] = (life["Sleep Duration"] < 6).astype(int)

X_l = life[["Age", "Sleep Duration"]]
y_l = life["risk"]

model_l = RandomForestClassifier()
model_l.fit(X_l, y_l)

joblib.dump(model_l, "lifestyle_model.pkl")

print("✅ All models trained successfully")