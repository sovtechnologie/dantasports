import React from 'react'

function Age() {
  return (
    <>
      <div className="filter_inner_cards">
       <h2>Age</h2>
       <div className="d-flex justify-content-between ">
       
        <div>
             <label className="form-check-label" htmlFor="flexCheckChecked">
         Adults
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
         Kids
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

export default Age
