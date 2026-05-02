import React from "react";
import "./StyleSheets/BookVenues.css";
import { Link } from "react-router-dom";
import gymImage from '../features/withoutauth/assets/GymImage.svg';
import star from "../assets/images/home/bookvenues/star.svg";
import mapIcon from "../assets/images/home/bookrun/map.svg";


const GymCard = ({ gym}) => {
    return (
        <Link to={`/gym/${gym?.id}`} className="hs-card hs-carousel-card">
            <div className="hs-card-img">
                <img src={gym?.image} alt={gym.title} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = gymImage;
                }} />
                <div className="hs-rating">
                    <img src={star} alt="" />
                    <span>{gym?.rating} ({gym?.ratingCount})</span>
                </div>
            </div>

            <div className="hs-card-body">
                <p className="hs-card-name">{gym?.title}</p>

                <div className="hs-card-meta">
                    <img src={mapIcon} alt="" />
                    <span>{gym?.location} (~{gym?.distance} Km)</span>
                </div>

                <div className="hs-card-footer">
                    <span className="hs-offer">{gym?.discountText}</span>
                    <span className="hs-price">{gym?.priceText}</span>
                </div>
            </div>
        </Link>
    );
};

export default GymCard;
