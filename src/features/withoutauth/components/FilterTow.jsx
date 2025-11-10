import React from 'react'
import "../Stylesheets/FilterTwo.css";
import Age from './Age';
import Batch from './Batch';
import CustomDatePicker from './CustomDatePicker';
import ActivityServices from './ActivityServices';
import CoachOnly from './CoachOnly';
function FilterTow({ setSelectedCoachType, selectedCoachType, selectedBatch, setSelectedBatch, selectedAge, setSelectedAge, selectedSports, setSelectedSports, }) {

  const handleReset = (e) => {
    e.preventDefault();
    setSelectedSports([]);
    setSelectedAge([]);
    setSelectedCoachType(null);
    setSelectedBatch([]);
    console.log("All filters reset");
  };
  return (
    <>
      <div className="filter_card mt-3">
        <div className="d-flex justify-content-between">
          <h3 className='m-0'>Filter</h3>
          <a href="" className='reset' onClick={handleReset}>Reset</a>
        </div>
        <ActivityServices
          selectedSports={selectedSports}
          setSelectedSports={setSelectedSports}
        />
        {/* <CustomDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        /> */}

        <CustomDatePicker/>

        <Age selectedAge={selectedAge} setSelectedAge={setSelectedAge} />


        <Batch selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch} />

        <CoachOnly
          selectedCoachType={selectedCoachType}
          setSelectedCoachType={setSelectedCoachType}
        />


      </div>
    </>
  )
}

export default FilterTow
