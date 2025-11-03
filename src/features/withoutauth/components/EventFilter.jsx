import React from "react";
import "../../withoutauth/Stylesheets/EventFilter.css";
import ActivityServices from "./ActivityServices";
import CustomDatePicker from "./CustomDatePicker";
import Difficulty from "./Difficulty";
import Amenities from "./Amenities";
import DistanceSlider from "./DistanceSlider";
import ActivityForEvent from "./ActivityForEvent";

function EventFilter({
  selectedSports,
  setSelectedSports,
  selectedDate,
  setSelectedDate,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedDistance,
  setSelectedDistance,
  selectedAmenities,
  setSelectedAmenities
}) {

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedSports([]);
    setSelectedDate(null);
    setSelectedDifficulty(null);
    setSelectedDistance(800);
    setSelectedAmenities([])

  };

  return (
    <>
      <div className="filter_card mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="m-0">Filter</h3>
          <a href="" className="reset"

            onClick={handleReset}

            type="button"
          >
            Reset
          </a>
        </div>

        <ActivityForEvent
          selectedSports={selectedSports}
          setSelectedSports={setSelectedSports}
        />

        <CustomDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <Difficulty
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />

        <DistanceSlider
          selectedDistance={selectedDistance}
          setSelectedDistance={setSelectedDistance}
        />

        <Amenities
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={selectedAmenities}
        />
      </div>
    </>
  );
}

export default EventFilter;
