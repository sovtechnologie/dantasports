import React from 'react'
import "../Stylesheets/FilterTwo.css";
import Age from './Age';
import Batch from './Batch';
import CustomDatePicker from './CustomDatePicker';
import ActivityServices from './ActivityServices';
import CoachOnly from './CoachOnly';
function FilterTow() {
  return (
    <>
     <div className="filter_card mt-3">
        <div className="d-flex justify-content-between">
            <h3 className='m-0'>Filter</h3>
            <a href="" className='reset'>Reset</a>
        </div>
        <ActivityServices/>
        <CustomDatePicker/>
        <Age/>
        <Batch/>
        <CoachOnly/>
        
     </div>
    </>
  )
}

export default FilterTow
