import React from "react";
import "./Stylesheets/RunCard.css";
import { Link } from "react-router-dom";
import HeartOutline from "../assets/VenueCardLogo/LikeLogo.png";
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";
import shareIcon from "../assets/VenueCardLogo/ShareLogo.png";
import CalandarIcon from "../assets/Calandarlogo.svg";
import LocationIcon from "../assets/LocationLogo.svg";
import eventImage from "../assets/EventImage.svg";
import { Share } from "../../../utils/share";

export default function RunCard({ event, isLiked, onLikeToggle }) {
  const handleLikeClick = (e) => {
    console.log("EventCard like");
    e.preventDefault();
    e.stopPropagation();
    onLikeToggle(); // Call parent toggle
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Shared venue:", event.id);
    Share(); // Call the share function from utils
    // Implement share logic
  };

  return (
    <div className="run-card">
      <div className="run-image-section">
        <img
          src={event.image}
          alt="Marathon"
          className="run-img"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = eventImage;
          }}
        />
        <div className="icon-top-right">
          <button className="icon-btns" onClick={handleLikeClick}>
            <img
              src={isLiked ? HeartFilled : HeartOutline}
              alt="like"
              className="icon-img-btn"
            />
          </button>

          <button className="icon-btns" onClick={handleShareClick}>
            <img src={shareIcon} alt="share" className="icon-img-btn" />
          </button>
        </div>
        <div className="icon-bottom-left">
          {/* <img src={event.sportIcon} alt='sport' className='icon-img-btn' /> */}
          {event.sportIcon?.map((sport, idx) => (
            <img
              key={sport.id || idx}
              src={sport.image}
              alt={sport.name}
              className="icon-img-btn"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/fallback-sport-icon.png";
              }}
            />
          ))}
        </div>
      </div>

      <div className="run-content">
        <div className="runs-middle">
          <h3 className="run-title">{event.name}</h3>
          <div className="run-rating">
            <span className="star">★</span> {event.rating}{" "}
            <span className="light-text">({event.RatingCount})</span>
          </div>
        </div>

        <div className="run-time">
          <img src={CalandarIcon} alt="Calandar icon" />{" "}
          <span>{event.date}</span>
        </div>

        <div className="runs-middle">
          <div className="run-location">
            <img src={LocationIcon} alt="location icon" />
            <span>{event.location}</span>
          </div>
          {/* 🔗 Link to Detail Page */}
          <Link to={`/Run/${event.id}`} className="run-join">
            Join Now
          </Link>
        </div>

        <div className="run-footer">
          <span className="run-offer">{event.offer}</span>
          <span className="run-price">{event.price}</span>
        </div>
      </div>
    </div>
  );
}
