import React from "react";
import "../Stylesheets/Filterpages/FilterSystem.css";
import Amenities from "./Amenities";
import CoachAvailable from "./CoachAvailable";
import PriceSlider from "./PriceSlider ";

export default function FilterThree({
  priceRange, setPriceRange,
  selectedAmenities, setSelectedAmenities,
  coachAvailable, setCoachAvailable,
}) {
  const handleReset = (e) => {
    e?.preventDefault();
    setPriceRange([0, 10000]);
    setSelectedAmenities([]);
    setCoachAvailable({ onlyWomen: false, coachAvailable: false });
  };

  const activeCount = [
    priceRange?.[1] > 0,
    selectedAmenities?.length > 0,
    coachAvailable?.onlyWomen,
    coachAvailable?.coachAvailable,
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

      <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
      <Amenities selectedAmenities={selectedAmenities} setSelectedAmenities={setSelectedAmenities} />
      <CoachAvailable coachAvailable={coachAvailable} setCoachAvailable={setCoachAvailable} />
    </div>
  );
}
