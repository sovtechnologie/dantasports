import React from 'react';
import "./Stylesheets/CustomModal.css";

function RulesRegulations({ content }) {
  return (
    <div>
      {content ? (
        <p>{content}</p>
      ) : (
        <p>No rules and regulations available.</p>
      )}
    </div>
  );
}

export default RulesRegulations;
