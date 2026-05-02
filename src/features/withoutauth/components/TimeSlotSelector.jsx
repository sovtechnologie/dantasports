import React, { useState, useEffect } from "react";
import "../Stylesheets/TimeSlotSelector.css";

const generateSlots = () => {
  const slots = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      slots.push(new Date(0, 0, 0, h, m).toLocaleTimeString("en-US", {
        hour: "numeric", minute: "2-digit",
      }));
    }
  }
  return slots;
};

const isPast = (timeStr, date) => {
  if (!date) return false;
  const sel = new Date(date);
  const now = new Date();
  if (sel.toDateString() !== now.toDateString()) return false;
  const [time, mod] = timeStr.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (mod === "PM" && h < 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;
  const slot = new Date(); slot.setHours(h, m, 0, 0);
  return slot < now;
};

export default function TimeSlotSelector({ date, selectedTime, setSelectedTime }) {
  const [slots] = useState(generateSlots);

  // Auto-select nearest future slot when date changes
  useEffect(() => {
    if (!date || !slots.length) return;
    const now = new Date();
    const sel = new Date(date);
    if (sel.toDateString() === now.toDateString()) {
      const cur = now.getHours() * 60 + now.getMinutes();
      let nearest = slots[0], diff = Infinity;
      slots.forEach((s) => {
        const [t, mod] = s.split(" ");
        let [h, m] = t.split(":").map(Number);
        if (mod === "PM" && h < 12) h += 12;
        if (mod === "AM" && h === 12) h = 0;
        const d = h * 60 + m - cur;
        if (d >= 0 && d < diff) { nearest = s; diff = d; }
      });
      setSelectedTime(nearest);
    } else {
      setSelectedTime("12:00 PM");
    }
  }, [date]);

  return (
    <section className="timeslot_section">
      {/* Header */}
      <div className="time-display">
        <span className="time-label">⏰ Time</span>
        {selectedTime && (
          <span className="time-value">{selectedTime}</span>
        )}
      </div>

      {/* Slot grid */}
      <div className="inner">
        <div className="slot-grid">
          {slots.map((t, i) => {
            const disabled = isPast(t, date);
            return (
              <button
                key={i}
                className={`${selectedTime === t ? "active" : ""}${disabled ? " disabled" : ""}`}
                onClick={() => !disabled && setSelectedTime(t)}
                disabled={disabled}
                title={disabled ? "Past time" : t}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      {selectedTime && date && (
        <div className="book_a_time">
          <p>
            📅 {new Date(date).toLocaleDateString("en-IN", {
              weekday: "short", day: "2-digit", month: "short",
            })} · ⏰ {selectedTime}
          </p>
        </div>
      )}
    </section>
  );
}
