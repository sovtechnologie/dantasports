import React from "react";

/**
 * Full-page loading skeleton shown during route-level lazy loading.
 * Lightweight — no external deps.
 */
const PageLoader = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      padding: "40px 20px",
    }}
    aria-label="Loading page"
    role="status"
  >
    {/* Animated spinner */}
    <div
      style={{
        width: 44,
        height: 44,
        border: "4px solid #e8f0fd",
        borderTop: "4px solid #1163c7",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <p
      style={{
        fontFamily: "DM Sans, sans-serif",
        fontSize: 15,
        color: "#858585",
        margin: 0,
      }}
    >
      Loading…
    </p>
    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default PageLoader;
