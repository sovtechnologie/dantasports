import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SortBy from "./SortBy";
import sorticon from "../assets/Filtericon/sortingicon.svg";
import "./Stylesheets/CustomModal.css";

function SortModal() {
  return (
    <>
      {/* Button trigger */}
      <button
        type="button"
        className="btn_mobile"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <img src={sorticon} alt="" />
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered mobile_sort_by">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <SortBy/>
          </div>
        </div>
      </div>
    </>
  );
}

export default SortModal;
