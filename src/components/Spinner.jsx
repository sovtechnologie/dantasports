import React from "react";
import "./StyleSheets/Spinner.css";

function Spinner({ size = 40, color = "#1163c7" }) {
  return (
    <div className="custom-spinner-wrapper" role="status" aria-label="Loading">
      <div
        className="custom-spinner"
        style={{
          width: size,
          height: size,
          borderTopColor: color,
        }}
      />
    </div>
  );
}

export default Spinner;
