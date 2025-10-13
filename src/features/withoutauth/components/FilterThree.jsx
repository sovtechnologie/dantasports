import React from 'react'
import "../Stylesheets/FilterTwo.css";
import Age from './Age';
import Batch from './Batch';
import CustomDatePicker from './CustomDatePicker';
import Amenities from './Amenities';
import CoachAvailable from './CoachAvailable';
import PriceSlider from './PriceSlider ';
function FilterThree() {
  return (
    <>
      <div className="filter_card mt-3">
        <div className="d-flex justify-content-between">
            <h3 className='m-0'>Filter</h3>
            <a href="" className='reset'>Reset</a>
        </div>
        <CustomDatePicker/>
         <PriceSlider/>
        <Amenities/>
        <CoachAvailable/>
       
        
     </div>
    </>
  )
}

export default FilterThree
