import React, { Suspense, useState } from "react";

// Fallback 2D Body Visualization (works without 3D model)
function Body2D({ riskScore }) {
  const [hoveredOrgan, setHoveredOrgan] = useState(null);

  const getColor = (risk) => {
    if (risk > 0.6) return "#ef4444";
    if (risk > 0.3) return "#facc15";
    return "#22c55e";
  };

  const organs = {
    brain: { x: 180, y: 40, label: "Brain", risk: riskScore * 0.8 },
    heart: { x: 170, y: 130, label: "Heart", risk: riskScore },
    lungs: { x: 150, y: 120, label: "Lungs", risk: riskScore * 0.7 },
    liver: { x: 160, y: 180, label: "Liver", risk: riskScore * 0.9 },
    kidneys: { x: 140, y: 200, label: "Kidneys", risk: riskScore * 0.6 },
  };

  return (
    <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="400" height="500" viewBox="0 0 400 500">
        {/* Body Outline */}
        <ellipse cx="200" cy="50" rx="50" ry="60" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="140" y="100" width="120" height="200" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="100" y="110" width="40" height="120" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="260" y="110" width="40" height="120" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="140" y="290" width="50" height="150" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="210" y="290" width="50" height="150" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" />

        {/* Organs */}
        {Object.entries(organs).map(([key, organ]) => (
          <g key={key}>
            <circle
              cx={organ.x}
              cy={organ.y}
              r={hoveredOrgan === key ? 25 : 20}
              fill={getColor(organ.risk)}
              fillOpacity={hoveredOrgan === key ? 0.9 : 0.7}
              stroke={getColor(organ.risk)}
              strokeWidth="2"
              onMouseEnter={() => setHoveredOrgan(key)}
              onMouseLeave={() => setHoveredOrgan(null)}
              style={{ cursor: "pointer", transition: "all 0.3s" }}
            />
            <text
              x={organ.x}
              y={organ.y + 5}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
              pointerEvents="none"
            >
              {organ.label}
            </text>
          </g>
        ))}

        {/* Risk Legend */}
        <g transform="translate(20, 420)">
          <text x="0" y="0" fill="#94a3b8" fontSize="12" fontWeight="bold">Risk Level:</text>
          <circle cx="10" cy="20" r="8" fill="#22c55e" />
          <text x="25" y="25" fill="#cbd5e1" fontSize="11">Low</text>
          <circle cx="70" cy="20" r="8" fill="#facc15" />
          <text x="85" y="25" fill="#cbd5e1" fontSize="11">Medium</text>
          <circle cx="150" cy="20" r="8" fill="#ef4444" />
          <text x="165" y="25" fill="#cbd5e1" fontSize="11">High</text>
        </g>
      </svg>

      {/* Hover Tooltip */}
      {hoveredOrgan && (
        <div style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#020617",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
        }}>
          <h4 style={{ margin: 0, fontSize: "14px", color: "#38bdf8" }}>
            {organs[hoveredOrgan].label}
          </h4>
          <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#cbd5e1" }}>
            Risk: {(organs[hoveredOrgan].risk * 100).toFixed(0)}%
          </p>
        </div>
      )}

      {/* Pulse Animation */}
      <div style={{
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        background: "rgba(56,189,248,0.1)",
        border: "1px solid rgba(56,189,248,0.3)",
        borderRadius: "20px"
      }}>
        <div style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: getColor(riskScore),
          animation: "pulse 1.5s infinite"
        }} />
        <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
          Digital Twin Active
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// Main BodyViewer with 3D fallback
function BodyViewer({ riskScore }) {
  const [use3D, setUse3D] = useState(false); // Default to 2D for reliability

  return (
    <div className="viewer" style={{ position: "relative" }}>
      <div style={{
        position: "absolute",
        top: "15px",
        left: "15px",
        zIndex: 10,
        display: "flex",
        gap: "8px"
      }}>
        <button
          onClick={() => setUse3D(false)}
          style={{
            padding: "8px 16px",
            background: !use3D ? "#38bdf8" : "#1e293b",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          2D View
        </button>
        <button
          onClick={() => setUse3D(true)}
          style={{
            padding: "8px 16px",
            background: use3D ? "#38bdf8" : "#1e293b",
            border: "none",
            borderRadius: "6px",
            color: "white",
            fontSize: "12px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          3D View (Beta)
        </button>
      </div>

      {!use3D ? (
        <Body2D riskScore={riskScore} />
      ) : (
        <div style={{ 
          height: "100%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          color: "#64748b",
          flexDirection: "column",
          gap: "15px"
        }}>
          <div style={{ fontSize: "48px" }}>🧬</div>
          <p>3D model loading requires @react-three/fiber</p>
          <p style={{ fontSize: "12px" }}>Switch to 2D View for visualization</p>
        </div>
      )}
    </div>
  );
}

export default BodyViewer;