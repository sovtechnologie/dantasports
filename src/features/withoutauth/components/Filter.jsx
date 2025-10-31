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
  venues = [], // ✅ all venues (from parent)
  setFilteredVenues, // ✅ from parent
}) {
  // ✅ Filter logic: runs whenever filter values change
  useEffect(() => {
    if (!venues || venues.length === 0) return;

    let filtered = [...venues];

    // 🏀 1️⃣ Filter by selected sports IDs
    if (selectedSports.length > 0) {
      // selectedSports = [{sports_id: 4, sports_name: "Football"}, {sports_id: 5, sports_name: "Basketball"}]
      const selectedIds = selectedSports.map((sport) => sport.sports_id);

      filtered = filtered.filter((venue) => {
        // venue.sports_ids = [4, 5, 6] (API se aana chahiye)
        const venueSports = venue.sports_ids || [];

        // ✅ Agar venue ke sports me koi ek selected ID match hoti hai, to us venue ko dikhao
        return selectedIds.some((id) => venueSports.includes(id));
      });
    }



    // 📅 2️⃣ Filter by date
    if (selectedDate) {
      filtered = filtered.filter((venue) => {
        const availableDates = venue.availableDates || []; // e.g. ["2025-10-30", "2025-10-31"]
        return availableDates.includes(selectedDate);
      });
    }

    // ⏰ 3️⃣ Filter by time
    if (selectedTime) {
      filtered = filtered.filter((venue) => {
        const availableTimes = venue.availableTimes || []; // e.g. ["11:30 AM", "1:30 PM"]
        return availableTimes.includes(selectedTime);
      });
    }

    // 🔍 4️⃣ Search by name
    if (searchTerm && searchTerm.trim() !== "") {
      filtered = filtered.filter((venue) =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVenues(filtered);
  }, [selectedSports, selectedDate, selectedTime, searchTerm, venues, setFilteredVenues]);

  // ✅ Reset all filters
  const handleReset = (e) => {
    e.preventDefault();
    setSelectedSports([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setSearchTerm("");
    setFilteredVenues(venues); // restore all venues
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
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <Amenities />
    </section>
  );
}

export default Filter;
