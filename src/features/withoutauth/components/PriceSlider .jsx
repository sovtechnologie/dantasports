import React, { useState } from "react";
import "../../withoutauth/Stylesheets/Filterpages/PriceSlider.css"

const PriceSlider = () => {
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    setPrice(parseInt(e.target.value));
    e.target.style.setProperty("--value", e.target.value);
  };

  return (
    <div className="price-container">
      <h3>Price</h3>

      <div className="price-range-labels">
        <span>₹0</span>
        <span>₹5000</span>
      </div>

      <input
        type="range"
        min="0"
        max="5000"
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
