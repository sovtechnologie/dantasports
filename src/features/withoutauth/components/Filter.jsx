import React, { useState, useEffect } from "react";
import Amenities from "./Amenities";
import "../Stylesheets/FilterSection.css";
import TimeSlotSelector from "./TimeSlotSelector";
import AvailabilityCalendar from "./AvailabilityCalendar";
import SportsSlider from "./SportsSlider";

function Filter({
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

  // ✅ Reset Function
  const handleReset = (e) => {
    e.preventDefault();
    setSelectedSports([]);
    setSelectedAmenities([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setSearchTerm("");
    setFilteredVenues(venues);
    setCanApply(false);
    if (onReset) onReset();
  };

  // ✅ Apply Function
  const handleApply = () => {
    if (!selectedSports.length) {
      alert("कृपया पहले कोई खेल (sport) चुनें।");
      return;
    }
    if (onApply) {
      onApply(); // यह parent (VenuePage) से API call करेगा
    }
  };

  // ✅ Sport चुने जाने पर बाकी enable हों
  useEffect(() => {
    setCanApply(selectedSports.length > 0);
  }, [selectedSports]);

  return (
    <section className="filter_section">
      {/* Header */}
      <div className="filter_header d-flex justify-content-between align-items-center">
        <h2 className="m-0">Filter</h2>
        <a href="#" onClick={handleReset}>
          Reset
        </a>
      </div>

      {/* ✅ Sports Filter */}
      <SportsSlider
        onSelectSports={setSelectedSports}
        selectedSports={selectedSports}
      />

      {/* ✅ Date Filter */}
      <div
        className={`filter_block ${!selectedSports.length ? "disabled-block" : ""
          }`}
      >
        <AvailabilityCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* ✅ Time Slot Filter */}
      <div
        className={`filter_block ${!selectedSports.length ? "disabled-block" : ""
          }`}
      >
        <TimeSlotSelector
          date={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>

      {/* ✅ Amenities Filter */}
      <Amenities
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
      />

      {/* ✅ Apply Button */}
      <div className="text-center mt-3">
        <button
          className={`apply_btn ${canApply ? "active" : "disabled"}`}
          onClick={handleApply}
          disabled={!canApply}
        >
          Apply
        </button>
      </div>
    </section>
  );
}

export default Filter;
