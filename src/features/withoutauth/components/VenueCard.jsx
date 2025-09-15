import React from "react";
import "./Stylesheets/VenueCard.css";
import ShareLogo from "../assets/VenueCardLogo/ShareLogo.png";
import HeartOutline from "../assets/VenueCardLogo/LikeLogo.png";
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";
import image from "../assets/image.png";
import { Share } from "../../../utils/share.js";
import { Link } from "react-router-dom";

const VenueCard = ({ venue, isLiked, onLikeToggle }) => {
  const handleLikeClick = (e) => {
    console.log("venueCard like");
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle(); // Call parent toggle
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Shared venue:", venue.id);
    Share(); // Call the share function from utils
    // Implement share logic
  };

  return (
    <div className="venue-card-wrapper">
      <Link
        to={`/venue/${venue.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="venue-image-container">
          <img
            src={venue.image || image}
            alt={venue.name}
            className="venue-image"
            onError={(e) => (e.target.src = image)}
          />

          <div className="venue-sports-icons">
            {venue?.sportsIcons?.slice(0,5)?.map((icon, idx) => (
              <img
                src={icon?.image}
                key={idx}
                alt="sport"
                className="sport-iconvenue"
              />
            ))}
          </div>

          <div className="venue-top-icons">
            <button className="icon-btns" onClick={handleLikeClick}>
              <img
                src={isLiked ? HeartFilled : HeartOutline}
                alt="Like"
                className="Like-icon"
              />
            </button>
            <button className="icon-btns" onClick={handleShareClick}>
              <img src={ShareLogo} alt="Share" className="share-icon" />
            </button>
          </div>
        </div>

        <div className="venue-details">
          <div className="venue-header">
            <h4>{venue.name}</h4>
            <p className="venue-rating">
              <span className="venue-star">★</span>
              <span className="value">
                {venue.rating} ({venue.reviews})
              </span>
            </p>
          </div>
          <p className="venue-about">{venue.about}</p>
          <p className="venue-locations">
            {venue.address} (~{venue.distance} Km)
          </p>
          <div className="venue-footer">
            <span className="venue-discount">{venue.offer}</span>
            <span className="venue-price">{venue.price} onwards</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VenueCard;
