import React from "react";
import "./StyleSheets/venueCard.css";
import VenueImage1 from "../assets/VenueImage/Venue-image1.png";
import { Link } from "react-router-dom";

const VenueCardHome = ({ id, name, rating, reviews, distance, address, sports = [], image, className = "" }) => {
  return (
    <Link to={`/venue/${id}`} className={`venue-card ${className}`}>
      <div className="venue-card-img-wrap">
        <img
          src={image || VenueImage1}
          alt={name}
          onError={(e) => (e.target.src = VenueImage1)}
          className="venuehome-img"
          loading="lazy"
        />
        {/* Rating badge */}
        <div className="venue-rating-badge">
          <span className="venue-star">★</span>
          <span>{rating}</span>
          <span className="venue-reviews">({reviews})</span>
        </div>
      </div>

      <div className="venue-info">
        <h4 className="venue-name">{name}</h4>
        {address && <p className="venue-address">{address} · ~{distance}</p>}
        {sports.length > 0 && (
          <p className="venue-sports">
            {Array.isArray(sports) ? sports.map((s) => s.name).join(", ") : sports}
          </p>
        )}
      </div>
    </Link>
  );
};

export default VenueCardHome;
