import React, { useState } from "react";
import "../Stylesheets/TimeSlotSelector.css"
const TimeSlotSelector = () => {
  const [selectedTime, setSelectedTime] = useState("12:30 PM");

  const times = ["11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30PM"];

  // Example timeline slots (green = available, red = booked)
  const timeline = [
    { time: "11:30 AM", status: "available" },
    { time: "12:30 PM", status: "available" },
    { time: "1:00 PM", status: "booked" },
    { time: "1:30 PM", status: "available" },
    { time: "2:30 PM", status: "available" },
    { time: "2:30 PM", status: "available" },
  ];

  return (
    <>
    <section className="timeslot_section">
    <div className="inner">
      {/* Time Selection */}
      <div className="mb-3 d-flex align-items-center">
        <label className="time">Time:</label>
        <input
          type="text"
          className="form-control  text-center"
          value={selectedTime}
          readOnly
        />
      </div>

      {/* Time Buttons */}
      <div className="d-flex  mb-3 flex-wrap">
        {times.map((time) => (
         <button
        key={time}
        className={`time-btn ${selectedTime === time ? "active" : ""}`}
        onClick={() => setSelectedTime(time)}
      >
        {time}
      </button>

        ))}
      </div>
      <div className="book_a_time">
        <p>Badminton | Tomorrow | 01:00 PM - 02:00 PM</p>
      </div>
    </div>
    </section>
    </>
  );
};

export default TimeSlotSelector;
