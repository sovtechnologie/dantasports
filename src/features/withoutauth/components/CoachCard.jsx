import React from "react";
import "../../../components/StyleSheets/BookVenues.css";
import LocationIcon from "../assets/LocationLogo.svg";
import { Link } from "react-router-dom";
import coachImage from '../assets/CoachImage1.svg';
import star from "../../../assets/images/home/bookvenues/star.svg";

const CoachCard = ({ coach }) => {
    return (
        <Link to={`/coach/${coach?.id}`} className="hs-card hs-list-card">
            <div className="hs-card-img">
                <img src={coach?.image} alt={coach?.name} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = coachImage;
                }} />
                <div className="hs-rating">
                    <img src={star} alt="" />
                    <span>{coach?.rating || "0.0"} ({coach?.ratingCount || 0})</span>
                </div>
                <div className="hs-badge">{coach?.tag}</div>
                <div className="hs-sports hs-sports-overlay">
                    {coach.sportIcon?.map((sport, idx) => (
                        <div className="hs-sport-icon" key={sport.id || idx} title={sport.sports_name}>
                            <img
                                src={sport.sports_images}
                                alt={sport.sports_name}
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
                <p className="hs-card-name">{coach?.name}</p>
                <div className="hs-card-meta">
                    <img src={LocationIcon} alt='' />
                    <span>{coach?.location}</span>
                </div>
                <div className="hs-card-footer">
                    <span className="hs-offer">{coach?.category}</span>
                    <span className="hs-cta-chip">Enquire</span>
                </div>

            </div>
        </Link>
    );
};

export default CoachCard;
