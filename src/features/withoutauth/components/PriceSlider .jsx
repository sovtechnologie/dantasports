import React from "react";
import "../../withoutauth/Stylesheets/Filterpages/PriceSlider.css";

const PriceSlider = ({ priceRange, setPriceRange }) => {
  const handleChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
  };

  return (
    <div className="price-container">
      <h2>Price</h2>

      <div className="price-range-labels">
        <span>₹0</span>
        <span>₹10000</span>
      </div>

      <input
        type="range"
        min={0}
        max={10000}
        step={100}
        value={priceRange[1]}   // ✅ NUMBER ONLY
        onChange={handleChange}
        className="price-slider"
      />

      <p className="selected-price">
        Showing gyms up to <span>₹{priceRange[1]}</span>
      </p>
    </div>
  );
};

export default PriceSlider;
