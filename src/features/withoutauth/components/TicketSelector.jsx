import React, { useEffect, useState } from 'react';
import './Stylesheets/TicketSelector.css';

const TicketSelector = ({ tickets, counts, onChange,setTotalPrice }) => {
 
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


   // Calculate total price inside useEffect to avoid infinite loops
  useEffect(() => {
    const totalPrice = tickets?.reduce((total, ticket, idx) => {
      return total + ticket.price * (counts[idx] || 0);
    }, 0);
    setTotalPrice(totalPrice);
    console.log("my event price", totalPrice);
  }, [counts, tickets, setTotalPrice]);

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
