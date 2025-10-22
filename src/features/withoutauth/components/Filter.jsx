import React from 'react'
import Amenities from './Amenities'
import "../Stylesheets/FilterSection.css";
import TimeSlotSelector from './TimeSlotSelector';
import AvailabilityCalendar from './AvailabilityCalendar';
import SportsSlider from './SportsSlider';

function Filter() {
  return (
    <>
    <section className='filter_section'>
       <div className="filter_header">
        <h2>Filter</h2>
        <a href="#">Reset</a>
      </div>
        <SportsSlider/>
        <AvailabilityCalendar/>
        <TimeSlotSelector/>
      <Amenities/>
    </section>
    </>
  )
}

export default Filter
