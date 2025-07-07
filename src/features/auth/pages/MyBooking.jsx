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

const bookingsData = [
  {
    id: 1,
    title: "Red Meadows",
    type: "5x5, Football",
    date: "Wed, 04 Sep 2024",
    time: "09:00 am – 10:00 am",
    reference: "#00256",
    image: BookingImage,
    status: "all Booking",
  },
  {
    id: 2,
    title: "Red Meadows",
    type: "5x5, Football",
    date: "Thu, 05 Sep 2024",
    time: "11:00 am – 12:00 pm",
    reference: "#00257",
    image: BookingImage,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Red Meadows",
    type: "5x5, Football",
    date: "Fri, 01 Sep 2024",
    time: "08:00 am – 09:00 am",
    reference: "#00258",
    image: BookingImage,
    status: "completed",
  },
  {
    id: 4,
    title: "Red Meadows",
    type: "5x5, Football",
    date: "Sat, 02 Sep 2024",
    time: "10:00 am – 11:00 am",
    reference: "#00259",
    image: BookingImage,
    status: "cancelled",
  },
];

const tabs = ["all Booking", "upcoming", "completed", "cancelled"];
const ITEMS_PER_PAGE = 2;

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("all Booking");
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
      case "all Booking":
        return allBookings;
      case "upcoming":
        return bookingsData.filter(b => b.status === "upcoming");
      case "completed":
        return AllCompletedBooking;
      case "cancelled":
        return AllCancelledBooking;
      default:
        return bookingsData;
    }
  }, [activeTab, allBookings, AllCompletedBooking, AllCancelledBooking, bookingsData]);

  // const bookingsData = [filteredBookings].map(b => ({
  //   id: b.id,
  //   title: b.venue_name,
  //   type: `${Math.floor(b.duration / 30)}x${Math.floor(b.duration / 30)}, ${b.sports_name}`,
  //   date: formatDate(b.date),
  //   time: formatTime(b.start_time, b.duration),
  //   reference: `#${String(b.id).padStart(5, "0")}`,
  //   image: BookingImage,  // or b.cover_image if dynamic
  // }));


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

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
