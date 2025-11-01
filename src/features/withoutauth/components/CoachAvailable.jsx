import React from "react";

function CoachAvailable({ coachAvailable, setCoachAvailable }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCoachAvailable((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="filter_inner_cards border-0">
      <div className="d-flex justify-content-between ">
        <label className="form-check-label">Only Woman</label>
        <input
          className="form-check-input"
          type="checkbox"
          name="onlyWomen"
          checked={coachAvailable?.onlyWomen || false}
          onChange={handleCheckboxChange}
        />
      </div>

      <div className="d-flex justify-content-between ">
        <label className="form-check-label">Coach Available</label>
        <input
          className="form-check-input"
          type="checkbox"
          name="coachAvailable"
          checked={coachAvailable?.coachAvailable || false}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}

export default CoachAvailable;
