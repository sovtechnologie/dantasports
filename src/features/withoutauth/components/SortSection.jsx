import React from 'react';
import './Stylesheets/SortSection.css';

export default function SortSection({ filters, setFilters, search, setSearch, handleReset }) {
  const handleCheckbox = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.checked });
  };

  return (
    <div className="sort-box-container">
      <label className="sort-title">Search</label>
      <input
        type="text"
        className="sort-search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="sort-header">
        <label className="sort-title">Sort by</label>
        <button className="sort-reset" onClick={handleReset}>Reset</button>
      </div>

      <div className="sortOption">
        <label><input type="checkbox" name="popularity" checked={filters.popularity || false} onChange={handleCheckbox} /> Popularity</label>
        <label><input type="checkbox" name="nearby" checked={filters.nearby || false} onChange={handleCheckbox} /> Near By</label>
        <label><input type="checkbox" name="favorites" checked={filters.favorites || false} onChange={handleCheckbox} /> Favorites</label>
        <label><input type="checkbox" name="lowtohigh" checked={filters.lowtohigh || false} onChange={handleCheckbox} /> Price: Low to High</label>
      </div>
    </div>
  );
}
