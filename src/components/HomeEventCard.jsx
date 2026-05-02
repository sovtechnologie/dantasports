import React from 'react';
import "./StyleSheets/BookVenues.css";
import { Link } from 'react-router-dom';
import CalandarIcon from "../features/withoutauth/assets/Calandarlogo.svg"
import LocationIcon from "../features/withoutauth/assets/LocationLogo.svg";
import eventImage from '../features/withoutauth/assets/EventImage2.svg';
import defaultSport from "../assets/svg-icons/cricket.svg"
import star from "../assets/images/home/bookvenues/star.svg";

export default function HomeEventCard({ event }) {

    return (
        <Link to={`/events/${event.id}`} className="hs-card hs-carousel-card">
            <div className="hs-card-img">
                <img src={event.image} alt={event.name} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = eventImage;
                }} />

                <div className="hs-rating">
                    <img src={star} alt="" />
                    <span>{event.rating} ({event.RatingCount})</span>
                </div>

                <div className="hs-sports hs-sports-overlay">
                    {event.sportIcon?.map((sport, idx) => (
                        <div className="hs-sport-icon" key={sport.id || idx} title={sport.name}>
                            <img
                                src={sport.image || defaultSport}
                                alt={sport.name}
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = defaultSport;
                                }}
                            />
                        </div>
                    ))}
                </div>

            </div>

            <div className="hs-card-body">
                <p className="hs-card-name">{event.name}</p>

                <div className="hs-card-meta">
                    <img src={CalandarIcon} alt='' />
                    <span>{event.date}</span>
                </div>

                <div className="hs-card-meta">
                    <img src={LocationIcon} alt='' />
                    <span>{event.location}</span>
                </div>

                <div className="hs-card-footer">
                    <span className="hs-offer">{event.offer}</span>
                    <span className="hs-price">{event.price}</span>
                </div>
            </div>
        </Link>
    );
}
