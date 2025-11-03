import React, { useState, useRef, useEffect } from "react";
import dateIcon from "../../withoutauth/assets/icons/filter-months.svg";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from "date-fns";
import "../../withoutauth/Stylesheets/Filterpages/CustomDatePicker.css";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [open, setOpen] = useState(false);
  const pickerRef = useRef();
  const today = new Date();

  // 🔹 Close calendar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 When user selects date
  const onDateClick = (day) => {
    // Fix timezone offset
    const fixedDate = new Date(day.getTime() - day.getTimezoneOffset() * 60000);

    console.log("Selected (raw):", day);
    console.log("Selected (fixed):", fixedDate);

    setSelectedDate(fixedDate);
    setOpen(false);
  };


  const renderHeader = () => (
    <div className="dp-header">
      <button className="dp-nav" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
        &#8592;
      </button>
      <span className="dp-month">{format(currentMonth, "MMMM yyyy")}</span>
      <button className="dp-nav" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        &#8594;
      </button>
    </div>
  );

  const renderDays = () => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="dp-days">
        {days.map((d) => (
          <div className="dp-day" key={d}>
            {d}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
        const isToday = isSameDay(day, today);
        const isSelected = selectedDate && isSameDay(day, selectedDate);

        days.push(
          <div
            className={`dp-cell
              ${!isSameMonth(day, monthStart) ? "dp-disabled" : ""}
              ${isSelected ? "dp-selected" : ""}
              ${isToday && !isSelected ? "dp-today" : ""}
            `}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            {format(day, "d")}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="dp-row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="dp-body">{rows}</div>;
  };

  return (
    <div className="dp-wrapper" ref={pickerRef}>
      <h2 className="text-start">Date</h2>
      <div className="dp-input-container" onClick={() => setOpen(!open)}>
        <input
          type="text"
          readOnly
          value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
          placeholder="DD/MM/YYYY"
        />
        <span className="dp-icon">
          <img src={dateIcon} alt="date" />
        </span>
      </div>

      {open && (
        <div className="dp-calendar">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
