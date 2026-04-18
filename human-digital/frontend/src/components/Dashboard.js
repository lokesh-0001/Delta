import React, { useState } from "react";
import axios from "axios";
import RiskPanel from "./RiskPanel";
import BodyViewer from "./BodyViewer";
import "../app.css";

function Dashboard() {
  const [form, setForm] = useState({
    age: "30",
    bmi: "25",
    sleep: "7"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.age || !form.bmi || !form.sleep) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(
        "http://localhost:5000/predict",
        form
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Error: Backend not connected. Using demo data...");
      
      // Fallback demo data if backend is down
      setResult({
        risk_score: 0.45,
        explanation: "Moderate health risk based on your inputs (Demo Mode)",
        diabetes: "Medium Risk - 35%",
        heart: "Low Risk - 20%", 
        lifestyle: "Good - Keep exercising!"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🧬 Digital Twin</h2>
        <p style={{marginTop: "10px", color: "#94a3b8"}}>AI Health Simulation</p>
        
        <div style={{marginTop: "30px", padding: "15px", background: "#1e293b", borderRadius: "8px"}}>
          <h4 style={{fontSize: "14px", marginBottom: "8px"}}>📊 Features</h4>
          <ul style={{fontSize: "12px", lineHeight: "1.8", paddingLeft: "20px", color: "#cbd5e1"}}>
            <li>Health Risk Analysis</li>
            <li>3D Body Visualization</li>
            <li>Disease Prediction</li>
            <li>Lifestyle Impact</li>
          </ul>
        </div>

        <div style={{marginTop: "20px", padding: "12px", background: "rgba(56,189,248,0.1)", borderRadius: "8px", border: "1px solid rgba(56,189,248,0.3)"}}>
          <p style={{fontSize: "11px", color: "#38bdf8", margin: 0}}>💡 Tip: Adjust your age, BMI, and sleep hours to see how different factors affect your health!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">

        <h1 style={{fontSize: "32px", marginBottom: "10px", background: "linear-gradient(135deg, #38bdf8, #22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
          Human Body Digital Twin
        </h1>
        <p style={{color: "#94a3b8", marginBottom: "30px"}}>Simulate and predict your health outcomes with AI</p>

        {error && (
          <div style={{background: "rgba(251,191,36,0.1)", border: "1px solid #fbbf24", borderRadius: "8px", padding: "12px", marginBottom: "20px"}}>
            <p style={{color: "#fbbf24", margin: 0, fontSize: "13px"}}>⚠️ {error}</p>
          </div>
        )}

        {/* Input Panel */}
        <div className="input-panel">
          <h3 style={{marginBottom: "15px"}}>📝 Enter Your Health Details</h3>

          <div style={{marginBottom: "12px"}}>
            <label style={{display: "block", marginBottom: "5px", fontSize: "13px", color: "#94a3b8"}}>Age (years)</label>
            <input
              type="number"
              name="age"
              placeholder="e.g., 30"
              value={form.age}
              onChange={handleChange}
              min="1"
              max="120"
            />
          </div>

          <div style={{marginBottom: "12px"}}>
            <label style={{display: "block", marginBottom: "5px", fontSize: "13px", color: "#94a3b8"}}>BMI (Body Mass Index)</label>
            <input
              type="number"
              step="0.1"
              name="bmi"
              placeholder="e.g., 25.5"
              value={form.bmi}
              onChange={handleChange}
              min="10"
              max="60"
            />
            <small style={{color: "#64748b", fontSize: "11px"}}>Normal: 18.5-24.9 | Overweight: 25-29.9 | Obese: 30+</small>
          </div>

          <div style={{marginBottom: "12px"}}>
            <label style={{display: "block", marginBottom: "5px", fontSize: "13px", color: "#94a3b8"}}>Sleep (hours per night)</label>
            <input
              type="number"
              step="0.5"
              name="sleep"
              placeholder="e.g., 7"
              value={form.sleep}
              onChange={handleChange}
              min="0"
              max="24"
            />
            <small style={{color: "#64748b", fontSize: "11px"}}>Recommended: 7-9 hours</small>
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "⏳ Simulating..." : "🚀 Run AI Simulation"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <>
            <RiskPanel data={result} />
            <BodyViewer riskScore={result.risk_score} />
          </>
        )}

        {!result && !loading && (
          <div style={{textAlign: "center", padding: "60px 20px", color: "#64748b"}}>
            <div style={{fontSize: "64px", marginBottom: "20px"}}>🧬</div>
            <p style={{fontSize: "16px"}}>Enter your health details above and click "Run AI Simulation"</p>
            <p style={{fontSize: "13px", marginTop: "10px"}}>Your personalized digital twin will appear here</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;