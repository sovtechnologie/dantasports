import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./StyleSheets/BookingPopupCard.css";
import checkIcon from "../../../assets/svg-icons/check-circle.svg";
import ShareIcon from "../../../assets/svg-icons/share-circle.svg";
import viewIcon from "../../../assets/svg-icons/eye.svg";
import { useBanner } from "../../../hooks/useBanner.js";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const BookingPopupCard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pageNo = 4;
  const userId = useSelector((state) => state.auth?.id);
  const token = Cookies.get("token");
  // Parse query params safely
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId") || "N/A";
  const amount = queryParams.get("amount") || "N/A";
  const date = queryParams.get("date") || null;
  const hostName = queryParams.get("hostName") || "N/A";
  const venueName = queryParams.get("venueName") || "N/A";
  const bookingdate = queryParams.get("bookingDate") || null;
  const startTime = queryParams.get("startTime") || null;
  const duration = Number(queryParams.get("duration")) || 0;
  const type = queryParams.get("type") || "0";
  const paymentMethod = queryParams.get("paymentMethod");

  // Fetch banners safely
  const { data: bannerData, isLoading, error } = useBanner(pageNo);
  const banners = Array.isArray(bannerData?.result) ? bannerData.result.filter(Boolean) : [];

  if (isLoading) return <div>Loading banners...</div>;
  if (error) return <div>Error loading banners</div>;

  const handleShare = async () => {
  const currentUrl = window.location.href; 

  const shareData = {
    title: "Booking Confirmation",
    text: `Booking #${bookingId} confirmed`,
    url: currentUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied!");
    }
  } catch {
    // Share cancelled or failed silently
  }
};


  // Safe date formatting
  const formattedDate = bookingdate
    ? (() => {
      const d = new Date(bookingdate);
      if (isNaN(d.getTime())) return "";
      const day = d.toLocaleDateString("en-GB", { day: "2-digit" });
      const weekday = d.toLocaleDateString("en-GB", { weekday: "long" });
      const year = d.getFullYear();
      return `${day} ${weekday} ${year}`;
    })()
    : "";

  // Safe time formatting
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return "";
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  // Calculate end time safely
  const calculateEndTime = (startTime, duration) => {
    if (!startTime || !duration) return "";
    const [hour, minute] = startTime.split(":").map(Number);
    if (isNaN(hour) || isNaN(minute)) return "";
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
  const formattedStart = formatTime(startTime?.slice(0, 5));
  const formattedEnd = calculateEndTime(startTime?.slice(0, 5), duration);
  const bookingTime = showTime && formattedStart && formattedEnd ? `${formattedStart} – ${formattedEnd}` : "";

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
            <strong>{formattedDate || ""}</strong>
            {bookingTime && (
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
                <p className="ref-label">User name</p>
                <p className="ref-value">{hostName || "N/A"}</p>

              </div>
              <div>
                <p className="ref-label">Amount</p>
                <p className="ref-value">₹{amount || "N/A"}</p>

              </div>

            </div>
            <div className="ref-row">
              <div>
                <p className="ref-label">Payment Method</p>
                <p className="ref-value">{paymentMethod}</p>
                {/* {type === "1" && courtName && (
                  <>

                    <p className="ref-label">Court</p>
                    <p className="ref-value">{courtName}</p>
                  </>

                )} */}
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
                    : "N/A"}
                </p>


              </div>
            </div>
          </div>
          <div className="ref-footer">
            <button className="ref-btn">
              <img src={ShareIcon} alt="Share" onClick={handleShare}/> Share
            </button>
            <div className="ref-divider" />
            <button className="ref-btn" onClick={() => {
              if (userId && token) {
                navigate(`/profile/${userId}`);
              } else {
                navigate("/login");
              }
            }}
            >
              <img src={viewIcon} alt="View" /> View bookings
            </button>
          </div>
        </div>

        {/* Banner Section */}
        {banners.length > 0 && (
          <div className="popup-events">
            <h4>Explore Nearby Events</h4>
            <div className="event-banner-carousel">
              <div className="event-banner-track">
                {banners.concat(banners).map((item, i) => (
                  <div key={i} className="event-banner">
                    <img src={item.banner_image || ""} alt="Event" className="event-banner-img" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
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
