import React, { useState, useEffect } from "react";
import Amenities from "./Amenities";
import "../Stylesheets/FilterSection.css";
import "../Stylesheets/Filterpages/FilterSystem.css";
import TimeSlotSelector from "./TimeSlotSelector";
import AvailabilityCalendar from "./AvailabilityCalendar";
import SportsSlider from "./SportsSlider";

export default function Filter({
  selectedSports,
  setSelectedSports,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  searchTerm,
  setSearchTerm,
  venues = [],
  setFilteredVenues,
  onApply,
  onReset,
  selectedAmenities,
  setSelectedAmenities,
}) {
  const [canApply, setCanApply] = useState(false);

  useEffect(() => {
    setCanApply(selectedSports.length > 0 || selectedAmenities.length > 0);
  }, [selectedSports, selectedAmenities]);

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedSports([]);
    setSelectedAmenities([]);
    setSelectedDate(null);
    setSelectedTime(null);
    if (setSearchTerm) setSearchTerm("");
    setFilteredVenues(venues);
    setCanApply(false);
    if (onReset) onReset();
  };

  const handleApply = () => {
    if (!selectedSports.length) {
      alert("Please select a sport first");
      return;
    }
    if (onApply) onApply();
  };

  const activeCount = [
    selectedSports?.length > 0,
    !!selectedDate,
    !!selectedTime,
    selectedAmenities?.length > 0,
  ].filter(Boolean).length;

  return (
    <section className="filter_section">
      {/* Header */}
      <div className="filter_header d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">
          Filter
          {activeCount > 0 && (
            <span style={{
              marginLeft: 8,
              background: "#1163C7",
              color: "white",
              borderRadius: "50%",
              width: 18, height: 18,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
              verticalAlign: "middle",
            }}>
              {activeCount}
            </span>
          )}
        </h2>
        {activeCount > 0 && (
          <button type="button" onClick={handleReset}>Reset</button>
        )}
      </div>

      {/* Sports */}
      <SportsSlider
        setSelectedSports={setSelectedSports}
        selectedSports={selectedSports}
      />

      {/* Date */}
      <div className={`filter_block${!selectedSports.length ? " disabled-block" : ""}`}>
        <AvailabilityCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* Time */}
      <div className={`filter_block${!selectedSports.length ? " disabled-block" : ""}`}>
        <TimeSlotSelector
          date={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>

      {/* Amenities */}
      <Amenities
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
      />

      {/* Apply */}
      <div className="mt-3">
        <button
          className={`apply_btn${canApply ? " active" : " disabled"}`}
          onClick={handleApply}
          disabled={!canApply}
        >
          {canApply ? "Apply Filters" : "Select a sport to apply"}
        </button>
      </div>
    </section>
  );
}
