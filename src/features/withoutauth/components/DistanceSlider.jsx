import React, { useState } from "react";
import "../../withoutauth/Stylesheets/Filterpages/DistanceSlider.css";

const DistanceSlider = () => {
  const [value, setValue] = useState(15);

  const handleChange = (e) => {
    setValue(parseInt(e.target.value));
    e.target.style.setProperty("--value", e.target.value);
  };

  return (
    <div className="distance-container">
      <h3 className="text-start">Distance</h3>

      <div className="distance-values">
        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((num) => (
          <span
            key={num}
            className={`distance-label ${value === num ? "active" : ""}`}
          >
            {num.toString().padStart(2, "0")}
          </span>
        ))}
      </div>

      <input
        type="range"
        min="0"
        max="50"
        step="5"
        value={value}
        onChange={handleChange}
        className="distance-slider"
        style={{ "--value": value }}
      />
    </div>
  );
};

export default DistanceSlider;
