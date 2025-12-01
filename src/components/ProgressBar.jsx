import React from "react";

function ProgressBar({ percentual }) {
  return (
    <div style={{ margin: "20px auto", maxWidth: "600px" }}>
      <div
        style={{
          backgroundColor: "#ddd",
          borderRadius: "20px",
          overflow: "hidden",
          height: "30px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percentual}%`,
            background: "linear-gradient(90deg, #4caf50, #81c784)",
            height: "100%",
            transition: "width 0.3s ease",
          }}
        ></div>
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "5px",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          🚐 Nojinho
        </span>
      </div>
      <p style={{ marginTop: "10px" }}>
        Progresso total: <strong>{percentual.toFixed(2)}%</strong>
      </p>
    </div>
  );
}

export default ProgressBar;