import React from 'react';
import styled from "./StyleSheets/HomeEventCard.module.css";
import { Link } from 'react-router-dom';
import CalandarIcon from "../features/withoutauth/assets/Calandarlogo.svg"
import LocationIcon from "../features/withoutauth/assets/LocationLogo.svg";
import eventImage from '../features/withoutauth/assets/EventImage2.svg';
import defaultSport from "../assets/PopularSportLogo/Cricket.png"

export default function HomeEventCard({ event }) {

    return (
        <Link to={`/Events/${event.id}`} className={styled.event_card}>
            <div className={styled.event_image_section}>
                <img src={event.image} alt={event.name} className={styled.event_img} onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = eventImage;
                }} />
                <div className={styled.icon_bottom_left}>
                    {event.sportIcon?.map((sport, idx) => (
                        <img
                            key={sport.id || idx}
                            src={sport.image || defaultSport}
                            alt={sport.name}
                            className={styled.icon_img_btn}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = defaultSport;
                            }}
                        />
                    ))}
                </div>

            </div>

            <div className={styled.event_content}>
                <div className={styled.events_middle}>
                    <h3 className={styled.event_title}>{event.name}</h3>
                    <div className={styled.event_rating}>
                        <span className={styled.star}>⭐</span> {event.rating} <span className={styled.light_text}>({event.RatingCount})</span>
                    </div>
                </div>


                <div className={styled.events_middle} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styled.event_time}>
                        <img src={CalandarIcon} alt='Calandar icon' className={styled.event_time_img} />
                        <span>{event.date}</span>
                    </div>
                    <div className={styled.event_location}>
                        <img src={LocationIcon} alt='location icon' className={styled.event_time_img} />
                        <span>{event.location}</span>
                    </div>
                </div>


                <div className={styled.event_footer}>
                    <span className={styled.event_offer}>{event.offer}</span>
                    <span className={styled.event_price}>{event.price}</span>
                </div>
            </div>
        </Link>
    );
}
