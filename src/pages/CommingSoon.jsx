import React from "react";
import "../stylesheets/CommingSoon.css";

function CommingSoon() {
  return (
    <div
      className="container"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="card coming-soon-card">
        <h1 className="title">Coming Soon</h1>
        <p className="subtitle">
          Something awesome is in the works. Stay tuned!
        </p>
      </div>
    </div>
  );
}

export default CommingSoon;
