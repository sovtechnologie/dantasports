import React from 'react';
import "../Stylesheets/SortBy.css";
// import "./Stylesheets/CustomModal.css";/
function SortBy() {
  return (
    <div className="short_card">
      <div className="d-flex justify-content-between mb-3 align-items-center">
        <div>
          <h2 className='m-0'>Sort by</h2>
        </div>
        <div>
          <a href="">Reset</a>
        </div>
      </div>

      <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox" 
          value="" 
          id="flexCheckDefault" 
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Popularity
        </label>
      </div>

      <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox" 
          value="" 
          id="flexCheckChecked" 
          
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Near By
        </label>
      </div>
       <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox" 
          value="" 
          id="flexCheckChecked" 
          
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Favorites
        </label>
      </div>
       <div className="form-check">
        <input 
          className="form-check-input" 
          type="checkbox" 
          value="" 
          id="flexCheckChecked" 
          
        />
        <label className="form-check-label" htmlFor="flexCheckChecked">
          Price: Low to High
        </label>
      </div>
    </div>
  );
}

export default SortBy;
