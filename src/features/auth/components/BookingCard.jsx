import React, { useState } from "react";
import "./StyleSheets/BookingCard.css";
import ShareIcon from "../assets/Share-Icon.png";
import CancelIcon from "../assets/Cancel-Icon.png";
import { Share } from "../../../utils/share.js";
import { AddReviewModal } from "./Modal/AddReviewModal.jsx";

const BookingCard = ({ booking }) => {
  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const existing = booking.checkReview === 1;

  return (
    <div className="booking-card-container">
      <img src={booking.image} alt="venue" className="booking-card-image" />

      <div className="booking-card-details">
        <h3 className="booking-title">{booking.title}</h3>
        <p className="booking-type">{booking.type}</p>
        <p className="booking-date-time">
          <strong>{booking.date}</strong>
        </p>
        <p className="booking-date-time">{booking.time}</p>
        <p className="booking-ref">
          Reference number: <span>#{booking.reference}</span>
        </p>

        <div className="booking-card-actions">
          {isCancelled ? (
            <div></div>
          ) : (
            <>
              <button className="action-btn share" onClick={Share}>
                <img src={ShareIcon} alt="Share" /> Share
              </button>
              <div className="ref-divider" />
            </>
          )}

          {isCompleted ? (
            <button
              className="action-btn review"
              onClick={() => setIsModalOpen(true)}
              disabled={existing}
            >
              {existing ? "Reviewed ✓" : "Add Review"}
            </button>
          ) : isCancelled ? (
            <button className="action-btn cancelled">Cancelled</button>
          ) : (
            <button className="action-btn cancel">
              <img src={CancelIcon} alt="Cancel" /> Cancel
            </button>
          )}
        </div>
      </div>
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingId={booking.id}
        venueId={booking.venueId}
      />
    </div>
  );  
};

export default BookingCard;
