import React, { useState } from "react";
import "./Stylesheets/ConfirmSlotCard.css";
import BookingPopupCard from "./BookingPopupCard.jsx"

const ConfirmSlotCard = ({ onClose, onSuccess, payload }) => {
  const { sportId, venueId, selectedDate, selectedDuration, selectedTime, selectedPitch } = payload;

  console.log("myPayload", payload)

  const handleProceed = () =>{
     
  }

  return (
    <div className="slot-card-overlay">
      <div className="slot-card-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Confirm Your Slots</h2>
        <div className="slot-details">
          <p>Duration: <span>{`${selectedDuration}min`}</span></p>
          {/* <p>Time: <span>{time}</span></p> */}
          <p>Day & Date: <span>{selectedDate}</span></p>
          {/* <p>Pitch: <span>{pitch}</span></p> */}
        </div>

        <button className="proceed-btn" onClick={onSuccess}>PROCEED</button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default ConfirmSlotCard;
