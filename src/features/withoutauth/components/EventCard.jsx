import React from 'react';
import "./Stylesheets/EventCard.css";
import { Link } from 'react-router-dom';
import heartIcon from '../assets/VenueCardLogo/LikeLogo.png';
import shareIcon from '../assets/VenueCardLogo/ShareLogo.png';
import CalandarIcon from "../assets/Calandarlogo.svg"
import LocationIcon from "../assets/LocationLogo.svg";
import eventImage from '../assets/EventImage2.svg';

export default function EventCard({ event }) {
    console.log(event)
    return (
        <Link to={`/Events/${event.id}`} className="event-card">
            <div className="event-image-section">
                <img src={event.image} alt={event.name} className="event-img" onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = eventImage;
                }} />
                <div className="icon-top-right">
                    <img src={heartIcon} alt="like" className="icon-img-btn" />
                    <img src={shareIcon} alt="share" className="icon-img-btn" />
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


                <div className='events-middle' style={{display:'flex', justifyContent:'space-between'}}>
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
