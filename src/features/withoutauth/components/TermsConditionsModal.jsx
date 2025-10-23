import React from 'react';

function TermsConditionsModal({ termsText }) {
  return (
    <div>
      {termsText ? (
        <p style={{ whiteSpace: "pre-wrap" }}>{termsText}</p>
      ) : (
        <p>Terms & Conditions not available.</p>
      )}
    </div>
  );
}

export default TermsConditionsModal;
