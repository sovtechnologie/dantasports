import React from 'react';
import "../../../components/StyleSheets/BookVenues.css";
import { Link } from 'react-router-dom';
import HeartOutline from "../../../assets/svg-icons/heart-outline.svg";
import HeartFilled from "../../../assets/svg-icons/heart-filled.svg";
import shareIcon from '../../../assets/svg-icons/share-circle.svg';
import CalandarIcon from "../assets/Calandarlogo.svg"
import LocationIcon from "../assets/LocationLogo.svg";
import eventImage from '../assets/EventImage2.svg';
import { Share } from '../../../utils/share';
import star from "../../../assets/images/home/bookvenues/star.svg";

export default function EventCard({ event, isLiked, onLikeToggle }) {
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
        <Link to={`/events/${event.id}`} className="hs-card hs-list-card">
            <div className="hs-card-img">
                <img src={event.image} alt={event.name} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = eventImage;
                }} />
                <div className="hs-rating">
                    <img src={star} alt="" />
                    <span>{event.rating || "0.0"} ({event.RatingCount || 0})</span>
                </div>
                <div className="hs-actions">
                    <button className="hs-action-btn" onClick={handleLikeClick} aria-label="Like">
                        <img src={isLiked ? HeartFilled : HeartOutline} alt="" />
                    </button>

                    <button className="hs-action-btn" onClick={handleShareClick} aria-label="Share">
                        <img src={shareIcon} alt="" />
                    </button>

                </div>
                <div className="hs-sports hs-sports-overlay">
                    {event.sportIcon?.map((sport, idx) => (
                        <div className="hs-sport-icon" key={sport.id || idx} title={sport.name}>
                            <img
                                src={sport.image}
                                alt={sport.name}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/fallback-sport-icon.png';
                                }}
                            />
                        </div>
                    ))}
                </div>

            </div>

            <div className="hs-card-body">
                <p className="hs-card-name">{event.name}</p>

                    <div className="hs-card-meta">
                        <img src={CalandarIcon} alt='' />
                        <span>{event.date}</span>
                    </div>
                    <div className="hs-card-meta">
                        <img src={LocationIcon} alt='' />
                        <span>{event.location}</span>
                    </div>


                <div className="hs-card-footer">
                    <span className="hs-offer">{event.offer}</span>
                    <span className="hs-price">{event.price}</span>
                </div>
            </div>
        </Link>
    );
}
