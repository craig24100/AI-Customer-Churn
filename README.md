# 🤖 AI Customer Churn Prediction Platform

A full-stack machine learning application that predicts whether a bank customer is likely to churn (leave the bank).

## 🚀 Features

* Real-time churn prediction
* Random Forest machine learning model
* FastAPI REST API backend
* React dashboard frontend
* Interactive analytics charts (Recharts)
* Responsive mobile-friendly UI

## 🧠 Machine Learning

* **Algorithm:** Random Forest Classifier
* **Dataset:** 10,000 banking customers
* **Accuracy:** **86.0%**

### Classification Performance

| Class       | Precision | Recall | F1   |
| ----------- | --------- | ------ | ---- |
| Stayed (0)  | 0.88      | 0.96   | 0.92 |
| Churned (1) | 0.75      | 0.47   | 0.57 |

## 🏗️ Architecture

React (Frontend)
↓
Axios HTTP Requests
↓
FastAPI (Backend)
↓
Random Forest Model
↓
Prediction + Probability

## 🛠️ Tech Stack

### Backend

* Python
* Pandas
* NumPy
* Scikit-learn
* FastAPI
* Uvicorn
* Joblib

### Frontend

* React
* Vite
* Axios
* Recharts
* CSS3

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/craig24100/AI-Customer-Churn.git
cd AI-Customer-Churn
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install pandas numpy scikit-learn fastapi uvicorn joblib
uvicorn app:app --reload
```

Backend runs on: **http://127.0.0.1:8000**

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

## 🔌 API Endpoints

### Health Check

```http
GET /
```

### Predict Customer Churn

```http
POST /predict
```

Example request:

```json
{
  "CreditScore": 650,
  "Geography": "France",
  "Gender": "Female",
  "Age": 35,
  "Tenure": 5,
  "Balance": 50000,
  "NumOfProducts": 2,
  "HasCrCard": 1,
  "IsActiveMember": 1,
  "EstimatedSalary": 80000
}
```

Example response:

```json
{
  "prediction": 0,
  "probability": 0.08
}
```

### Dataset Statistics

```http
GET /stats
```

Returns customer distribution and model accuracy.

## 📊 Dashboard

The React frontend includes:

* Customer prediction form
* Risk probability display
* Accuracy card
* Churn distribution pie chart
* Mobile responsive layout

## 🎯 Future Improvements

* Feature importance visualization
* Prediction history with SQLite
* User authentication
* Docker deployment
* CI/CD with GitHub Actions
* Cloud deployment (Render + Vercel)

## 👨‍💻 Author

**Craig**
GitHub: https://github.com/craig24100
