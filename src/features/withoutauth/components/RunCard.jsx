import React from 'react';
import "./Stylesheets/RunCard.css";
import { Link } from 'react-router-dom';
import heartIcon from '../assets/VenueCardLogo/LikeLogo.png';
import shareIcon from '../assets/VenueCardLogo/ShareLogo.png';
import CalandarIcon from "../assets/Calandarlogo.svg"
import LocationIcon from "../assets/LocationLogo.svg";

export default function RunCard({ event }) {
    return (
        <div className="run-card">
            <div className="run-image-section">
                <img src={event.image} alt="Marathon" className="run-img" />
                <div className="icon-top-right">
                    <img src={heartIcon} alt="like" className="icon-img-btn" />
                    <img src={shareIcon} alt="share" className="icon-img-btn" />
                </div>
                <div className="icon-bottom-left">
                    <img src={event.sportIcon} alt='sport' className='icon-img-btn' />
                </div>
            </div>

            <div className="run-content">
                <div className='runs-middle'>
                    <h3 className="run-title">{event.name}</h3>
                    <div className="run-rating">
                        <span className="star">⭐</span> {event.rating} <span className="light-text">({event.RatingCount})</span>
                    </div>
                </div>

                <div className="run-time">
                  <img src={CalandarIcon} alt='Calandar icon'/> <span>{event.date}</span>
                </div>

               <div className='runs-middle'>
                  <div className="run-location">
                    <img src={LocationIcon} alt='location icon'/> {event.location}
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
