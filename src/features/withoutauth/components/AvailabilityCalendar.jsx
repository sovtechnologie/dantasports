import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AvailabilityCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today); // default = today
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const scrollRef = useRef(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate continuous dates for 1 year (you can change range)
  const generateDates = () => {
    const dates = [];
    let start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    let end = new Date(today.getFullYear(), today.getMonth() + 11, 0);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };

  const allDates = generateDates();

  // Utility: compare if two dates are the same (ignoring time)
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  // Scroll left/right
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // Update month/year when selectedDate changes
  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  // Auto scroll to today's date on mount
  useEffect(() => {
    if (scrollRef.current) {
      const todayIndex = allDates.findIndex((d) => isSameDay(d, today));
      if (todayIndex !== -1) {
        const todayButton = scrollRef.current.children[todayIndex];
        if (todayButton) {
          todayButton.scrollIntoView({ behavior: "smooth", inline: "center" });
        }
      }
    }
  }, []);

  return (
    <div className="p-3 border rounded mt-3">
      <h5 className="fw-bold text-primary mb-4 text-start">Availability</h5>

      {/* Header with arrows and month/year */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn border-0 btn-sm"
          onClick={() => scroll(-300)}
        >
          &lt;
        </button>
        <h6 className="m-0" style={{ color: "#1163C7", fontWeight: "600" }}>
          {monthNames[currentMonth]} {currentYear}
        </h6>
        <button
          className="btn btn-sm"
          onClick={() => scroll(300)}
        >
          &gt;
        </button>
      </div>

      {/* Scrollable dates row */}
      <div
        ref={scrollRef}
        className="d-flex overflow-hidden pb-2"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {allDates.map((d, idx) => {
          const selected = isSameDay(d, selectedDate);
          return (
            <button
              key={idx}
              className={`btn d-flex flex-column mx-1 px-3 py-2 rounded ${
                selected ? "btn-primary text-white" : "btn-light text-muted"
              }`}
              style={{ minWidth: "60px" }}
              onClick={() => setSelectedDate(new Date(d))}
            >
              <span className="fw-bold">{d.getDate()}</span>
              <small>{d.toLocaleDateString("en-US", { weekday: "short" })}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
