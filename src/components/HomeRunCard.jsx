import React from 'react';
import styled from "./StyleSheets/HomeRunCard.module.css";
import { Link } from 'react-router-dom';
import CalandarIcon from "../features/withoutauth/assets/Calandarlogo.svg"
import LocationIcon from "../features/withoutauth/assets/LocationLogo.svg";
import eventImage from '../features/withoutauth/assets/EventImage.svg';


export default function HomeRunCard({ event}) {

    return (
        <div className={styled.run_card}>
            <div className={styled.run_image_section}>
                <img src={event.image} alt="Marathon" className={styled.run_img} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = eventImage;
                }} />
                
                <div className={styled.icon_bottom_left}>
                    {event.sportIcon?.map((sport, idx) => (
                        <img
                            key={sport.id || idx}
                            src={sport.image}
                            alt={sport.name}
                            className={styled.icon_img_btn}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/fallback-sport-icon.png';
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className={styled.run_content}>
                <div className={styled.runs_middle}>
                    <h3 className={styled.run_title}>{event.name}</h3>
                    <div className={styled.run_rating}>
                        <span className={styled.star}>⭐</span> {event.rating} <span className={styled.light_text}>({event.RatingCount})</span>
                    </div>
                </div>

                <div className={styled.run_time}>
                    <img src={CalandarIcon} alt='Calandar icon' /> <span>{event.date}</span>
                </div>

                <div className={styled.runs_middle}>
                    <div className={styled.run_location}>
                        <img src={LocationIcon} alt='location icon' /> {event.location}
                    </div>
                    {/* 🔗 Link to Detail Page */}
                    <Link to={`/Run/${event.id}`} className={styled.run_join}>
                        Join Now
                    </Link>
                </div>


                <div className={styled.run_footer}>
                    <span className={styled.run_offer}>{event.offer}</span>
                    <span className={styled.run_price}>{event.price}</span>
                </div>
            </div>
        </div>
    );
}
