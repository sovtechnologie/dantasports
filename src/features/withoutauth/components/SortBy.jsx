import React from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";

const SORT_OPTIONS = [
  { id: "popularity", label: "Popularity",        icon: "🔥" },
  { id: "nearby",     label: "Nearest First",     icon: "📍" },
  { id: "favourite",  label: "My Favourites",     icon: "❤️" },
  { id: "priceLow",   label: "Price: Low to High",icon: "💰" },
];

export default function SortBy({ sortBy = [], setSortBy }) {
  const current = Array.isArray(sortBy) ? sortBy : [];

  const toggle = (id) => {
    setSortBy(current.includes(id) ? current.filter((t) => t !== id) : [...current, id]);
  };

  const reset = (e) => {
    e.preventDefault();
    setSortBy([]);
  };

  return (
    <div className="short_card">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Sort By</h2>
        {current.length > 0 && (
          <button type="button" onClick={reset} className="reset">
            Reset ({current.length})
          </button>
        )}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {SORT_OPTIONS.map((opt) => {
          const active = current.includes(opt.id);
          return (
            <div
              key={opt.id}
              className={`sort-option${active ? " sort-active" : ""}`}
              onClick={() => toggle(opt.id)}
              role="checkbox"
              aria-checked={active}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggle(opt.id)}
            >
              <label style={{ cursor: "pointer" }}>
                <span className="sort-icon">{opt.icon}</span>
                {opt.label}
              </label>
              <div className={`sort-checkbox${active ? " checked" : ""}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
