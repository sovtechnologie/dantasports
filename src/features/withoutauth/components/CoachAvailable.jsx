import React from 'react'

function CoachAvailable() {
  return (
    <>
       <div className="filter_inner_cards border-0">
      <div className="d-flex justify-content-between ">
        <div>
          <label className="form-check-label" htmlFor="flexCheckChecked">
          Only Woman
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
          Coach Available
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
    </>
  )
}

export default CoachAvailable
