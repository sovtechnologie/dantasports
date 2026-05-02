import React from "react";

/**
 * Inline branded loader — used for "load more" states in filter pages.
 * Replaces Bootstrap spinner-border which uses Bootstrap blue.
 */
const InlineLoader = ({ text = "Loading more…" }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      padding: "24px 0",
      width: "100%",
    }}
    role="status"
    aria-label={text}
  >
    <div style={{ position: "relative", width: 36, height: 36 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "3px solid rgba(17,99,199,.15)",
          borderTop: "3px solid #1163C7",
          borderRadius: "50%",
          animation: "ilSpin .75s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 6,
          border: "2px solid transparent",
          borderTop: "2px solid rgba(17,99,199,.35)",
          borderRadius: "50%",
          animation: "ilSpin 1.2s linear infinite reverse",
        }}
      />
    </div>
    <p
      style={{
        fontFamily: "DM Sans, sans-serif",
        fontSize: 13,
        color: "#858585",
        margin: 0,
      }}
    >
      {text}
    </p>
    <style>{`@keyframes ilSpin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default InlineLoader;
