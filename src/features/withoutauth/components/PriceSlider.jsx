import React, { useState, useEffect } from "react";
import "../../withoutauth/Stylesheets/Filterpages/priceRun.css";

const PriceSlider = ({ selectedPrice, setSelectedPrice }) => {
  const [price, setPrice] = useState(selectedPrice || 0);
  const range = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  // 🔁 Update parent state whenever price changes
  useEffect(() => {
    setSelectedPrice(price);
  }, [price, setSelectedPrice]);

  return (
    <div className="price-container">
      <h2>Price</h2>

      {/* numbers above slider */}
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

      {/* slider itself */}
      <input
        type="range"
        min="0"
        max="500"
        step="50"
        value={selectedPrice}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="price-slider"
      />
    </div>
  );
};

export default PriceSlider;
