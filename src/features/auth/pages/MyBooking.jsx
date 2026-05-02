import React, { useMemo, useState } from 'react';
import "../StyleSheets/MyBooking.css";
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

function formatStartEnd(start, end) {
  const opts = { hour: "2-digit", minute: "2-digit", hour12: true };

  const s = new Date(`2000-01-01T${start}`).toLocaleTimeString("en-US", opts);
  const e = new Date(`2000-01-01T${end}`).toLocaleTimeString("en-US", opts);

  return `${s} – ${e}`;
}



const tabs = ["upcoming", "completed", "cancelled"];
const ITEMS_PER_PAGE = 2;

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: Bookingdata } = useGetAllBooking();
  // const allBookings = Bookingdata?.result?.map(b => ({
  //   id: b.id,
  //   title: b.venue_name,
  //   type: `${b.court_name}, ${b.sports_name}`,
  //   date: formatDate(b.date),
  //   venueId: b.venue_id,
  //   checkReview: b.has_review,
  //   time: formatTime(b.start_time, b.duration),
  //   reference: `#${String(b.id).padStart(5, "0")}`,
  //   image: b.cover_image,
  // })) ?? [];
  // console.log("All Booking", allBookings);

  // ------------------------
  // VENUE BOOKINGS
  // ------------------------
  const venueBookings = useMemo(() => Bookingdata?.myBookings?.venueBookings?.map(b => ({
    id: b.id,
    bookingType: "venue",
    title: b.venue_name,
    subtitle: `${b.court_name} | ${b.sports_name}`,
    date: b.date,
    start_time: b.start_time,
    duration: b.duration,
    type: b.type,
    venueId: b.venue_id,
    time: formatTime(b.start_time, b.duration),
    hasReview: b.has_review,
    reference: `#${String(b.id).padStart(5, "0")}`,
    image: b.cover_image,
  })) ?? [], [Bookingdata]);


  const eventBookings = useMemo(() => Bookingdata?.myBookings?.eventBooking?.map(e => ({
    id: e.booking_id,
    bookingType: "event",
    type: e.type,
    title: e.event_title,
    subtitle: e.event_type === 1 ? "Meetup Event" : "Running Event",
    date: e.start_date,
    start_time: e.start_time,
    duration: e.duration ?? 60,
    venueId: e.event_id,
    hasReview: false,
    reference: `#${String(e.booking_id).padStart(5, "0")}`,
    image: e.mobile_image,
  })) ?? [], [Bookingdata]);



  const gymBookings = useMemo(() => Bookingdata?.myBookings?.getGymBookings?.map(g => ({
    id: g.booking_id,
    bookingType: "gym",
    type: g.type,
    title: g.gym_name,
    subtitle: "Gym Session",
    date: g.start_date,
    start_time: g.start_time,
    duration: g.duration ?? 60,
    venueId: g.gym_id,
    hasReview: false,
    reference: `#${String(g.booking_id).padStart(5, "0")}`,
    image: g.mobile_image,
  })) ?? [], [Bookingdata]);


  const allBookings = useMemo(() => [
    ...venueBookings,
    ...eventBookings,
    ...gymBookings
  ], [venueBookings, eventBookings, gymBookings]);


  const { data: CompletedBookingData } = useGetCompleteBooking();
  // const AllCompletedBooking = CompletedBookingData?.result[0];
  const AllCompletedBooking = useMemo(() => CompletedBookingData?.result?.map(b => ({
    id: b.id,
    title: b.venue_name,
    type: b.type,
    date: formatDate(b.date),
    venueId: b.venue_id,
    checkReview: b.has_review,
    time: formatTime(b.start_time, b.duration),
    reference: `#${String(b.id).padStart(5, "0")}`,
    image: b.cover_image,
  })) ?? [], [CompletedBookingData]);

  const { data: CancelledBookingData } = useGetCancelBooking();
  const VenueCancelled = useMemo(() => CancelledBookingData?.myBookings?.venueBookings.map(b => ({
    id: b.id,
    title: b.venue_name,
    type: b.type,
    date: formatDate(b.date),
    venueId: b.venue_id,
    checkReview: b.has_review,
    time: formatTime(b.start_time, b.duration),
    reference: `#${String(b.id).padStart(5, "0")}`,
    image: b.cover_image,
    cancel_date: b.updated_at || b.created_at,
  })) ?? [], [CancelledBookingData]);

  const EventCancelled = useMemo(() => CancelledBookingData?.myBookings?.eventBooking.map(b => ({
    id: b.booking_id,
    title: b.event_title,
    type: b.type,
    date: formatDate(b.book_date),
    venueId: b.event_id,
    checkReview: b.has_review,
    time: formatStartEnd(b.start_time, b.end_time),
    reference: `#${String(b.booking_id).padStart(5, "0")}`,
    image: b.desktop_image,
    cancel_date: b.cancelled_at || b.updated_at || b.created_at
  })) ?? [], [CancelledBookingData]);
  const SortedCancelled = useMemo(() => [...EventCancelled, ...VenueCancelled], [EventCancelled, VenueCancelled]);

  const AllCancelledBooking = useMemo(() => [...SortedCancelled].sort(
    (a, b) => new Date(b.cancel_date) - new Date(a.cancel_date)
  ), [SortedCancelled]);


  const filteredBookings = useMemo(() => {
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
