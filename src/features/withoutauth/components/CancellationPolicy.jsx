import React from 'react';
import "./Stylesheets/CustomModal.css";

function CancellationPolicy({ policyText }) {
  return (
    <div className="modal_box">
      {policyText ? (
        <p style={{ whiteSpace: "pre-wrap" }}>{policyText}</p>
      ) : (
        <p>Cancellation policy not available.</p>
      )}
    </div>
  );
}

export default CancellationPolicy;
