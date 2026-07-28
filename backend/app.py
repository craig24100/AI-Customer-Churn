from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
df = pd.read_csv("data/Churn_Modelling.csv")


app = FastAPI(title="Customer Churn Prediction API")

# Load model and encoders
model = joblib.load("model.pkl")
gender_encoder = joblib.load("gender_encoder.pkl")
geo_encoder = joblib.load("geo_encoder.pkl")


class Customer(BaseModel):
    CreditScore: int
    Geography: str
    Gender: str
    Age: int
    Tenure: int
    Balance: float
    NumOfProducts: int
    HasCrCard: int
    IsActiveMember: int
    EstimatedSalary: float


@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API",
        "status": "running"
    }

@app.get("/stats")
def stats():
    stayed = int((df["Exited"] == 0).sum())
    churned = int((df["Exited"] == 1).sum())

    return {
        "stayed": stayed,
        "churned": churned,
        "accuracy": 0.86
    }






@app.post("/predict")
def predict(customer: Customer):
    geography = geo_encoder.transform([customer.Geography])[0]
    gender = gender_encoder.transform([customer.Gender])[0]

    data = pd.DataFrame([{
        "CreditScore": customer.CreditScore,
        "Geography": geography,
        "Gender": gender,
        "Age": customer.Age,
        "Tenure": customer.Tenure,
        "Balance": customer.Balance,
        "NumOfProducts": customer.NumOfProducts,
        "HasCrCard": customer.HasCrCard,
        "IsActiveMember": customer.IsActiveMember,
        "EstimatedSalary": customer.EstimatedSalary,
    }])

    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    return {
        "prediction": int(prediction),
        "probability": round(float(probability), 4)
    }


     

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    