import React from "react";
import "../Stylesheets/SortBy.css";

const SortBy = ({ sortBy = [], setSortBy }) => {
  const current = Array.isArray(sortBy) ? sortBy : [];

  const handleSortChange = (type) => {
    if (current.includes(type)) {
      setSortBy(current.filter((t) => t !== type));
    } else {
      setSortBy([...current, type]);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSortBy([]);
  };

  const options = [
    { id: "popularity", label: "Popularity" },
    { id: "nearby", label: "Near By" },
    { id: "favourite", label: "Favorites" },
    { id: "priceLow", label: "Price: Low to High" },
  ];

  return (
    <div className="short_card">
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <h2 className="m-0">Sort by</h2>
        <a href="#" onClick={handleReset}>Reset</a>
      </div>

      {options.map((item) => (
        <div className="form-check" key={item.id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={`sort-${item.id}`}
            checked={current.includes(item.id)}
            onChange={() => handleSortChange(item.id)}
          />
          <label className="form-check-label" htmlFor={`sort-${item.id}`}>
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SortBy;
