import React, { useRef, useEffect } from "react";
import "../../withoutauth/Stylesheets/Filterpages/AvailabilityCalendar.css";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const coerceToDate = (d) => {
  if (!d) return null;
  if (d instanceof Date && !isNaN(d)) return d;
  const p = new Date(d);
  return isNaN(p) ? null : p;
};

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
};

const generateDates = () => {
  const today = new Date();
  const end   = new Date(today.getFullYear(), today.getMonth() + 11, 0);
  const dates = [];
  for (let d = new Date(today); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
};

export default function AvailabilityCalendar({ selectedDate, setSelectedDate }) {
  const scrollRef      = useRef(null);
  const internalSelected = coerceToDate(selectedDate);
  const today          = new Date();
  const allDates       = generateDates();

  const displayDate = internalSelected || today;
  const currentMonth = displayDate.getMonth();
  const currentYear  = displayDate.getFullYear();

  const scroll = (offset) => scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });

  useEffect(() => {
    if (!internalSelected || !scrollRef.current) return;
    const idx = allDates.findIndex((d) => isSameDay(d, internalSelected));
    if (idx !== -1) {
      scrollRef.current.children[idx]?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [internalSelected]);

  return (
    <div style={{ marginTop: 16 }}>
      <p className="filter_sub_title" style={{ marginBottom: 8 }}>📅 Availability</p>

      {/* Month header */}
      <div className="availability-header">
        <button className="availability-nav" onClick={() => scroll(-200)}>‹</button>
        <h6>{MONTHS[currentMonth]} {currentYear}</h6>
        <button className="availability-nav" onClick={() => scroll(200)}>›</button>
      </div>

      {/* Date strip */}
      <div ref={scrollRef} className="date_box_wrapper">
        {allDates.map((d, idx) => {
          const selected = isSameDay(d, internalSelected);
          return (
            <div key={idx} className="date_btn">
              <button
                className={selected ? "active_btn" : ""}
                onClick={() => setSelectedDate?.(new Date(d))}
                title={d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
              >
                <span>{d.getDate()}</span>
                <span>{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Clear */}
      {internalSelected && (
        <button
          onClick={() => setSelectedDate?.(null)}
          style={{
            marginTop: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "#858585",
            fontFamily: "DM Sans,sans-serif",
            padding: "2px 0",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ✕ Clear date
        </button>
      )}
    </div>
  );
}
