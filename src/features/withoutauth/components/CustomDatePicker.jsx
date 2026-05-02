import React, { useState, useRef, useEffect } from "react";
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, isSameMonth, isSameDay,
} from "date-fns";
import "../Stylesheets/Filterpages/FilterSystem.css";

export default function CustomDatePicker({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [open, setOpen]                 = useState(false);
  const pickerRef = useRef(null);
  const today     = new Date();

  useEffect(() => {
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onDateClick = (day) => {
    const fixed = new Date(day.getTime() - day.getTimezoneOffset() * 60000);
    setSelectedDate(fixed);
    setOpen(false);
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd   = endOfMonth(monthStart);
    const startDate  = startOfWeek(monthStart);
    const endDate    = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day  = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const clone     = new Date(day);
        const isToday   = isSameDay(day, today);
        const isSelected= selectedDate && isSameDay(day, selectedDate);
        const disabled  = !isSameMonth(day, monthStart);
        days.push(
          <div
            key={day.toString()}
            className={`dp-cell${disabled ? " dp-disabled" : ""}${isSelected ? " dp-selected" : ""}${isToday && !isSelected ? " dp-today" : ""}`}
            onClick={() => !disabled && onDateClick(clone)}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="dp-row" key={day.toString()}>{days}</div>);
      days = [];
    }
    return <div className="dp-body">{rows}</div>;
  };

  return (
    <div className="dp-wrapper" ref={pickerRef}>
      <p className="filter_sub_title" style={{ marginBottom: 8 }}>📅 Date</p>

      <div className="dp-input-container" onClick={() => setOpen((o) => !o)}>
        <input
          type="text"
          readOnly
          value={selectedDate ? format(selectedDate, "dd MMM yyyy") : ""}
          placeholder="Select a date"
        />
        <span className="dp-icon">
          {selectedDate ? (
            <button
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#858585", padding: 0 }}
              onClick={(e) => { e.stopPropagation(); setSelectedDate(null); }}
              aria-label="Clear date"
            >✕</button>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="3" width="14" height="12" rx="2" stroke="#858585" strokeWidth="1.5"/>
              <path d="M5 1v4M11 1v4M1 7h14" stroke="#858585" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </div>

      {open && (
        <div className="dp-calendar">
          {/* Header */}
          <div className="dp-header">
            <button className="dp-nav" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>‹</button>
            <span className="dp-month">{format(currentMonth, "MMMM yyyy")}</span>
            <button className="dp-nav" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>›</button>
          </div>

          {/* Day labels */}
          <div className="dp-days">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div className="dp-day" key={d}>{d}</div>
            ))}
          </div>

          {/* Cells */}
          {renderCells()}
        </div>
      )}
    </div>
  );
}
