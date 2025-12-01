import React from "react";

function UserButton({ label, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: active ? color : "#ddd",
        color: active ? "white" : "black",
        padding: "10px 15px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        minWidth: "120px",
        fontWeight: "bold",
      }}
    >
      {label}
    </button>
  );
}

export default UserButton;