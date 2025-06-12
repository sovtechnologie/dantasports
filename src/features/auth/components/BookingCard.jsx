import React from 'react';
import './StyleSheets/BookingCard.css';
import ShareIcon from "../assets/Share-Icon.png";
import CancelIcon from "../assets/Cancel-Icon.png";


const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card-container">
      <img src={booking.image} alt="venue" className="booking-card-image" />
      
      <div className="booking-card-details">
        <h3 className="booking-title">{booking.title}</h3>
        <p className="booking-type">{booking.type}</p>
        <p className="booking-date-time"><strong>{booking.date}</strong></p>
        <p className="booking-date-time">{booking.time}</p>
        <p className="booking-ref">Reference number: <span>#{booking.reference}</span></p>

        <div className="booking-card-actions">
          <button className="action-btn share">
            <img src={ShareIcon}  alt='Share'/> Share
          </button>
          <div className="ref-divider" />
          <button className="action-btn cancel">
            <img src={CancelIcon}  alt='Cancel'/> Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
