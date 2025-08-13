import React, { useState } from 'react';
import styled from './StyleSheets/UpCommingCard.module.css';
import { Link } from 'react-router-dom';

const UpCommingCard = ({ booking }) => {
  return (
    <Link  to={`/venue/${booking.id}`} style={{ textDecoration: "none", color: "inherit" }} className={styled.booking_card_container}>
      <img src={booking.image} alt="venue" className={styled.booking_card_image} />

      <div className={styled.booking_card_details}>
        <h3 className={styled.booking_title}>{booking.title}</h3>
        <p className={styled.booking_type}>{booking.type}</p>
        <p className={styled.booking_date_time}><strong>{booking.date}</strong></p>
        <p className={styled.booking_date_time}>{booking.time}</p>
        <p className={styled.booking_ref}>Reference number: <span>#{booking.reference}</span></p>
      </div>
    </Link >
  );
};

export default UpCommingCard;
