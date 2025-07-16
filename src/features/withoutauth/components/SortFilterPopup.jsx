import React, { useState } from 'react';
import './Stylesheets/SortFilterPopup.css';

const SORT_OPTIONS = [
  { id: 1, label: 'Popularity' },
  { id: 2, label: 'Near By' },
  { id: 3, label: 'Favorites' },
  { id: 4, label: 'Price: Low to High' },
];

const SortFilterPopup = ({ onClose, onApply, selected, setSelected,reset }) => {
  const handleReset = () => {
    reset();
    onClose();
  };
  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container"  onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>Sort by</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sort-options">
          {SORT_OPTIONS.map(({ id, label }) => (
            <label key={id} className="sort-option">
              <span>{label}</span>
              <input
                type="radio"
                name="sort"
                value={id}
                checked={selected === id}
                onChange={() => setSelected(id)}
              />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>

        <div className="popup-actions">
          <button className="btn reset-btn" onClick={handleReset}>RESET</button>
          <button className="btn apply-btn" onClick={handleApply}>APPLY</button>
        </div>
      </div>
    </div>
  );
};

export default SortFilterPopup;
