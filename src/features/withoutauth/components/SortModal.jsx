import React from "react";
import "../Stylesheets/SortBy.css";

const SortBy = ({ sortBy, setSortBy }) => {
  const handleSortChange = (type) => {
    if (type === "reset") setSortBy("");
    else setSortBy(type);
  };

  return (
    <div className="sortby-container p-3">
      <h6 className="fw-bold mb-3">Sort By</h6>

      <div className="sort-options d-flex flex-column gap-2">
        <button
          className={`sort-btn ${sortBy === "popularity" ? "active" : ""}`}
          onClick={() => handleSortChange("popularity")}
        >
          Popularity
        </button>

        <button
          className={`sort-btn ${sortBy === "nearby" ? "active" : ""}`}
          onClick={() => handleSortChange("nearby")}
        >
          Near By
        </button>

        <button
          className={`sort-btn ${sortBy === "favourite" ? "active" : ""}`}
          onClick={() => handleSortChange("favourite")}
        >
          Favorites
        </button>

        <button
          className={`sort-btn ${sortBy === "priceLow" ? "active" : ""}`}
          onClick={() => handleSortChange("priceLow")}
        >
          Price: Low to High
        </button>

        <button
          className="sort-btn reset"
          onClick={() => handleSortChange("reset")}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SortBy;
