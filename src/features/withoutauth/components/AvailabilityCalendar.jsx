import React, { useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * AvailabilityCalendar
 * Props:
 *  - selectedDate: Date | string | null  (can be null/"" when cleared)
 *  - setSelectedDate: function(Date|null)
 */
const AvailabilityCalendar = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const scrollRef = useRef(null);

  // safely coerce selectedDate to a Date object for internal use
  const coerceToDate = (d) => {
    if (!d) return null;
    if (d instanceof Date && !isNaN(d)) return d;
    // try Date.parse for strings
    const parsed = new Date(d);
    return isNaN(parsed) ? null : parsed;
  };

  // internalSelected is either a Date or falls back to today when needed
  const internalSelected = coerceToDate(selectedDate) || today;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Generate continuous dates for ~1 year range (you can adjust)
  const generateDates = () => {
    const dates = [];
    // start from previous month to next 11 months (same as your earlier logic)
    let start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    let end = new Date(today.getFullYear(), today.getMonth() + 11, 0);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };

  const allDates = generateDates();

  // Utility: compare day ignoring time
  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  // Scroll helper
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // derive displayed month/year from internalSelected
  const currentMonth = internalSelected.getMonth();
  const currentYear = internalSelected.getFullYear();

  // Auto scroll to selectedDate (or today) on mount
  useEffect(() => {
    if (scrollRef.current) {
      const target = coerceToDate(selectedDate) || today;
      const idx = allDates.findIndex((d) => isSameDay(d, target));
      if (idx !== -1) {
        const btn = scrollRef.current.children[idx];
        if (btn) btn.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // handler for clicking a date: send Date object to parent (or null if clearing)
  const handleDateClick = (d) => {
    if (setSelectedDate) setSelectedDate(new Date(d));
  };

  return (
    <div className="p-3 border rounded mt-3">
      <h5 className="fw-bold text-primary mb-4 text-start">Availability</h5>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn border-0 btn-sm" onClick={() => scroll(-300)}>
          &lt;
        </button>
        <h6 className="m-0" style={{ color: "#1163C7", fontWeight: "600" }}>
          {monthNames[currentMonth]} {currentYear}
        </h6>
        <button className="btn btn-sm" onClick={() => scroll(300)}>
          &gt;
        </button>
      </div>

      {/* Scrollable dates */}
      <div
        ref={scrollRef}
        className="d-flex overflow-hidden pb-2"
        style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
      >
        {allDates.map((d, idx) => {
          const selected = isSameDay(d, internalSelected);
          return (
            <button
              key={idx}
              className={`btn d-flex flex-column mx-1 px-3 py-2 rounded ${selected ? "btn-primary text-white" : "btn-light text-muted"
                }`}
              style={{ minWidth: "60px" }}
              onClick={() => handleDateClick(d)}
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
