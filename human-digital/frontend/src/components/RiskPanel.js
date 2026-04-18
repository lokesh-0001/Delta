import React from "react";

function RiskPanel({ data }) {
  const getRiskLevel = (score) => {
    if (score > 0.6) return { text: "High", color: "#ef4444", bg: "rgba(239,68,68,0.1)" };
    if (score > 0.3) return { text: "Medium", color: "#facc15", bg: "rgba(250,204,21,0.1)" };
    return { text: "Low", color: "#22c55e", bg: "rgba(34,197,94,0.1)" };
  };

  const risk = getRiskLevel(data.risk_score);

  return (
    <div className="risk-panel">
      <div style={{marginBottom: "20px"}}>
        <h2 style={{marginBottom: "10px"}}>🎯 Your Health Risk Analysis</h2>
        <p style={{color: "#94a3b8", fontSize: "14px"}}>{data.explanation}</p>
      </div>

      {/* Overall Risk Score */}
      <div style={{
        background: risk.bg,
        border: `2px solid ${risk.color}`,
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        <div style={{fontSize: "14px", color: "#94a3b8", marginBottom: "5px"}}>Overall Risk Score</div>
        <div style={{fontSize: "48px", fontWeight: "bold", color: risk.color}}>
          {(data.risk_score * 100).toFixed(0)}%
        </div>
        <div style={{fontSize: "16px", color: risk.color, fontWeight: "600", marginTop: "5px"}}>
          {risk.text} Risk
        </div>
      </div>

      {/* Risk Categories */}
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px"}}>
        
        <div className="card">
          <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px"}}>
            <span style={{fontSize: "24px"}}>🩺</span>
            <h4 style={{margin: 0, fontSize: "15px"}}>Diabetes Risk</h4>
          </div>
          <p style={{fontSize: "16px", fontWeight: "600", color: "#38bdf8", margin: 0}}>{data.diabetes}</p>
          <div style={{marginTop: "10px", height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden"}}>
            <div style={{
              height: "100%", 
              width: data.diabetes.includes("High") ? "80%" : data.diabetes.includes("Medium") ? "50%" : "30%",
              background: data.diabetes.includes("High") ? "#ef4444" : data.diabetes.includes("Medium") ? "#facc15" : "#22c55e",
              transition: "width 1s ease"
            }}></div>
          </div>
        </div>

        <div className="card">
          <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px"}}>
            <span style={{fontSize: "24px"}}>❤️</span>
            <h4 style={{margin: 0, fontSize: "15px"}}>Heart Risk</h4>
          </div>
          <p style={{fontSize: "16px", fontWeight: "600", color: "#ef4444", margin: 0}}>{data.heart}</p>
          <div style={{marginTop: "10px", height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden"}}>
            <div style={{
              height: "100%", 
              width: data.heart.includes("High") ? "80%" : data.heart.includes("Medium") ? "50%" : "30%",
              background: data.heart.includes("High") ? "#ef4444" : data.heart.includes("Medium") ? "#facc15" : "#22c55e",
              transition: "width 1s ease"
            }}></div>
          </div>
        </div>

        <div className="card">
          <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px"}}>
            <span style={{fontSize: "24px"}}>🏃</span>
            <h4 style={{margin: 0, fontSize: "15px"}}>Lifestyle Score</h4>
          </div>
          <p style={{fontSize: "16px", fontWeight: "600", color: "#22c55e", margin: 0}}>{data.lifestyle}</p>
          <div style={{marginTop: "10px", height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden"}}>
            <div style={{
              height: "100%", 
              width: "75%",
              background: "#22c55e",
              transition: "width 1s ease"
            }}></div>
          </div>
        </div>

      </div>

      {/* Recommendations */}
      <div style={{marginTop: "20px", padding: "15px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "8px"}}>
        <h4 style={{fontSize: "14px", color: "#22c55e", marginBottom: "10px"}}>💡 AI Recommendations</h4>
        <ul style={{margin: 0, paddingLeft: "20px", fontSize: "13px", lineHeight: "1.8", color: "#cbd5e1"}}>
          <li>Maintain {parseFloat(data.sleep) >= 7 ? "your healthy" : "better"} sleep schedule (7-9 hours recommended)</li>
          <li>{parseFloat(data.bmi) > 25 ? "Consider weight management through diet and exercise" : "Keep your BMI in healthy range"}</li>
          <li>Regular health checkups based on your age ({data.age} years)</li>
          <li>Stay hydrated and maintain balanced nutrition</li>
        </ul>
      </div>
    </div>
  );
}

export default RiskPanel;