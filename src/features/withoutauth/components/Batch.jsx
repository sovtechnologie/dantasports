import React from "react";

const Batch = () => {
  return (
    <div className="filter_inner_cards">
      <h2>Batch</h2>
      <div className="d-flex justify-content-between ">
        <div>
          <label className="form-check-label" htmlFor="flexCheckChecked">
            1-on-1 Classes
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
        </div>
      </div>
      <div className="d-flex justify-content-between ">
        <div>
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Group Classes
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
        </div>
      </div>
       <div className="d-flex justify-content-between ">
        <div>
          <label className="form-check-label" htmlFor="flexCheckChecked">
           Online Classes
          </label>
        </div>
        <div>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckChecked"
          />
        </div>
      </div>
    </div>
  );
};

export default Batch;
