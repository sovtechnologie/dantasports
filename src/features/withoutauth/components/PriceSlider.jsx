import React, { useEffect, useState } from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";

const MAX = 500;

export default function PriceSlider({ selectedPrice, setSelectedPrice, priceRange, setPriceRange }) {
  // Support both single-value (Run/Event) and range (Gym) modes
  const isRange = typeof priceRange !== "undefined";
  const [val, setVal] = useState(selectedPrice || 0);

  useEffect(() => {
    if (!isRange) setSelectedPrice(val);
  }, [val]);

  const pct = isRange
    ? ((priceRange?.[1] || 0) / 10000) * 100
    : (val / MAX) * 100;

  if (isRange) {
    const maxVal = priceRange?.[1] || 0;
    return (
      <div className="price-container">
        <p className="filter_sub_title" style={{ marginBottom: 8 }}>💰 Price Range</p>
        <div className="price-header">
          <span style={{ fontFamily: "DM Sans,sans-serif", fontSize: 12, color: "#858585" }}>₹0</span>
          <span className="price-current">Up to ₹{maxVal.toLocaleString()}</span>
          <span style={{ fontFamily: "DM Sans,sans-serif", fontSize: 12, color: "#858585" }}>₹10,000</span>
        </div>
        <div className="price-slider-wrap">
          <input
            type="range"
            min={0}
            max={10000}
            step={500}
            value={maxVal}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="price-slider"
            style={{ "--slider-pct": `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="price-container">
      <p className="filter_sub_title" style={{ marginBottom: 8 }}>💰 Max Price</p>
      <div className="price-header">
        <span style={{ fontFamily: "DM Sans,sans-serif", fontSize: 12, color: "#858585" }}>₹0</span>
        <span className="price-current">
          {val === 0 ? "Any price" : `Up to ₹${val}`}
        </span>
        <span style={{ fontFamily: "DM Sans,sans-serif", fontSize: 12, color: "#858585" }}>₹{MAX}</span>
      </div>
      <div className="price-slider-wrap">
        <input
          type="range"
          min={0}
          max={MAX}
          step={50}
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="price-slider"
          style={{ "--slider-pct": `${pct}%` }}
        />
      </div>
      <div className="price-range-labels">
        <span>Free</span>
        <span>₹{MAX / 2}</span>
        <span>₹{MAX}+</span>
      </div>
    </div>
  );
}
