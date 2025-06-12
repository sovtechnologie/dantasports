// InfoCard.jsx
import React from 'react';
import "./StyleSheets/InfoCard.css"; // Assuming you have a CSS file for styling


function InfoCard({ title, subtitle, image, className = "" }) {
  return (
    <div className={`info-card ${className}`}>
      <div className="info-card-image" style={{ backgroundImage: `url(${image})` }} />
      <div className="info-card-content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default InfoCard;
