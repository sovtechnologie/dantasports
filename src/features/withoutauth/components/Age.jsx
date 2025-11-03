import React from "react";

function Age({ selectedAge, setSelectedAge }) {
  const handleAgeChange = (ageType) => {
    // toggle logic
    const updated = selectedAge.includes(ageType)
      ? selectedAge.filter((a) => a !== ageType)
      : [...selectedAge, ageType];

    setSelectedAge(updated);
  };

  return (
    <>
      <div className="filter_inner_cards">
        <h2>Age</h2>

        <div className="d-flex justify-content-between">
          <div>
            <label className="form-check-label" htmlFor="adultCheck">
              Adults
            </label>
          </div>
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              id="adultCheck"
              checked={selectedAge.includes("adults")}
              onChange={() => handleAgeChange("adults")}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div>
            <label className="form-check-label" htmlFor="kidsCheck">
              Kids
            </label>
          </div>
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              id="kidsCheck"
              checked={selectedAge.includes("kids")}
              onChange={() => handleAgeChange("kids")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Age;
