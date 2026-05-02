import React from "react";
import "./StyleSheets/BookVenues.css";
import VenueImage1 from "../assets/VenueImage/Venue-image1.png";
import { Link } from "react-router-dom";
import mapIcon from "../assets/images/home/bookrun/map.svg";
import star from "../assets/images/home/bookvenues/star.svg";

const VenueCardHome = ({ id, name, rating, reviews, distance, address, sports = [], image, className = "" }) => {
  return (
    <Link to={`/venue/${id}`} className={`hs-card hs-carousel-card ${className}`}>
      <div className="hs-card-img">
        <img
          src={image || VenueImage1}
          alt={name}
          onError={(e) => (e.target.src = VenueImage1)}
          loading="lazy"
        />
        <div className="hs-rating">
          <img src={star} alt="" />
          <span>{rating} ({reviews})</span>
        </div>
      </div>

      <div className="hs-card-body">
        <p className="hs-card-name">{name}</p>
        {address && (
          <div className="hs-card-meta">
            <img src={mapIcon} alt="" />
            <span>{address} · ~{distance}</span>
          </div>
        )}
        {sports.length > 0 && (
          <p className="hs-card-meta">
            {Array.isArray(sports) ? sports.map((s) => s.name).join(", ") : sports}
          </p>
        )}
      </div>
    </Link>
  );
};

export default VenueCardHome;
