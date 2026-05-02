import React from "react";

/**
 * Full-page loading screen shown during lazy-loaded route transitions.
 * Branded with Danta Sports blue.
 */
const PageLoader = () => (
  <div
    style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      padding: "40px 20px",
      background: "#ffffff",
    }}
    role="status"
    aria-label="Loading page"
  >
    {/* Spinner */}
    <div style={{ position: "relative", width: 52, height: 52 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "4px solid #e8f0fd",
          borderTop: "4px solid #1163c7",
          borderRadius: "50%",
          animation: "plSpin .75s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 8,
          border: "3px solid transparent",
          borderTop: "3px solid rgba(17,99,199,.3)",
          borderRadius: "50%",
          animation: "plSpin 1.2s linear infinite reverse",
        }}
      />
    </div>

    {/* Text */}
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontFamily: "Lato, sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#1163c7",
          margin: "0 0 4px",
          letterSpacing: ".3px",
        }}
      >
        Danta Sports
      </p>
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: 13,
          color: "#858585",
          margin: 0,
        }}
      >
        Loading…
      </p>
    </div>

    <style>{`
      @keyframes plSpin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);

export default PageLoader;
