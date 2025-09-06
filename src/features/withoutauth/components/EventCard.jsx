import React from 'react';
import "./Stylesheets/EventCard.css";
import { Link } from 'react-router-dom';
import HeartOutline from "../assets/VenueCardLogo/LikeLogo.png";
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";
import shareIcon from '../assets/VenueCardLogo/ShareLogo.png';
import CalandarIcon from "../assets/Calandarlogo.svg"
import LocationIcon from "../assets/LocationLogo.svg";
import eventImage from '../assets/EventImage2.svg';
import { Share } from '../../../utils/share';

export default function EventCard({ event, isLiked, onLikeToggle }) {
    console.log(event)
    const handleLikeClick = (e) => {
        console.log("EventCard like")
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
        <Link to={`/Events/${event.id}`} className="event-card">
            <div className="event-image-section">
                <img src={event.image} alt={event.name} className="event-img" onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = eventImage;
                }} />
                <div className="icon-top-right">
                    <button className="icon-btns" onClick={handleLikeClick}>
                        <img src={isLiked ? HeartFilled : HeartOutline} alt="like" className="icon-img-btn" />
                    </button>
                      
                      <button  className="icon-btns" onClick={handleShareClick}>
                        <img src={shareIcon} alt="share" className="icon-img-btn" />
                      </button>
                    
                </div>
                <div className="icon-bottom-left">
                    {event.sportIcon?.map((sport, idx) => (
                        <img
                            key={sport.id || idx}
                            src={sport.image}
                            alt={sport.name}
                            className="icon-img-btn"
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/fallback-sport-icon.png';
                            }}
                        />
                    ))}
                </div>

            </div>

            <div className="event-content">
                <div className='events-middle'>
                    <h3 className="event-title">{event.name}</h3>
                    <div className="event-rating">
                        <span className="star">⭐</span> {event.rating} <span className="light-text">({event.RatingCount})</span>
                    </div>
                </div>


                <div className='events-middle' style={{ display: 'flex', justifyContent: 'space-between', flexDirection:"column" }}>
                    <div className="event-time">
                        <img src={CalandarIcon} alt='Calandar icon' className='event-time-img' />
                        <span>{event.date}</span>
                    </div>
                    <div className="event-location">
                        <img src={LocationIcon} alt='location icon' className='event-time-img' />
                        <span>{event.location}</span>
                    </div>
                </div>


                <div className="event-footer">
                    <span className="event-offer">{event.offer}</span>
                    <span className="event-price">{event.price}</span>
                </div>
            </div>
        </Link>
    );
}
