import React, { useState } from 'react';
import "../StyleSheets/MyBooking.css";
import BookingImage from "../assets/bookingImage.png";
import BookingCard from '../components/BookingCard';
import { useGetAllBooking } from "../../../hooks/BookingVenue/useGetAllBooking.js";
import { useGetCompleteBooking } from "../../../hooks/BookingVenue/useGetCompleteBooking.js";
import { useGetCancelBooking } from "../../../hooks/BookingVenue/useGetCancelBooking.js";


// Helper to format date to "Wed, 04 Sep 2024"
function formatDate(dateStr) {
  return new Date(dateStr)
    .toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

// Helper to format time "02:00:00" → "02:00 am"
function formatTime(timeStr, durationMinutes) {
  const [h, m, s] = timeStr.split(":").map(Number);
  const dt = new Date();
  dt.setHours(h, m, s);
  const end = new Date(dt.getTime() + durationMinutes * 60000);
  const opts = { hour: "2-digit", minute: "2-digit", hour12: true };
  return `${dt.toLocaleTimeString("en-US", opts)} – ${end.toLocaleTimeString("en-US", opts)}`;
}




const tabs = ["upcoming", "completed", "cancelled"];
const ITEMS_PER_PAGE = 2;

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: Bookingdata, isLoading, isError } = useGetAllBooking();
  const allBookings = Bookingdata?.result?.map(b => ({
    id: b.id,
    title: b.venue_name,
    type: `${b.court_name}, ${b.sports_name}`,
    date: formatDate(b.date),
    venueId: b.venue_id,
    checkReview: b.has_review,
    time: formatTime(b.start_time, b.duration),
    reference: `#${String(b.id).padStart(5, "0")}`,
    image: b.cover_image,
  })) ?? [];
  console.log("All Booking", allBookings);

  const { data: CompletedBookingData, isLoading: completedLoading, isError: completedError } = useGetCompleteBooking();
  // const AllCompletedBooking = CompletedBookingData?.result[0];
  const AllCompletedBooking = CompletedBookingData?.result?.map(b => ({
    id: b.id,
    title: b.venue_name,
    type: `${b.court_name}, ${b.sports_name}`,
    date: formatDate(b.date),
    venueId: b.venue_id,
    checkReview: b.has_review,
    time: formatTime(b.start_time, b.duration),
    reference: `#${String(b.id).padStart(5, "0")}`,
    image: b.cover_image,
  })) ?? [];
  console.log("complete booking", AllCompletedBooking);

  const { data: CancelledBookingData } = useGetCancelBooking();
  const AllCancelledBooking = CancelledBookingData?.result?.map(b => ({
    id: b.id,
    title: b.venue_name,
    type: `${b.court_name}, ${b.sports_name}`,
    date: formatDate(b.date),
    venueId: b.venue_id,
    checkReview: b.has_review,
    time: formatTime(b.start_time, b.duration),
    reference: `#${String(b.id).padStart(5, "0")}`,
    image: b.cover_image,
  })) ?? [];
  console.log("my cancelledBooking", AllCancelledBooking);

  const filteredBookings = React.useMemo(() => {
    switch (activeTab) {
      case "upcoming":
        return allBookings;
      case "completed":
        return AllCompletedBooking;
      case "cancelled":
        return AllCancelledBooking;
      default:
        return allBookings;
    }
  }, [activeTab, allBookings, AllCompletedBooking, AllCancelledBooking]);



  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredBookings.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset pagination on tab change
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 3;

    let startPage = Math.max(currentPage - Math.floor(maxVisible / 2), 1);
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="booking-wrapper">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <h3 className="section-tab-title">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h3>

      {paginated.length === 0 ? (
        <p className="no-bookings">No bookings in this category.</p>
      ) : (
        <div className="booking-list">
          {paginated.map(item => (
            <BookingCard key={item.id} booking={{ ...item, status: activeTab }} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>

          {/* {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))} */}
          {renderPageNumbers()}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
