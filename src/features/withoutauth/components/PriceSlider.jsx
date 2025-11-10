import React, { useState } from "react";
// import "./PriceSlider.css";
import "../../withoutauth/Stylesheets/Filterpages/priceRun.css"
const PriceSlider = () => {
  const [price, setPrice] = useState(150);
  const range = [0, 50, 100, 150, 200, 250, 300, 350,450];

  return (
    <div className="price-container">
      <h2>Price</h2>

      <div className="price-values">
        {range.map((item) => (
          <span
            key={item}
            className={price === item ? "active-price" : ""}
            onClick={() => setPrice(item)}
          >
            {item}
          </span>
        ))}
      </div>

      <input
        type="range"
        min="0"
        max="500"
        step="50"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="price-slider"
      />
    </div>
  );
};

export default PriceSlider;
