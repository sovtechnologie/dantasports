import React from 'react';
import './Stylesheets/BookingPopupCard.css';
import checkIcon from "../assets/Checkicon.png";
import Banner from "../assets/venue-banner.png";
import ShareIcon from "../assets/BookingshareIcons.png";
import viewIcon from "../assets/BookingViewIcons.png";


const banners = [Banner, Banner];

const BookingPopupCard = ({
  show,
  onClose,
  bookingData,
  events = []
}) => {
  if (!show || !bookingData) return null;

  const {
    referenceNumber,
    hostName,
    amount,
    paymentMethod,
    paymentTime,
    location,
    date,
    time,
  } = bookingData;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="booking-popup" onClick={(e) => e.stopPropagation()}>
        <div className="booking-header">
          <h2 className='booking-heading'>Booking confirmed</h2>
          <img src={checkIcon} alt="success" className="check-icon" /> {/* Replace with your green tick image */}
          <p className="confirmation-text">
            Thank you for your reservation.<br />
            You have a football reservation at <strong>{location}</strong> on<br />
            <strong>{date}</strong>, from <strong>{time}</strong>
          </p>
        </div>

        <div className="ref-card">
          <div className="ref-header">Reference number: #{referenceNumber}</div>

          <div className="ref-info">
            <div className="ref-row">
              <div>
                <p className="ref-label">Host name</p>
                <p className="ref-value">{hostName}</p>
              </div>
              <div>
                <p className="ref-label">Amount</p>
                <p className="ref-value">₹{amount}</p>
              </div>
            </div>

            <div className="ref-row">
              <div>
                <p className="ref-label">Payment Method</p>
                <p className="ref-value">{paymentMethod}</p>
              </div>
              <div>
                <p className="ref-label">Payment Time</p>
                <p className="ref-value">{paymentTime}</p>
              </div>
            </div>
          </div>

          <div className="ref-footer">
            <button className="ref-btn">
              <span role="img" aria-label="share"><img src={ShareIcon} alt='ShareIcon'/></span> Share
            </button>
            <div className="ref-divider" />
            <button className="ref-btn">
              <span role="img" aria-label="view"><img src={viewIcon} alt='view Details'/></span> View bookings
            </button>
          </div>
        </div>


        <div className="popup-events">
          <h4>Explore Nearby Events</h4>
          <div className="event-cards">
            {events.map((img, index) => (
              <div className={`event-card ${index > 0 ? 'hide-on-mobile' : ''}`} key={index}>
                <img src={img} alt="Event" />
              </div>
            ))}
          </div>
        </div>
        <div className='button-wrapper'>
          <button className="home-btn" onClick={onClose}>BACK TO HOME</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopupCard;
