import React from "react";
import "../../../components/StyleSheets/BookVenues.css";
import HeartOutline from "../../../assets/svg-icons/heart-outline.svg";
import HeartFilled from "../../../assets/svg-icons/heart-filled.svg";
import shareIcon from '../../../assets/svg-icons/share-circle.svg';
import { Link } from "react-router-dom";
import gymImage from '../assets/GymImage.svg';
import { Share } from '../../../utils/share';
import star from "../../../assets/images/home/bookvenues/star.svg";
import mapIcon from "../../../assets/images/home/bookrun/map.svg";

const GymCard = ({ gym, isLiked, onLikeToggle }) => {
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
        <Link to={`/gym/${gym?.id}`} className="hs-card hs-list-card">
            <div className="hs-card-img">
                <img src={gym.image} alt={gym.title} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = gymImage;
                }} />
                <div className="hs-rating">
                    <img src={star} alt="" />
                    <span>{gym.rating || "0.0"} ({gym.ratingCount || 0})</span>
                </div>
            <div className="hs-actions">
                <button className="hs-action-btn" onClick={handleLikeClick} aria-label="Like">
                    <img src={isLiked ? HeartFilled : HeartOutline} alt="" />
                </button>


                <button className="hs-action-btn" onClick={handleShareClick} aria-label="Share">
                    <img src={shareIcon} alt="" />
                </button>

            </div>
            </div>
            <div className="hs-card-body">
                <p className="hs-card-name">{gym.title}</p>
                <div className="hs-card-meta">
                    <img src={mapIcon} alt="" />
                    <span>{gym.location} (~{gym.distance} Km)</span>
                </div>
                <div className="hs-card-footer">
                    <span className="hs-offer">{gym.discountText}</span>
                    <span className="hs-price">{gym.priceText}</span>
                </div>
            </div>
        </Link>
    );
};

export default GymCard;
