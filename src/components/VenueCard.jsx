import React from 'react';
import "./StyleSheets/venueCard.css" // Assuming you have a CSS file for styling

const VenueCard = ({ name, rating, reviews, distance, sports, image, className= "" }) => {
  return (
    <div className= {`venue-card ${className}`}>
      <img src={image} alt={name} />
      <div className="venue-info">
        <h4>{name}</h4>
        <p className="rating">
          <span className="star">★</span>
          <span className="value">{rating}</span>
          <span className="count">({reviews})</span>
          <span className="distance">~{distance}</span>
        </p>
        <p className="sports">{sports}</p>
      </div>
    </div>
  );
};

export default VenueCard;



