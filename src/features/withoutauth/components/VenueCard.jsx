import React from "react";
import "../../../components/StyleSheets/BookVenues.css";
import ShareLogo from "../../../assets/svg-icons/share-circle.svg";
import HeartOutline from "../../../assets/svg-icons/heart-outline.svg";
import HeartFilled from "../../../assets/svg-icons/heart-filled.svg";
import image from "../assets/image.png";
import { Share } from "../../../utils/share.js";
import { Link } from "react-router-dom";
import star from "../../../assets/images/home/bookvenues/star.svg";
import mapIcon from "../../../assets/images/home/bookrun/map.svg";

const VenueCard = ({ venue, isLiked, onLikeToggle }) => {
  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle(); // Call parent toggle
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    Share(); // Call the share function from utils
    // Implement share logic
  };

  return (
      <Link to={`/venue/${venue.id}`} className="hs-card hs-list-card">
        <div className="hs-card-img">
          <img
            src={venue.image || image}
            alt={venue.name}
            onError={(e) => (e.target.src = image)}
          />

          <div className="hs-rating">
            <img src={star} alt="" />
            <span>{venue.rating || "0.0"} ({venue.reviews || 0})</span>
          </div>

          <div className="hs-sports hs-sports-overlay">
            {venue?.sportsIcons?.slice(0,5)?.map((icon, idx) => (
              <div className="hs-sport-icon" key={idx}>
                <img src={icon?.image} alt="sport" />
              </div>
            ))}
          </div>

          <div className="hs-actions">
            <button className="hs-action-btn" onClick={handleLikeClick} aria-label="Like">
              <img
                src={isLiked ? HeartFilled : HeartOutline}
                alt=""
              />
            </button>
            <button className="hs-action-btn" onClick={handleShareClick} aria-label="Share">
              <img src={ShareLogo} alt="" />
            </button>
          </div>
        </div>

        <div className="hs-card-body">
          <p className="hs-card-name">{venue.name}</p>
          {venue.about && <p className="hs-card-subtext">{venue.about}</p>}
          <div className="hs-card-meta">
            <img src={mapIcon} alt="" />
            <span>{venue.address} (~{venue.distance} Km)</span>
          </div>
          <div className="hs-card-footer">
            <span className="hs-offer">{venue.offer}</span>
            <span className="hs-price">{venue.price} onwards</span>
          </div>
        </div>
      </Link>
  );
};

export default VenueCard;
