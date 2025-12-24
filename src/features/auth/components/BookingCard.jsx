import React, { useState } from "react";
import "./StyleSheets/BookingCard.css";
import ShareIcon from "../assets/Share-Icon.png";
import CancelIcon from "../assets/Cancel-Icon.png";
import { Share } from "../../../utils/share.js";
import { AddReviewModal } from "./Modal/AddReviewModal.jsx";
import { useCancelBooking } from "../../../hooks/Payments/useCancelBooking.js";
import ViewDetails from "./StyleSheets/ViewDetails.jsx";


const BookingCard = ({ booking }) => {

  const [modalShow, setModalShow] = useState(false);
  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const existing = booking.checkReview === 1;
  

  const { mutate: cancelBooking, isPending } = useCancelBooking();

  const handleCancel = () => {
    if (window.confirm("You want to cancel this booking?")) {
      const payload = {
        bookingId: booking.id,
        type:
          booking.bookingType === "venue"
            ? 1
            : booking.bookingType === "event"
              ? 2
              : 3,
      };

      cancelBooking(payload);
    }
  };

  const formatBookingDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  return (
    <div className="booking-card-container">
      <img src={booking.image} alt="venue" className="booking-card-image" />
      <button
        className="border-0 view_details_btn"
        onClick={() => setModalShow(true)}
      >
        View Details
      </button>

      <ViewDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        booking={booking}
      />

      <div className="booking-card-details">
        <p className="booking-title">{booking.title}</p>
        {/* <p className="booking-type">{booking.subtitle}</p> */}
        <p className="booking-date-time">
          <strong>{formatBookingDate(booking.date)}</strong>
        </p>
        <p className="booking-date-time">{booking.time}</p>
        <p className="booking-ref">
          Reference number: <span>#{booking.reference}</span>
        </p>

        <div className="booking-card-actions">
          {!isCancelled && (
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
            <button
              className="action-btn cancel"
              onClick={handleCancel}
              disabled={isPending}
            >
              <img src={CancelIcon} alt="Cancel" />
              {isPending ? "Cancelling..." : "Cancel"}
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
