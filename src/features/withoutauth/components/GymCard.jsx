import React from "react";
import "./Stylesheets/GymCard.css";
import heartIcon from '../assets/VenueCardLogo/LikeLogo.png';
import shareIcon from '../assets/VenueCardLogo/ShareLogo.png';

const GymCard = ({ gym
}) => {
    return (
        <div className="gym-card">
            <img src={gym.image} alt={gym.title} className="gym-image" />
            <div className="icon-top-right">
                <img src={heartIcon} alt="like" className="icon-img-btn" />
                <img src={shareIcon} alt="share" className="icon-img-btn" />
            </div>
            <div className="card-content">
                <div className="title-rating">
                    <h4 className="gym-title">{gym.title}</h4>
                    <div className="rating">
                        <span className="star">★</span>
                        <span className="rating-value">{gym.rating}</span>
                        <span className="rating-count">({gym.ratingCount})</span>
                    </div>
                </div>
                <p className="gym-location">
                    {gym.location} (~{gym.distance} Km)
                </p>
                <div className="gym-footer-row">
                    <span className="discount">{gym.discountText}</span>
                    <span className="price">{gym.priceText}</span>
                </div>
            </div>
        </div>
    );
};

export default GymCard;
