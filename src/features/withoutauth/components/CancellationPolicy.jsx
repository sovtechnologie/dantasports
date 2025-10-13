import React from 'react'
import "./Stylesheets/CustomModal.css";
function CancellationPolicy() {
  return (
    <>
      <div className="modal_box">
        <p> <strong>0–2 hours</strong> before slot: Cancellation <strong>not allowed.</strong></p>
          <p><strong>&gt; 2 hours</strong> before the slot: <strong>5% of the total amount</strong> will be deducted as a cancellation fee.</p>
      </div>
    </>
  )
}

export default CancellationPolicy
