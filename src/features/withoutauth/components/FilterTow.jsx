import React from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";
import Age from "./Age";
import Batch from "./Batch";
import CustomDatePicker from "./CustomDatePicker";
import ActivityServices from "./ActivityServices";
import CoachOnly from "./CoachOnly";

export default function FilterTow({
  setSelectedCoachType, selectedCoachType,
  selectedBatch, setSelectedBatch,
  selectedAge, setSelectedAge,
  selectedSports, setSelectedSports,
  selectedDate, setSelectedDate,
}) {
  const handleReset = (e) => {
    e.preventDefault();
    setSelectedSports([]);
    setSelectedDate(null);
    setSelectedAge([]);
    setSelectedCoachType(null);
    setSelectedBatch([]);
  };

  const activeCount = [
    selectedSports?.length > 0,
    !!selectedDate,
    selectedAge?.length > 0,
    !!selectedCoachType,
    selectedBatch?.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="filter_card mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">
          Filter
          {activeCount > 0 && (
            <span style={{
              marginLeft: 8, background: "#1163C7", color: "white",
              borderRadius: "50%", width: 18, height: 18,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, verticalAlign: "middle",
            }}>
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button type="button" className="reset" onClick={handleReset}>Reset</button>
        )}
      </div>

      <ActivityServices selectedSports={selectedSports} setSelectedSports={setSelectedSports} />
      <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Age selectedAge={selectedAge} setSelectedAge={setSelectedAge} />
      <Batch selectedBatch={selectedBatch} setSelectedBatch={setSelectedBatch} />
      <CoachOnly selectedCoachType={selectedCoachType} setSelectedCoachType={setSelectedCoachType} />
    </div>
  );
}
