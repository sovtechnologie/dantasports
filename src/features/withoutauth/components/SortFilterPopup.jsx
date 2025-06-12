import React, { useState } from 'react';
import './Stylesheets/SortFilterPopup.css';

const SORT_OPTIONS = [
  'Popularity',
  'Near By',
  'Favorites',
  'Price: Low to High',
];

const SortFilterPopup = ({ onClose, onApply, selected, setSelected }) => {
  const handleReset = () => setSelected('');
  const handleApply = () => onApply(selected);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container"  onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <h3>Sort by</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sort-options">
          {SORT_OPTIONS.map((option) => (
            <label key={option} className="sort-option">
              <span>{option}</span>
              <input
                type="radio"
                name="sort"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
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
