import React from 'react';
import "./Stylesheets/EventCard.css";
import { Link } from 'react-router-dom';
import heartIcon from '../assets/VenueCardLogo/LikeLogo.png';
import shareIcon from '../assets/VenueCardLogo/ShareLogo.png';
import CalandarIcon from "../assets/Calandarlogo.svg"
import LocationIcon from "../assets/LocationLogo.svg";

export default function EventCard({ event }) {
    return (
        <div className="event-card">
            <div className="event-image-section">
                <img src={event.image} alt="Marathon" className="event-img" />
                <div className="icon-top-right">
                    <img src={heartIcon} alt="like" className="icon-img-btn" />
                    <img src={shareIcon} alt="share" className="icon-img-btn" />
                </div>
                <div className="icon-bottom-left">
                    <img src={event.sportIcon} alt='sport' className='icon-img-btn' />
                </div>
            </div>

            <div className="event-content">
                <div className='events-middle'>
                    <h3 className="event-title">{event.name}</h3>
                    <div className="event-rating">
                        <span className="star">⭐</span> {event.rating} <span className="light-text">({event.RatingCount})</span>
                    </div>
                </div>

                <div className="event-time">
                  <img src={CalandarIcon} alt='Calandar icon'/> <span>{event.date}</span>
                </div>

               <div className='events-middle'>
                  <div className="event-location">
                    <img src={LocationIcon} alt='location icon'/> {event.location}
                </div>
                 {/* 🔗 Link to Detail Page */}
                    <Link to={`/Run/${event.id}`} className="event-join">
                        Join Now
                    </Link>
               </div>
                

                <div className="event-footer"> 
                    <span className="event-offer">{event.offer}</span>
                    <span className="event-price">{event.price}</span>
                </div>
            </div>
        </div>
    );
}
