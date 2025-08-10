import React, { useState } from 'react';
import './Stylesheets/TicketSelector.css';

const tickets = [
  { id: 1, label: '5Km Run', price: 999 },
  { id: 2, label: '10Km Run', price: 999 },
  { id: 3, label: '15Km Run', price: 999 },
  { id: 4, label: '20Km Run', price: 999 },
];

const TicketSelector = ({ tickets, counts, onChange }) => {
 
console.log(tickets,"my tickets")
 const handleIncrement = (index) => {
    const updated = [...counts];
    updated[index]++;
    onChange(updated);
  };

  const handleDecrement = (index) => {
    const updated = [...counts];
    if (updated[index] > 0) {
      updated[index]--;
      onChange(updated);
    }
  };

  return (
    <div className="ticket-box">
      {tickets?.map((ticket, index) => (
        <div className="ticket-row" key={ticket.id}>
          <div className="ticket-info">
            <span className="ticket-label">{ticket.category_name}</span>
            <span className="ticket-price">₹{ticket.price}/Person</span>
          </div>
          <div className="ticket-counter">
            <button onClick={() =>  handleDecrement(index)}>-</button>
            <span>{counts[index]}</span>
            <button onClick={() => handleIncrement(index)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketSelector;
