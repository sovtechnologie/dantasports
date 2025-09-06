import React from "react";
import "./StyleSheets/HomeGymCard.css";
import { useNavigate } from "react-router-dom";
import gymImage from '../features/withoutauth/assets/GymImage.svg';


const GymCard = ({ gym}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/Gym/${gym?.id}`);
    };

  
    return (
        <div className="gym-card" onClick={handleClick}>
            <img src={gym?.image} alt={gym.title} className="gym-image" onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = gymImage;
            }} />
            <div className="card-content">
                <div className="title-rating">
                    <h4 className="gym-title">{gym?.title}</h4>
                    <div className="rating">
                        <span className="star">★</span>
                        <span className="rating-value">{gym?.rating}</span>
                        <span className="rating-count">({gym?.ratingCount})</span>
                    </div>
                </div>
                <p className="gym-location">
                    {gym?.location} (~{gym?.distance} Km)
                </p>
                <div className="gym-footer-row">
                    <span className="discount">{gym?.discountText}</span>
                    <span className="price">{gym?.priceText}</span>
                </div>
            </div>
        </div>
    );
};

export default GymCard;
