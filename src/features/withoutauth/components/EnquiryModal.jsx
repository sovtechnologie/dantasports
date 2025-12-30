// EnquiryModal.js
import React, { useState } from "react";
import "./Stylesheets/EnquiryModal.css";

const EnquiryModal = ({ onClose, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const isFormValid = message.trim().length > 0 && isChecked;

  const handleSend = () => {
    if (!isFormValid) return;
    onSubmit(message); // ✅ parent ko dynamic message bhej diya
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h3>Hi! What's Your Enquiry</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <textarea
            className="modal-textarea"
            placeholder="Enter text"
            maxLength={1024}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="char-count">
            {message.length} / 1024 characters
          </div>

          <div className="modal-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span>
              I'm okay with sharing my contact details with the coach for future correspondence
            </span>
          </div>

          <button
            className={`modal-submit ${!isFormValid ? "disabled" : ""}`}
            disabled={!isFormValid}
            onClick={handleSend}
          >
            SEND ENQUIRY
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
