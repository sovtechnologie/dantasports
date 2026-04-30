import React, { useMemo, useState } from "react";
import "./Stylesheets/SortSection.css";
import SearchIcon from "../assets/Search-icon.png";

export default function SortSection({
  filters,
  setFilters,
  search,
  setSearch,
  handleReset,
  runList,
  selectedEvent,
  setSelectedEvent,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCheckbox = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.checked });

  const suggestions = useMemo(() => {
    if (!search) return [];
    return runList
      .filter((evt) =>
        evt.event_title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 5);
  }, [search, runList]);

  return (
    <aside className="sort-left-section">
      <div className="sort-filters">
        <div className="sort-filter-header">
          <h3>Search</h3>
        </div>

        <div className="sort-filter-sec1">
          <div className="sort-search-input-container">
            <img src={SearchIcon} alt="search" className="sort-search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedEvent(null);
                setShowDropdown(true);
              }}
              onFocus={() => search && setShowDropdown(true)}
            />
            {search && (
              <button
                type="button"
                className="sort-clear-search-btn"
                onClick={() => {
                  setSearch("");
                  setSelectedEvent(null);
                  setShowDropdown(false);
                }}
              >
                &times;
              </button>
            )}
          </div>

          {showDropdown && suggestions.length > 0 && (
            <ul className="sort-search-dropdown">
              {suggestions.map((evt) => (
                <li
                  key={evt.id}
                  onClick={() => {
                    setSearch(evt.event_title);
                    setSelectedEvent(evt.event_title);
                    setShowDropdown(false);
                  }}
                >
                  {evt.event_title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="sort-box">
        <div className="sort-filter-header">
          <h3 className="sort-header-sort">Sort By</h3>
          <button className="sort-reset-btns" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="sort-checkbox-list">
          {[
            { key: "popularity", label: "Popularity" },
            { key: "nearby", label: "Nearby" },
            { key: "favorites", label: "Favourites" },
            { key: "lowtohigh", label: "Price: Low to High" },
          ].map((item) => (
            <label className="sort-checkbox-item" key={item.key}>
              <input
                type="checkbox"
                name={item.key}
                checked={filters[item.key] || false}
                onChange={handleCheckbox}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
