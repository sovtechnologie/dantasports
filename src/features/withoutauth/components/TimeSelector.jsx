import React, { useState, useEffect } from 'react';
import './Stylesheets/TimeSelector.css';
import { useSportDetails } from '../../../hooks/favouriteSport/useSportDetails.js';

const generateTimeSlots = (start, end, interval = 30) => {
  const slots = [];
  let current = new Date(start);
  while (current <= end) {
    slots.push(new Date(current));
    current.setMinutes(current.getMinutes() + interval);
  }
  return slots;
};


// Helper: Parse "HH:mm:ss" string into a Date on a given base date
const parseTime = (baseDate, timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, seconds || 0, 0);
  return date;
};

const TimeSelector = ({ selectedDate, selectedDuration, setSelectedDuration, selectedTime, setSelectedTime, sportId }) => {
  // const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedDuration, setSelectedDuration] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);


  const { data: sportDetails, isLoading: sportDetailsLoading, error: sportDetailsError } = useSportDetails(sportId);
  if (sportDetails && sportDetails.result) {
    console.log("Sport Details in timeSlectore:", sportDetails.result[0]);
  }

  const sportDetailsData = sportDetails?.result ? sportDetails.result[0] : null;

  const slotDurationMin = sportDetailsData?.slots_duration || 60;
  const slotDurationHr = slotDurationMin / 60;

  const fromTime = sportDetailsData?.from_time || "06:00:00";
  const toTime = sportDetailsData?.to_time || "22:00:00";

  const [fromH, fromM] = fromTime.split(":").map(Number);
  const [toH, toM] = toTime.split(":").map(Number);
  const totalAvailableHr = ((toH * 60 + toM) - (fromH * 60 + fromM)) / 60;

  // const minDuration = slotDurationHr;  // updated to match minimum interval
  // const maxDuration = totalAvailableHr;

  const getMaxDuration = () => {
    if (!selectedTime || !sportDetailsData?.end_time) return 5;

    const [endHour, endMin] = sportDetailsData.end_time.split(':').map(Number);
    const endTime = new Date(selectedTime);
    endTime.setHours(endHour, endMin, 0, 0);

    const diffMs = endTime - selectedTime;
    const diffHr = diffMs / (1000 * 60 * 60);
    const roundedDown = Math.floor(diffHr / slotDurationHr) * slotDurationHr;

    return roundedDown;
  };



  const handleDuration = (delta) => {
    if (!selectedTime) {
      alert("Please select a timeslot first.");
      return;
    }

    const dynamicMax = getMaxDuration();

    setSelectedDuration(prev => {
      const next = prev + delta;
      if (next < slotDurationHr) return slotDurationHr;
      if (next > dynamicMax) return dynamicMax;
      return next;
    });
  };


  const handleTimeClick = (slot) => {
    setSelectedTime(slot);
    setSelectedDuration(slotDurationHr);
  };

  useEffect(() => {
    if (!selectedDate) return;

    const now = new Date();
    const date = new Date(selectedDate);
    const isToday = now.toDateString() === date.toDateString();
    // const start = new Date(date);
    // const end = new Date(date);

    // Define default time range (e.g., 6:00 AM to 10:00 PM)
    const fromTime = sportDetailsData?.from_time || '06:00:00';
    const toTime = sportDetailsData?.to_time || '22:00:00';
    const interval = sportDetailsData?.slots_duration || 60;

    const start = parseTime(date, fromTime);
    const end = parseTime(date, toTime);

    // Check if selected date is today


    // Set dynamic or static start time
    if (isToday && start < now) {
      start.setHours(now.getHours(), Math.ceil(now.getMinutes() / interval) * interval, 0, 0);
    }

    setTimeSlots(generateTimeSlots(start, end, interval));
  }, [selectedDate]);

  // if (sportDetailsLoading) return <div>Loading sport details...</div>;
  if (sportDetailsError) return <div>Error loading sport details</div>;

  return (
    <div className="ts-wrapper">
      <div className="ts-header">
        <div className="ts-control">
          <span>Duration:</span>
          <div className='ts-button'>
            <button onClick={() => handleDuration(-slotDurationHr)} disabled={!selectedTime}>-</button>
            <span>{selectedDuration.toFixed(1)} hr</span>
            <button onClick={() => handleDuration(slotDurationHr)} disabled={!selectedTime}>+</button>
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
          // const slotTime = slot.getTime();
          // const selectedStart = selectedTime?.getTime();
          // const selectedEnd = selectedStart + selectedDuration * 3600000;

          let color = 'green';
          // if (selectedTime && slotTime >= selectedStart && slotTime < selectedEnd) {
          //   color = 'red';
          // }

          return <div key={i} className="ts-segment" style={{ backgroundColor: color }}></div>;
        })}
      </div>
    </div>
  );
};

export default TimeSelector;
