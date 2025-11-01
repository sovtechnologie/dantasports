import React, { useEffect } from "react";
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
  onReset,
  selectedAmenities,
  setSelectedAmenities
}) {
  useEffect(() => {
    if (!venues || venues.length === 0) return;

    let filtered = [...venues];

    if (selectedSports.length > 0) {
      const selectedIds = selectedSports.map((sport) => sport.sports_id);

      filtered = filtered.filter((venue) => {
        const venueSports = venue.sports_ids || [];

        return selectedIds.some((id) => venueSports.includes(id));
      });
    }



    if (selectedDate) {
      filtered = filtered.filter((venue) => {
        const availableDates = venue.availableDates || [];
        return availableDates.includes(selectedDate);
      });
    }


    if (selectedTime) {
      filtered = filtered.filter((venue) => {
        const availableTimes = venue.availableTimes || []; // e.g. ["11:30 AM", "1:30 PM"]
        return availableTimes.includes(selectedTime);
      });
    }


    if (searchTerm && searchTerm.trim() !== "") {
      filtered = filtered.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVenues(filtered);
  }, [selectedSports, selectedDate, selectedTime, searchTerm, venues, setFilteredVenues, selectedAmenities]);

  // ✅ Reset all filters
  const handleReset = (e) => {
    e.preventDefault();
    if (onReset) return onReset();
    e.preventDefault();
    setSelectedSports([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setSearchTerm("");

    setFilteredVenues(venues);
  };

  return (
    <section className="filter_section">
      <div className="filter_header">
        <h2>Filter</h2>
        <a href="#" onClick={handleReset}>
          Reset
        </a>
      </div>

      {/* ✅ Sports Filter */}
      <SportsSlider onSelectSports={setSelectedSports} />

      {/* ✅ Date & Time Filter */}
      <AvailabilityCalendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <TimeSlotSelector
        date={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />


      <Amenities
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
      />

    </section>
  );
}

export default Filter;
