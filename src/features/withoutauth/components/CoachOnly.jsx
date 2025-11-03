import React from "react";

function CoachOnly({ selectedCoachType, setSelectedCoachType }) {
  const handleCheckboxChange = (typeValue) => {
    const value = Number(typeValue);
    // toggle: same value click se unselect ho jaye
    setSelectedCoachType(selectedCoachType === value ? null : value);
  };

  return (
    <div className="filter_inner_cards border-0">
      <div className="d-flex justify-content-between ">
        <label className="form-check-label">Coach Only</label>
        <input
          className="form-check-input"
          type="checkbox"
          value="1"
          checked={selectedCoachType === 1}
          onChange={(e) => handleCheckboxChange(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-between ">
        <label className="form-check-label">Academy Only</label>
        <input
          className="form-check-input"
          type="checkbox"
          value="2"
          checked={selectedCoachType === 2}
          onChange={(e) => handleCheckboxChange(e.target.value)}
        />
      </div>

      <div className="d-flex justify-content-between ">
        <label className="form-check-label">Already Contacted</label>
        <input
          className="form-check-input"
          type="checkbox"
          value="3"
          checked={selectedCoachType === 3}
          onChange={(e) => handleCheckboxChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default CoachOnly;
