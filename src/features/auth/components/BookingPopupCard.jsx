// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './StyleSheets/BookingPopupCard.css';
// import checkIcon from "../assets/Checkicon.png";
// import Banner from "../assets/venue-banner.png";
// import ShareIcon from "../assets/BookingshareIcons.png";
// import viewIcon from "../assets/BookingViewIcons.png";
// import { useBanner } from '../../../hooks/useBanner.js';



// const BookingPopupCard = ({
//   bookingId,
//   amount,
//   merchantTransactionId,
//   date,
//   hostName,
//   venueName,
//   bookingdate = null
// }) => {
//   const navigate = useNavigate();
//   const bookingData = [];
//   const pageNo = 4;

//   const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(pageNo);


//   const {
//     paymentMethod = "Gpay",
//     time = "233.344",
//   } = bookingData;
//   const banners = bannerData?.result || [];

//   if (Bannerloading) return <div>Loading banners...</div>;
//   if (BannerError) return <div>Error loading banners</div>;

//   return (
//     <div className="popup-overlay" >
//       <div className="booking-popup" onClick={(e) => e.stopPropagation()}>
//         <div className="booking-header">
//           <h2 className='booking-heading'>Booking confirmed</h2>
//           <img src={checkIcon} alt="success" className="check-icon" /> {/* Replace with your green tick image */}
//           <p className="confirmation-text">
//             Thank you for your reservation.<br />
//             You have a reservation at <strong>{venueName}</strong> on<br />
//             <strong>{bookingdate}</strong>, from <strong>{time}</strong>
//           </p>
//         </div>

//         <div className="ref-card">
//           <div className="ref-header">Reference number: #{bookingId}</div>

//           <div className="ref-info">
//             <div className="ref-row">
//               <div>
//                 <p className="ref-label">Host name</p>
//                 <p className="ref-value">{hostName}</p>
//               </div>
//               <div>
//                 <p className="ref-label">Amount</p>
//                 <p className="ref-value">₹{amount}</p>
//               </div>
//             </div>

//             <div className="ref-row">
//               <div>
//                 <p className="ref-label">Payment Method</p>
//                 <p className="ref-value">UPI: {paymentMethod}</p>
//               </div>
//               <div>
//                 <p className="ref-label">Payment Time</p>
//                 <p className="ref-value">{date}</p>
//               </div>
//             </div>
//           </div>

//           <div className="ref-footer">
//             <button className="ref-btn">
//               <span role="img" aria-label="share"><img src={ShareIcon} alt='ShareIcon' /></span> Share
//             </button>
//             <div className="ref-divider" />
//             <button className="ref-btn">
//               <span role="img" aria-label="view"><img src={viewIcon} alt='view Details' /></span> View bookings
//             </button>
//           </div>
//         </div>


//         <div className="popup-events">
//           <h4>Explore Nearby Events</h4>
//           <div className="event-banner-carousel">
//             <div className="event-banner-track">
//               {banners.concat(banners).map((item, i) => ( // Duplicate for seamless looping
//                 <div key={i} className="event-banner">
//                   <img src={item.banner_image} alt="Event" className="event-banner-img" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className='button-wrapper'>
//           <button className="home-btn" onClick={() => navigate('/')} >BACK TO HOME</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPopupCard;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StyleSheets/BookingPopupCard.css";
import checkIcon from "../assets/Checkicon.png";
import ShareIcon from "../assets/BookingshareIcons.png";
import viewIcon from "../assets/BookingViewIcons.png";
import { useBanner } from "../../../hooks/useBanner.js";

const BookingPopupCard = () => {
  const navigate = useNavigate();
  const pageNo = 4;
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const bookingId = queryParams.get("bookingId");
  const amount = queryParams.get("amount");
  const date = queryParams.get("date");
  const hostName = queryParams.get("hostName");
  const venueName = queryParams.get("venueName");
  const bookingdate = queryParams.get("bookingDate");
  const startTime = queryParams.get("startTime");
  const duration = Number(queryParams.get("duration"));
  const type = queryParams.get("type");

  const { data: bannerData, isLoading, error } = useBanner(pageNo);
  const banners = bannerData?.result || [];

  if (isLoading) return <div>Loading banners...</div>;
  if (error) return <div>Error loading banners</div>;

  const formattedDate = bookingdate
    ? (() => {
      const d = new Date(bookingdate);
      const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
      const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
      const year = d.getFullYear();
      return `${day} ${weekday} ${year}`;
    })()
    : "";


  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return "";
    const [hour, minute] = startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(hour, minute, 0);
    const end = new Date(start.getTime() + duration * 60000);
    const endHour = end.getHours();
    const endMin = end.getMinutes();
    const period = endHour >= 12 ? "PM" : "AM";
    const hour12 = endHour % 12 || 12;
    return `${hour12}:${endMin.toString().padStart(2, "0")} ${period}`;
  };

  const showTime = type === "1" || type === "2";
  const formattedStart = formatTime(startTime?.slice(0, 5) || "09:00");
  const formattedEnd = calculateEndTime(startTime?.slice(0, 5) || "09:00", duration || 60);
  const bookingTime = showTime ? `${formattedStart} – ${formattedEnd}` : "";

  return (
    <div className="popup-overlay">
      <div className="booking-popup" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-header">
          <h2 className="booking-heading">Booking confirmed</h2>
          <img src={checkIcon} alt="success" className="check-icon" />

          <p className="confirmation-text">
            Thank you for your reservation.<br />
            You have a booking with <strong>{venueName || hostName}</strong> on<br />
            <strong>{formattedDate}</strong>
            {showTime && bookingTime && (
              <>
                , from <strong>{bookingTime}</strong>
              </>
            )}
          </p>
        </div>

        {/* Reference Card */}
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
                <p className="ref-value">UPI: Gpay</p>
              </div>
              <div>
                <p className="ref-label">Payment Time</p>
                <p className="ref-value">
                  {date
                    ? new Date(date).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                      .replace(" ", "")
                      .toLowerCase()
                      .replace("am", "AM")
                      .replace("pm", "PM") +
                    ", " +
                    new Date(date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      weekday: "short",
                      year: "numeric",
                    }).replaceAll(",", "")
                    : ""}
                </p>

              </div>
            </div>
          </div>

          <div className="ref-footer">
            <button className="ref-btn">
              <img src={ShareIcon} alt="Share" /> Share
            </button>
            <div className="ref-divider" />
            <button className="ref-btn" onClick={() => navigate("/bookings")}>
              <img src={viewIcon} alt="View" /> View bookings
            </button>
          </div>
        </div>


        <div className="popup-events">
          <h4>Explore Nearby Events</h4>
          <div className="event-banner-carousel">
            <div className="event-banner-track">
              {banners.concat(banners).map((item, i) => (
                <div key={i} className="event-banner">
                  <img src={item.banner_image} alt="Event" className="event-banner-img" />
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="button-wrapper">
          <button className="home-btn" onClick={() => navigate("/")}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPopupCard;
