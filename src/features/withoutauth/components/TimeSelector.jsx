import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './Stylesheets/TimeSelector.css';
import { useSportDetails } from '../../../hooks/favouriteSport/useSportDetails.js';
import { useFetchTimeslotForVenue } from '../../../hooks/VenueList/useFetchTimingSlots.js';
import TimeslotShimmer from "./Shimmer/TimeslotShimmer.jsx";

const generateTimeSlots = (start, end, interval) => {
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

const TimeSelector = ({
  selectedDate,
  selectedDuration,
  setSelectedDuration,
  selectedTime,
  setSelectedTime,
  sportId = null,
  venueId
}) => {

  const payload = {
    date: "2025-08-14",
    sportsId: 2,
    venueId: 1
  };

  const {
    data: timeslotData,
    isLoading: timeslotLoading,
    isError: timeslotError,
    error:timeslotMessage
  } =  useFetchTimeslotForVenue(payload);
  console.log("timeslots",timeslotData?.result[0]);



  const { data, isLoading, error } = useSportDetails(sportId);
  const sport = data?.result?.[0] || {};

  // const [timeSlots, setTimeSlots] = useState([]);
  const {
    minimum_booking_duration = 0,
    from_time = '00:00:00',
    end_time = '00:00:00',
    slots_duration = 0
  } = sport;

  const slotMinDurationHr = minimum_booking_duration / 60;
  const slotDurationHr = slots_duration / 60;
  const interval = slots_duration;

  const timeSlots = useMemo(() => {
    if (!selectedDate || !interval) return [];
    const base = new Date(selectedDate);
    const now = new Date();
    const isToday = now.toDateString() === base.toDateString();

    const start = parseTime(base, from_time);
    const end = parseTime(base, end_time);
    if (isToday && start < now) {
      start.setHours(
        now.getHours(),
        Math.ceil(now.getMinutes() / interval) * interval,
        0,
        0
      );
    }
    return generateTimeSlots(start, end, interval);
  }, [selectedDate, from_time, end_time, interval]);

  const getMaxDuration = useCallback(() => {
    if (!selectedTime || !end_time) return slotMinDurationHr;
    const [eh, em] = end_time.split(':').map(Number);
    const end = new Date(selectedTime);
    end.setHours(eh, em, 0, 0);
    const diffHr = (end - selectedTime) / (1000 * 60 * 60);
    console.log("slecte duration ,diffHr");
    const diff = diffHr / slotMinDurationHr;
    return diff * slotMinDurationHr;
  }, [selectedTime, end_time, slotMinDurationHr]);

  const handleDuration = useCallback((delta) => {
    if (!selectedTime) {
      alert("Please select a timeslot first.");
      return;
    }
    const max = getMaxDuration();
    setSelectedDuration(prev => {
      const next = prev + delta;
      if (next < slotMinDurationHr) return slotMinDurationHr;
      if (next > max) return max;
      return next;
    });
  }, [selectedTime, getMaxDuration, setSelectedDuration, slotMinDurationHr]);

  const handleTimeClick = useCallback((slot) => {
    setSelectedTime(slot);
    setSelectedDuration(slotMinDurationHr);
  }, [setSelectedTime, setSelectedDuration, slotMinDurationHr]);

  useEffect(() => {
    if (!sportId) {
      setSelectedDuration(0);
      setSelectedTime(null);
    }
  }, [sportId, setSelectedDuration, setSelectedTime]);


  if (isLoading) return <div><TimeslotShimmer /></div>;
  if (error) return <div>Error loading sport details</div>;

  // const { data: sportDetails, isLoading: sportDetailsLoading, error: sportDetailsError } = useSportDetails(sportId);
  // if (sportDetails && sportDetails.result) {
  //   console.log("Sport Details in timeSlectore:", sportDetails.result[0]);
  // }

  // const sportDetailsData = sportDetails?.result ? sportDetails.result[0] : null;

  // console.log("sportDetailsData", sportDetailsData)

  // const slotMinDurationMin = sportDetailsData?.minimum_booking_duration ?? 0;
  // const slotMinDurationHr = slotMinDurationMin / 60;



  // Define default time range (e.g., 6:00 AM to 10:00 PM)
  // const fromTime = sportDetailsData?.from_time || '00:00:00';
  // const toTime = sportDetailsData?.end_time || '00:00:00';
  // const interval = sportDetailsData?.slots_duration ?? 0;
  // const slotDurationHr = interval / 60;

  // console.log("after click sport interval is:", interval);

  // const [fromH, fromM] = fromTime.split(":").map(Number);
  // const [toH, toM] = toTime.split(":").map(Number);
  // const totalAvailableHr = ((toH * 60 + toM) - (fromH * 60 + fromM)) / 60;

  // // const minDuration = slotDurationHr;  // updated to match minimum interval
  // // const maxDuration = totalAvailableHr;

  // const getMaxDuration = () => {
  //   if (!selectedTime || !sportDetailsData?.end_time) return 5;

  //   const [endHour, endMin] = sportDetailsData.end_time.split(':').map(Number);
  //   const endTime = new Date(selectedTime);
  //   endTime.setHours(endHour, endMin, 0, 0);

  //   const diffMs = endTime - selectedTime;
  //   const diffHr = diffMs / (1000 * 60 * 60);
  //   const roundedDown = Math.floor(diffHr / slotDurationHr) * slotDurationHr;

  //   return roundedDown;
  // };



  // const handleDuration = (delta) => {
  //   if (!selectedTime) {
  //     alert("Please select a timeslot first.");
  //     return;
  //   }

  //   const dynamicMax = getMaxDuration();

  //   setSelectedDuration(prev => {
  //     const next = prev + delta;
  //     if (next < slotDurationHr) return slotDurationHr;
  //     if (next > dynamicMax) return dynamicMax;
  //     return next;
  //   });
  // };


  // const handleTimeClick = (slot) => {
  //   setSelectedTime(slot);
  //   setSelectedDuration(slotMinDurationHr);
  // };

  // useEffect(() => {
  //   if (!selectedDate || !interval) return;

  //   const now = new Date();
  //   const date = new Date(selectedDate);
  //   const isToday = now.toDateString() === date.toDateString();

  //   const start = parseTime(date, fromTime);
  //   const end = parseTime(date, toTime);

  //   if (isToday && start < now) {
  //     start.setHours(now.getHours(), Math.ceil(now.getMinutes() / interval) * interval, 0, 0);
  //   }

  //   setTimeSlots(generateTimeSlots(start, end, interval));
  // }, [selectedDate, fromTime, toTime, interval]);


  // if (sportDetailsLoading) return <div>Loading sport details...</div>;
  // if (sportDetailsError) return <div>Error loading sport details</div>;

  return (
    <div className="ts-wrapper">
      <div className="ts-header">
        <div className="ts-time">
          <span>Time:</span>
          <input value={selectedTime ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'} disabled />
        </div>

        <div className="ts-control">
          <span>Duration:</span>
          <div className='ts-button'>
            <button onClick={() => handleDuration(-slotDurationHr)} disabled={!selectedTime}>-</button>
            <span>{selectedDuration} hr</span>
            <button onClick={() => handleDuration(slotDurationHr)} disabled={!selectedTime}>+</button>
          </div>

        </div>

      </div>



      {sportId ? (<div className="ts-slots">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`ts-slot ${selectedTime?.getTime() === slot.getTime() ? 'active' : ''}`}
            onClick={() => handleTimeClick(slot)}
          >
            {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </button>
        ))}
      </div>) : (
        <p>Select a sport to see available slots</p>
      )}


    </div>
  );
};

export default TimeSelector;
