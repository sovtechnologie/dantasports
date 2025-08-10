// EnquiryModal.js
import React from "react";
import "./Stylesheets/EnquiryModal.css";
import DoneImage from "../assets/doneImage.svg"; // Replace with actual path

const EnquiryModal = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="enquiry-modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <img src={DoneImage} alt="Done" className="modal-image" />
        <h2 className="modal-title">Enquiry Submitted!</h2>
        <p className="modal-text">
          We have received your enquiry. Thank you for reaching out, & we’ll be in touch soon.
        </p>
      </div>
    </div>
  );
};

export default EnquiryModal;
