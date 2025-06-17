import React from 'react';
import './Stylesheets/MyTimeSlot.css'; // We'll create this CSS file

const MyTimeSlot = ({ selectedDate, onTimeSelect }) => {
  // Sample data - in a real app, this would come from your API
  const timeSlots = [
    { time: '13:30', period: 'AM', available: true },
    { time: '13:30', period: 'PM', available: false },
    { time: '13:30', period: 'PM', available: false },
    { time: '23:30', period: 'PM', available: true }
  ];

  return (
    <div className="time-slot-container">
      <h3>Available Time Slots for {selectedDate.toDateString()}</h3>
      <div className="time-slots">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className={`time-slot ${slot.available ? 'available' : 'booked'}`}
            onClick={() => slot.available && onTimeSelect(`${slot.time} ${slot.period}`)}
          >
            {slot.time} {slot.period}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTimeSlot;