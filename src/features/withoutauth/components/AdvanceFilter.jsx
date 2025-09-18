import React, { useState, useCallback } from "react";
import DeskTopFilterCalendar from "./DeskTopFilterCalendar";
import "./Stylesheets/AdvanceFilter.css";
import Timeslot from "../components/Timeslot.jsx";

export default function AdvancedFilter({
  runList = [],
  filters,
  setFilters,
  onReset,
  mode,
}) {
  const uniqueValues = (arr, key) => {
    const set = new Set();
    arr.forEach((item) => {
      if (item[key]) set.add(item[key]);
    });
    return [...set];
  };

  const services = [
    ...new Set(
      runList.flatMap((evt) =>
        evt.sports
          ? evt.sports.map((s) => (typeof s === "object" ? s.name : s))
          : []
      )
    ),
  ];

  const amenities = [
    ...new Set(
      runList.flatMap((evt) =>
        evt.amenities
          ? evt.amenities.map((a) => (typeof a === "object" ? a.name : a))
          : []
      )
    ),
  ];

  const difficulties =
    uniqueValues(runList, "difficulty").filter(Boolean).length > 0
      ? uniqueValues(runList, "difficulty").filter(Boolean)
      : ["Easy", "Moderate", "Difficult"];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = useCallback(
    (date) => {
      setSelectedDate(date);
      setFilters((prev) => ({
        ...prev,
        date: date,
      }));
    },
    [setFilters]
  );

  const handleTimeChange = useCallback(
    (time) => {
      setSelectedTime(time);
      setFilters((prev) => ({
        ...prev,
        time: time,
      }));
    },
    [setFilters]
  );

  const ageGroups = ["Adult", "Kids"];
  const batchTypes = ["1-on-1", "Group", "Online"];
  const coachTypes = ["Coach Only", "Academy Only"];
  const toggleCheckbox = (key, value, single = false) => {
    setFilters((prev) => {
      if (single) {
        // For single selection (like Age Group)
        return { ...prev, [key]: prev[key] === value ? "" : value };
      } else {
        // For multi-selection (like Batch Type or Coach Type)
        const arr = prev[key] || [];
        return arr.includes(value)
          ? { ...prev, [key]: arr.filter((v) => v !== value) }
          : { ...prev, [key]: [...arr, value] };
      }
    });
  };

  return (
    <div className="advanced-filter">
      {/* Header */}
      <div className="filter-header">
        <h3>Filter</h3>
        <button
          className="reset-btns"
          onClick={() => {
            setSelectedDate(new Date());
            setSelectedTime(null);
            onReset();
          }}
        >
          Reset
        </button>
      </div>

      {services.length > 0 && (
        <div className="filter-box">
          <h4>Activity / Services</h4>
          <div className="service-grid">
            {services.map((item, idx) => (
              <button
                key={idx}
                className={`service-btn ${filters.service === item ? "active" : ""}`}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, service: item }))
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date + Time */}
      {/* Date + Time */}
      <div className="filter-box">
        <h4>Select Date</h4>
        <DeskTopFilterCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        {/* Only show Timeslot if mode is run or event */}
        {selectedDate && (mode === "run" || mode === "event") && (
          <div className="timeslot">
            <Timeslot
              selectedTime={selectedTime}
              onTimeSlotChange={handleTimeChange}
            />
          </div>
        )}
        {(selectedDate ||
          (selectedTime && (mode === "run" || mode === "event"))) && (
          <p className="selected-info">
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : ""}
            {selectedTime && (mode === "run" || mode === "event")
              ? ` | ${selectedTime}`
              : ""}
          </p>
        )}
      </div>

      {/* Coach Mode Filters */}
      {mode === "coach" && (
        <>
          {/* Age Group */}
          <div className="filter-box">
            <h4>Age Group</h4>
            <div className="age-grid">
              {ageGroups.map((age) => {
                const checked = filters.ageGroup === age.toLowerCase();
                return (
                  <label key={age} className="age-item">
                    <span>{age}</span>
                    <span
                      className={`custom-checkbox ${checked ? "active" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          toggleCheckbox("ageGroup", age.toLowerCase(), true)
                        }
                      />
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Batch Type */}
          <div className="filter-box">
            <h4>Batch Type</h4>
            <div className="batch-grid">
              {batchTypes.map((batch) => {
                const checked = filters.batchType?.includes(batch);
                return (
                  <label key={batch} className="batch-item">
                    <span>{batch}</span>
                    <span
                      className={`custom-checkbox ${checked ? "active" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCheckbox("batchType", batch)}
                      />
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Coach Type */}
          <div className="filter-box">
            <h4>Coach Type</h4>
            <div className="coach-type-grid">
              {coachTypes.map((type) => {
                const checked = filters.type?.includes(type.toLowerCase());
                return (
                  <label key={type} className="coach-item">
                    <span>{type}</span>
                    <span
                      className={`custom-checkbox ${checked ? "active" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          toggleCheckbox("type", type.toLowerCase())
                        }
                      />
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </>
      )}

      {(mode === "run" || mode === "event" || mode === "gym") && (
        <>
          {/* Price */}
          <div className="filter-box">
            <h4>Price</h4>
            <div className="price-slider">
              <span>₹0</span>
              <input
                type="range"
                min="0"
                max="5000"
                value={filters.price || 0}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
              <span>₹5000</span>
            </div>
            <p className="price-value">Selected: ₹{filters.price || 0}</p>
          </div>

          {amenities.length > 0 && (
            <div className="filter-box">
              <h4>Amenities</h4>
              <div className="amenities-grid">
                {amenities.map((item, idx) => (
                  <button
                    key={idx}
                    className={`amenity-btn ${
                      filters.amenities?.includes(item) ? "active" : ""
                    }`}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        amenities: prev.amenities?.includes(item)
                          ? prev.amenities.filter((a) => a !== item)
                          : [...(prev.amenities || []), item],
                      }))
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>

              {mode === "gym" && (
                <div className="coach-options">
                  <label>
                    <input
                      type="checkbox"
                      checked={filters.womenOnly || false}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          womenOnly: !prev.womenOnly,
                        }))
                      }
                    />
                    Only Woman
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={filters.coachAvailable || false}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          coachAvailable: !prev.coachAvailable,
                        }))
                      }
                    />
                    Coach Available
                  </label>
                </div>
              )}
            </div>
          )}

          {mode !== "gym" && difficulties.length > 0 && (
            <div className="filter-box">
              <div className="difficulty-list">
                {difficulties.map((level, idx) => (
                  <div
                    key={idx}
                    className={`difficulty-row ${
                      filters.difficulty?.includes(level) ? "active" : ""
                    }`}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        difficulty: prev.difficulty?.includes(level)
                          ? prev.difficulty.filter((d) => d !== level)
                          : [...(prev.difficulty || []), level],
                      }))
                    }
                  >
                    <span>{level}</span>
                    <input
                      type="checkbox"
                      readOnly
                      checked={filters.difficulty?.includes(level)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
