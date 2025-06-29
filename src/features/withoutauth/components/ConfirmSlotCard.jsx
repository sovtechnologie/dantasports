import React, { useState } from "react";
import "./Stylesheets/ConfirmSlotCard.css";
import BookingPopupCard from "./BookingPopupCard.jsx"

const ConfirmSlotCard = ({ duration, time, date, pitch, onClose, onProceed ,payload}) => {
 console.log("myPayload",payload)

  return (
    <div className="slot-card-overlay">
      <div className="slot-card-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Confirm Your Slots</h2>
        <div className="slot-details">
          <p>Duration: <span>{duration}</span></p>
          {/* <p>Time: <span>{time}</span></p> */}
          {/* <p>Day & Date: <span>{date}</span></p> */}
          <p>Pitch: <span>{pitch}</span></p>
        </div>
        
        <button className="proceed-btn" onClick={onProceed}>PROCEED</button>
      </div>
       <div>
      
    </div>
    </div>
  );
};

export default ConfirmSlotCard;
