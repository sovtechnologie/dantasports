import React, { useState } from 'react';
import "../StyleSheets/MyBooking.css";
import BookingImage from "../assets/bookingImage.png";
import BookingCard from '../components/BookingCard';

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


  const filtered = activeTab === "all Booking"
    ? bookingsData
    : bookingsData.filter(b => b.status === activeTab);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

      <h3 className="section-title">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h3>

       {paginated.length === 0 ? (
        <p className="no-bookings">No bookings in this category.</p>
      ) : (
        <div className="booking-list">
          {paginated.map(item => (
            <BookingCard key={item.id} booking={item} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
