import { useState, useEffect } from "react";
import ChurnChart from "./components/ChurnChart";
import axios from "axios";
import "./App.css";
import AccuracyCard from "./components/AccuracyCard";

export default function App() {
  const [form, setForm] = useState({
    CreditScore: 650,
    Geography: "France",
    Gender: "Female",
    Age: 35,
    Tenure: 5,
    Balance: 50000,
    NumOfProducts: 2,
    HasCrCard: 1,
    IsActiveMember: 1,
    EstimatedSalary: 80000,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
  fetch("http://127.0.0.1:8000/stats")
    .then((res) => res.json())
    .then((data) => {
      setStats(data);
    });
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const predict = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        {
          CreditScore: Number(form.CreditScore),
          Geography: form.Geography,
          Gender: form.Gender,
          Age: Number(form.Age),
          Tenure: Number(form.Tenure),
          Balance: Number(form.Balance),
          NumOfProducts: Number(form.NumOfProducts),
          HasCrCard: Number(form.HasCrCard),
          IsActiveMember: Number(form.IsActiveMember),
          EstimatedSalary: Number(form.EstimatedSalary),
        }
      );

      setResult(response.data);
    } catch (err) {
      setError("Could not connect to the FastAPI server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🤖 AI Customer Churn Prediction</h1>
        
{stats && (
  <AccuracyCard accuracy={stats.accuracy} />
)}
      <div className="form-grid">

        <div className="field">
          <label>Credit Score</label>
          <input
            type="number"
            name="CreditScore"
            value={form.CreditScore}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Age</label>
          <input
            type="number"
            name="Age"
            value={form.Age}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Tenure</label>
          <input
            type="number"
            name="Tenure"
            value={form.Tenure}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Balance</label>
          <input
            type="number"
            name="Balance"
            value={form.Balance}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Estimated Salary</label>
          <input
            type="number"
            name="EstimatedSalary"
            value={form.EstimatedSalary}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Number of Products</label>
          <input
            type="number"
            name="NumOfProducts"
            value={form.NumOfProducts}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Geography</label>
          <select
            name="Geography"
            value={form.Geography}
            onChange={handleChange}
          >
            <option>France</option>
            <option>Germany</option>
            <option>Spain</option>
          </select>
        </div>

        <div className="field">
          <label>Gender</label>
          <select
            name="Gender"
            value={form.Gender}
            onChange={handleChange}
          >
            <option>Female</option>
            <option>Male</option>
          </select>
        </div>

        <div className="field">
          <label>Has Credit Card</label>
          <select
            name="HasCrCard"
            value={form.HasCrCard}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div className="field">
          <label>Active Member</label>
          <select
            name="IsActiveMember"
            value={form.IsActiveMember}
            onChange={handleChange}
          >
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

      </div>

      <button onClick={predict} disabled={loading}>
        {loading ? "Predicting..." : "Predict Customer"}
      </button>

      {error && (
        <div className="result">
          <h3>{error}</h3>
        </div>
      )}

      {result && (
        <div className="result">
          <h2
            className={
              result.prediction === 1 ? "high" : "low"
            }
          >
            {result.prediction === 1
              ? "🔴 High Churn Risk"
              : "🟢 Low Churn Risk"}
          </h2>

          <h3>
            Probability: {(result.probability * 100).toFixed(2)}%
          </h3>

          <p>
            {result.prediction === 1
              ? "This customer is likely to leave."
              : "This customer is likely to stay."}
          </p>
        </div>
        
      )}
    <ChurnChart />
    </div>
  );
}