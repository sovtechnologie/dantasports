import React, { useRef, useEffect } from "react";
import "../../withoutauth/Stylesheets/Filterpages/AvailabilityCalendar.css";

const AvailabilityCalendar = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const scrollRef = useRef(null);

  const coerceToDate = (d) => {
    if (!d) return null;
    if (d instanceof Date && !isNaN(d)) return d;
    const parsed = new Date(d);
    return isNaN(parsed) ? null : parsed;
  };

  // ❌ DO NOT fallback to today
  const internalSelected = coerceToDate(selectedDate);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateDates = () => {
    const dates = [];
    let start = new Date();
    let end = new Date(today.getFullYear(), today.getMonth() + 11, 0);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    return dates;
  };

  const allDates = generateDates();

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const scroll = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  const currentMonth = (internalSelected || today).getMonth();
  const currentYear = (internalSelected || today).getFullYear();

  // ✅ SCROLL ONLY WHEN USER SELECTS A DATE
  useEffect(() => {
    if (!internalSelected || !scrollRef.current) return;

    const idx = allDates.findIndex((d) => isSameDay(d, internalSelected));
    if (idx !== -1) {
      const btn = scrollRef.current.children[idx];
      btn?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [internalSelected]); // 🔥 IMPORTANT

  const handleDateClick = (d) => {
    setSelectedDate?.(new Date(d));
  };

  return (
    <div className="p-3 border rounded mt-3">
      <h5 className="filter_title">Availability</h5>

      <div className="d-flex justify-content-center align-items-center mb-3">
        <button className="btn border-0 btn-sm me-3" onClick={() => scroll(-300)}>
          &lt;
        </button>
        <h6 className="m-0" style={{ color: "#1163c7", fontWeight: 600 }}>
          {monthNames[currentMonth]} {currentYear}
        </h6>
        <button className="btn btn-sm ms-3" onClick={() => scroll(300)}>
          &gt;
        </button>
      </div>

      <div ref={scrollRef} className="d-flex pb-2 date_box_wrapper">
        {allDates.map((d, idx) => {
          const selected = isSameDay(d, internalSelected);
          return (
            <div key={idx} className="date_btn">
              <button
                className={selected ? "active_btn" : "btn-light text-muted"}
                onClick={() => handleDateClick(d)}
              >
                <span>{d.getDate()}</span><br />
                <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
