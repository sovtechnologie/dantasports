import React from 'react';
import "../Stylesheets/FilterTwo.css";
import CustomDatePicker from './CustomDatePicker';
import Amenities from './Amenities';
import CoachAvailable from './CoachAvailable';
import PriceSlider from '../components/PriceSlider ';

function FilterThree({
  selectedDate,
  setSelectedDate,
  priceRange,
  setPriceRange,
  selectedAmenities,
  setSelectedAmenities,
  coachAvailable,
  setCoachAvailable
}) {

  // ✅ Reset Filters
  const handleReset = () => {
    setSelectedDate(null);
    setPriceRange([0, 10000]);
    setSelectedAmenities([]);
    setCoachAvailable({ onlyWomen: false, coachAvailable: false });

  };

  return (
    <div className="filter_card mt-3">
      <div className="d-flex justify-content-between">
        <h3 className='m-0'>Filter</h3>
        <a href="" className='reset' onClick={(e) => {
          e.preventDefault();
          handleReset();
        }}>Reset</a>
      </div>

      {/* ✅ Date Picker */}
      <CustomDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* ✅ Price Filter */}
      <PriceSlider
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* ✅ Amenities Filter */}
      <Amenities
        selectedAmenities={selectedAmenities}
        setSelectedAmenities={setSelectedAmenities}
      />

      {/* ✅ Coach Available Filter */}
      <CoachAvailable
        coachAvailable={coachAvailable}
        setCoachAvailable={setCoachAvailable}
      />
    </div>
  );
}

export default FilterThree;
