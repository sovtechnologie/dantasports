import React from "react";
import "./Stylesheets/GymCard.css";
import HeartOutline from "../assets/VenueCardLogo/LikeLogo.png";
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";
import shareIcon from '../assets/VenueCardLogo/ShareLogo.png';
import { useNavigate } from "react-router-dom";
import gymImage from '../assets/GymImage.svg';
import { Share } from '../../../utils/share';

const GymCard = ({ gym, isLiked, onLikeToggle }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/Gym/${gym?.id}`);
    };

    const handleLikeClick = (e) => {
        console.log("EventCard like")
        e.preventDefault();
        e.stopPropagation();
        onLikeToggle(); // Call parent toggle
    };


    const handleShareClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Shared venue:", gym.id);
        Share(); // Call the share function from utils
        // Implement share logic
    };


    return (
        <div className="gym-card" onClick={handleClick}>
            <img src={gym.image} alt={gym.title} className="gym-image" onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = gymImage;
            }} />
            <div className="icon-top-right">
                <button className="icon-btns" onClick={handleLikeClick}>
                    <img src={isLiked ? HeartFilled : HeartOutline} alt="like" className="icon-img-btn" />
                </button>


                <button className="icon-btns" onClick={handleShareClick}>
                    <img src={shareIcon} alt="share" className="icon-img-btn" />
                </button>

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
