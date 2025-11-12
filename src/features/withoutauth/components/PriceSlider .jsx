import React, { useState } from "react";
import "../../withoutauth/Stylesheets/Filterpages/PriceSlider.css";

const PriceSlider = ({ priceRange, setPriceRange }) => {
  const [price, setPrice] = useState(priceRange?.[1] || 10000);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setPrice(value);
    setPriceRange([0, value]); // 👈 send to parent
    e.target.style.setProperty("--value", value);
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
        min="0"
        max="10000"
        step="100"
        value={price}
        onChange={handleChange}
        className="price-slider"
        style={{ "--value": price }}
      />
      <p className="selected-price">
        Selected: <span>₹{price}</span>
      </p>
    </div>
  );
};

export default PriceSlider;
