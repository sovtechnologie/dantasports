import React from "react";
import "../../withoutauth/Stylesheets/Filterpages/DistanceSlider.css";

const DistanceSlider = ({ selectedDistance, setSelectedDistance }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setSelectedDistance(newValue);
    e.target.style.setProperty("--value", newValue);
  };

  return (
    <div className="distance-container">
      <h2 className="text-start">Distance</h2>

      {/* Labels for every 100 km */}
      <div className="distance-values">
        {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((num) => (
          <span
            key={num}
            className={`distance-label ${Math.round(selectedDistance / 100) * 100 === num ? "active" : ""
              }`}
          >
            {num}
          </span>
        ))}
      </div>

      <input
        type="range"
        min="0"
        max="800"
        step="1"
        value={selectedDistance}
        onChange={handleChange}
        className="distance-slider"
        style={{ "--value": selectedDistance }}
      />

      <p className="text-center mt-2">{selectedDistance}</p>
    </div>
  );
};

export default DistanceSlider;
