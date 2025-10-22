import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Filter from "./Filter";
import filtericon from "../assets/Filtericon/Filtericon.svg"
function FliterModal() {
  return (
    <>
      {/* Button trigger */}
      <button
        type="button"
        className="btn_mobile"
        data-bs-toggle="modal"
        data-bs-target="#centeredModal"
      >
       <img src={filtericon} alt="" />
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="centeredModal"
        tabIndex="-1"
        aria-labelledby="centeredModalLabel"
        aria-hidden="true"
      >
        {/* 👇 Centered vertically */}
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header border-0">
             
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Filter/>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default FliterModal;
