import React, { useState, useEffect } from 'react';
import './Stylesheets/TimeSelector.css';

const generateTimeSlots = (start, end, interval = 60) => {
  const slots = [];
  let current = new Date(start);
  while (current <= end) {
    slots.push(new Date(current));
    current.setMinutes(current.getMinutes() + interval);
  }
  return slots;
};

const TimeSelector = ({selectedDate}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [timeSlots, setTimeSlots] = useState([]);

  // useEffect(() => {
  //   const today = new Date();
  //   today.setHours(11, 30, 0, 0); // Start 11:30 AM
  //   const end = new Date(today);
  //   end.setHours(14, 30); // End 2:30 PM
  //   setTimeSlots(generateTimeSlots(today, end));
  // }, []);



  useEffect(() => {
    if (!selectedDate) return;

    const now = new Date();
    const date = new Date(selectedDate);
    const start = new Date(date);
    const end = new Date(date);

    // Define default time range (e.g., 6:00 AM to 10:00 PM)
    const defaultStartHour = 6;
    const defaultEndHour = 22;

    // Check if selected date is today
    const isToday = now.toDateString() === date.toDateString();

    // Set dynamic or static start time
    if (isToday) {
      start.setHours(now.getHours(), Math.ceil(now.getMinutes() / 30) * 30, 0, 0); // round up to nearest 30 mins
    } else {
      start.setHours(defaultStartHour, 0, 0, 0);
    }

    end.setHours(defaultEndHour, 0, 0, 0);

    setTimeSlots(generateTimeSlots(start, end));
  }, [selectedDate]);


  const handleDuration = (delta) => {
    setDuration(prev => Math.max(0, prev + delta));
  };

  const handleTimeClick = (slot) => {
    setSelectedTime(slot);
  };

  return (
    <div className="ts-wrapper">
      <div className="ts-header">
        <div className="ts-control">
          <span>Duration:</span>
          <div className='ts-button'>
            <button onClick={() => handleDuration(-1)}>-</button>
            <span>{duration}hr</span>
            <button onClick={() => handleDuration(1)}>+</button>
          </div>
        </div>
        <div className="ts-time">
          <span>Time:</span>
          <input value={selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'} disabled />
        </div>
      </div>

      {/* <div className="ts-session-buttons">
        {['Morning', 'Afternoon', 'Evening'].map(session => (
          <button
            key={session}
            className={`ts-session-btn ${session === 'Morning' ? 'active' : ''}`}
            disabled={session !== 'Morning'}
          >
            {session}
          </button>
        ))}
      </div> */}

      <div className="ts-slots">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`ts-slot ${selectedTime?.getTime() === slot.getTime() ? 'active' : ''}`}
            onClick={() => handleTimeClick(slot)}
          >
            {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </button>
        ))}
      </div>

      <div className="ts-bar">
        {timeSlots.map((slot, i) => {
          const slotTime = slot.getTime();
          const selectedStart = selectedTime?.getTime();
          const selectedEnd = selectedStart + duration * 3600000;

          let color = 'green';
          if (selectedTime && slotTime >= selectedStart && slotTime < selectedEnd) {
            color = 'red';
          }

          return <div key={i} className="ts-segment" style={{ backgroundColor: color }}></div>;
        })}
      </div>
    </div>
  );
};

export default TimeSelector;
