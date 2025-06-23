import React from 'react';
import "./StyleSheets/venueCard.css" // Assuming you have a CSS file for styling
import VenueImage1 from '../assets/VenueImage/Venue-image1.png';
import { Link } from 'react-router-dom';


const VenueCard = ({ id, name, rating, reviews, distance, sports = [], image, className = '' }) => {
  return (
    <Link to={`/venue/${id}`} className={`venue-card ${className}`}>
      <img
        src={image || VenueImage1}
        alt={name}
        onError={(e) => (e.target.src = VenueImage1)}
      />
      <div className="venue-info">
        <h4>{name}</h4>
        <p className="rating">
          <span className="star">★</span>
          <span className="value">{rating}</span>
          <span className="count">({reviews})</span>
          <span className="distance">~{distance}</span>
        </p>
        <p className="sports">{Array.isArray(sports) ? sports.join(', ') : sports}</p>
      </div>
    </Link>
  );
};

export default VenueCard;



