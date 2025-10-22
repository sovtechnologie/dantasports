import React from "react";
import "../../withoutauth/Stylesheets/EventFilter.css";
import ActivityServices from "./ActivityServices";
import CustomDatePicker from './CustomDatePicker';
import Difficulty from "./Difficulty";
import Amenities from "./Amenities";
import DistanceSlider from "./DistanceSlider";
function EventFilter() {
  return (
    <>
      <div className="filter_card mt-3">
        <div className="d-flex justify-content-between">
          <h3 className="m-0">Filter</h3>
          <a href="" className="reset">
            Reset
          </a>
        </div>
        <ActivityServices/>
        <CustomDatePicker/>
        <Difficulty/>
        <DistanceSlider/>
         <Amenities/>

      
      </div>
    </>
  );
}

export default EventFilter;
