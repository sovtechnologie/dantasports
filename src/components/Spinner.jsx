// Spinner.jsx
import React from 'react';
import './StyleSheets/Spinner.css';

function Spinner({ size = 40, color = "#007bff" }) {
    return (
        <div className="custom-spinner-wrapper">
            <div
                className="custom-spinner"
                style={{ width: size, height: size, borderColor: `${color} transparent transparent transparent` }}
                aria-label="Loading"
            />
        </div>
    );
}

export default Spinner;
