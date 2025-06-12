import React, { useState, useEffect, useRef } from "react";
import "./Stylesheets/Timeslot.css";

function generateTimeSlots(startTimeStr, endTimeStr, intervalInMinutes) {
  const slots = [];
  const [startHours, startMinutes] = startTimeStr.split(":").map(Number);
  const [endHours, endMinutes] = endTimeStr.split(":").map(Number);

  let current = new Date();
  current.setHours(startHours, startMinutes, 0, 0);

  const end = new Date();
  end.setHours(endHours, endMinutes, 0, 0);

  while (current <= end) {
    slots.push(current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    current = new Date(current.getTime() + intervalInMinutes * 60 * 1000);
  }

  return slots;
}

export default function Timeslot() {
   const [selectedTime, setSelectedTime] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const buttonRef = useRef(null);
  const barRef = useRef(null);
  const isSyncingScroll = useRef(false);

  const scroll = (direction) => {
    const scrollAmount = 120;
    if (buttonRef.current) {
      buttonRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
    if (barRef.current) {
      barRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleTimeClick = (time, index) => {
    setSelectedTime(time);
    const scrollTo = index * 112; // Width + gap
    buttonRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    barRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  useEffect(() => {
    const slots = generateTimeSlots("11:30", "20:30", 60);
    setTimeSlots(slots);
    setSelectedTime(slots[0]);
  }, []);

  useEffect(() => {
    const btnEl = buttonRef.current;
    const barEl = barRef.current;

    const syncScroll = (source, target) => {
      return () => {
        if (isSyncingScroll.current) return;
        isSyncingScroll.current = true;
        target.scrollLeft = source.scrollLeft;
        requestAnimationFrame(() => {
          isSyncingScroll.current = false;
        });
      };
    };

    btnEl.addEventListener("scroll", syncScroll(btnEl, barEl));
    barEl.addEventListener("scroll", syncScroll(barEl, btnEl));

    return () => {
      btnEl.removeEventListener("scroll", syncScroll(btnEl, barEl));
      barEl.removeEventListener("scroll", syncScroll(barEl, btnEl));
    };
  }, []);;


  useEffect(() => {
    const slots = generateTimeSlots("11:30", "20:30", 60); // from 11:30 AM to 2:30 PM
    setTimeSlots(slots);
    setSelectedTime(slots[0]); // default to first slot
  }, []);

  return (
    <div className="time-picker-box">
      <div className="time-display">
        <label>Time:</label>
        <div className="selected-time">{selectedTime || "--:--"}</div>
      </div>

      <div className="time-scroll-container">
        <button className="arrow left" onClick={() => scroll("left")}>‹</button>

        <div className="time-buttons-wrapper" ref={buttonRef}>

          <div className="time-buttons">
            {timeSlots.map((time, idx) => (
              <button
                key={idx}
                className={`time-btn ${selectedTime === time ? "selected" : ""}`}
                onClick={() => {
                 
                  handleTimeClick(time, idx)}}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button className="arrow right" onClick={() => scroll("right")}>›</button>
      </div>

      <div className="timeline-bar-wrapper">
        <div className="timeline-bar" ref={barRef}>
          {timeSlots.map((time, idx) => (
            <div
              key={idx}
              className={`timeline-slot ${selectedTime === time ? "selected" : "available"
                }`}
                 onClick={() => handleTimeClick(time, idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
