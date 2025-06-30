import React, { useState } from "react";
import "./Stylesheets/ConfirmSlotCard.css";
import Cookies from 'js-cookie';
import BookingPopupCard from "./BookingPopupCard.jsx";
import { useSportDetails } from "../../../hooks/favouriteSport/useSportDetails.js";
import { useFetchSingleVenue } from "../../../hooks/VenueList/useFetchSingleVenue.js";


const ConfirmSlotCard = ({ onClose, onSuccess, payload }) => {
  const { sportId, venueId, selectedDate, selectedDuration, selectedTime, selectedPitch } = payload;
  const isLoggedIn = Boolean(Cookies.get('token'));
  console.log("myPayload", payload)

  const timeOnly = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const { data: sportDetails, isLoading: sportDetailLoading, error: sportDetailError } = useSportDetails(sportId);
  const { data: venueDetails, isLoading: venueDetailsLoading, error: VenueError } = useFetchSingleVenue(venueId);

  const venueName = venueDetails?.result[0]?.venue_name;
  const selectedSport = venueDetails?.result[0]?.sports.find((sport) => sport.id === sportId);
  const selectedCourt = sportDetails?.result[0]?.courts?.find((court) => court.id === selectedPitch);


  const handleProceed = () => {
    if (!isLoggedIn) {
      alert('Please log in to proceed.')
      return;
    }
    onSuccess();
  }

  return (
    <div className="slot-card-overlay">
      <div className="slot-card-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Confirm Your Slots</h2>
        <div className="slot-details">
          <p>Venue:<span>{venueName}</span></p>
          <p>sport:<span>{selectedSport.name}</span></p>
          <p>Duration: <span>{`${selectedDuration}min`}</span></p>
          <p>Time: <span>{timeOnly}</span></p>
          <p>Day & Date: <span>{selectedDate}</span></p>
          <p>Court: <span>{selectedCourt.court_name}</span></p>
        </div>

        <button className="proceed-btn"
          onClick={handleProceed}
          disabled={!isLoggedIn}
          style={{ opacity: !isLoggedIn ? 0.6 : 1, cursor: !isLoggedIn ? 'not-allowed' : 'pointer' }}
        >PROCEED</button>
      </div>
      <div>

      </div>
    </div>
  );
};

export default ConfirmSlotCard;
