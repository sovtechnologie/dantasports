import React from 'react';
import './StyleSheets/BookingPopupCard.css';
import checkIcon from "../assets/Checkicon.png";
import Banner from "../assets/venue-banner.png";
import ShareIcon from "../assets/BookingshareIcons.png";
import viewIcon from "../assets/BookingViewIcons.png";
import { useBanner } from '../../../hooks/useBanner.js';



const BookingPopupCard = ({
 bookingId
}) => {
   
  const bookingData = [];
  const pageNo = 4;

  const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(pageNo);


  const {
    referenceNumber,
    hostName = "Mohitpal",
    amount = "123",
    paymentMethod = "Gpay",
    paymentTime = "12,2,10129",
    location= "Delhi",
    date = "12,2,30",
    time = "233.344",
  } = bookingData;
  const banners = bannerData?.result || [];

  if (Bannerloading) return <div>Loading banners...</div>;
  if (BannerError) return <div>Error loading banners</div>;

  return (
    <div className="popup-overlay" >
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
          <div className="ref-header">Reference number: #{bookingId}</div>

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
              <span role="img" aria-label="share"><img src={ShareIcon} alt='ShareIcon' /></span> Share
            </button>
            <div className="ref-divider" />
            <button className="ref-btn">
              <span role="img" aria-label="view"><img src={viewIcon} alt='view Details' /></span> View bookings
            </button>
          </div>
        </div>


        <div className="popup-events">
          <h4>Explore Nearby Events</h4>
          <div className="event-cards">
            {banners.slice(0,2).map((item, i) => (
              <div className={`event-card ${i > 0 ? 'hide-on-mobile' : ''}`} key={i}>
                <img src={item.banner_image} alt="Event" onError={(e) => (e.target.src = Banner)} />
              </div>
            ))}
          </div>
        </div>
        <div className='button-wrapper'>
          <button className="home-btn" >BACK TO HOME</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopupCard;
