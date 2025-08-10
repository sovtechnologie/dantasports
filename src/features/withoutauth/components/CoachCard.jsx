import React from "react";
import "./Stylesheets/CoachCard.css";
import LocationIcon from "../assets/LocationLogo.svg";
import { useNavigate } from "react-router-dom";

const CoachCard = ({ coach }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/Coach/${coach?.tag}`);
    };

    return (
        <div className="coach-card" onClick={handleClick} style={{ cursor: "pointer" }}>
            <div className="coach-card-image-wrapper">
                <img src={coach?.image} alt={coach?.name} className="coach-card-image" />
                <div className="coach-card-tag">{coach?.tag}</div>
                <div className="icon-bottom-left">
                    <img src={coach?.avatar} alt='sport' className='icon-img-btn' />
                </div>
            </div>

            <div className="coach-card-details">
                <div className="coach-card-profile">
                    <div className="coach-card-name-location">
                        <div className="coach-card-name">{coach?.name}</div>

                    </div>
                    <div className="coach-card-rating">
                        <span className="coach-card-star">★</span>
                        <span>{coach?.rating}</span>
                        <span className="coach-card-rating-count">({coach?.ratingCount})</span>
                    </div>
                </div>
                <div className="coach-raw-footer">
                    <div className="coach-card-location"><img src={LocationIcon} alt='location icon' className='event-time-img' />{coach?.location}</div>
                    <div className="coach-card-category">{coach?.category}</div>
                </div>

            </div>
        </div>
    );
};

export default CoachCard;
