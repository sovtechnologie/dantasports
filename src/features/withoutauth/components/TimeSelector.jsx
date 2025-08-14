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
  const [hours, minutes, seconds] = timeStr?.split(':').map(Number);
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
  const[errorMessage,setErrorMessage] = useState("");
  const payload = {
    date: selectedDate,
    sportsId: sportId,
    venueId: venueId
  };

  const {
    data: timeslotData,
    isLoading: timeslotLoading,
    isError: timeslotError,
    error: timeslotMessage
  } = useFetchTimeslotForVenue(payload);
  console.log("timeslots", timeslotData?.result[0]);
  const slottime = timeslotData?.result?.[0] || {};

  const { start_time = '00:00:00', end_time = '00:00:00' } = slottime;

  const { data, isLoading, error } = useSportDetails(sportId);
  const sport = data?.result?.[0] || {};

  // const [timeSlots, setTimeSlots] = useState([]);
  const {
    minimum_booking_duration = 0,
    slots_duration = 0,
    courts
  } = sport;

  const slotMinDurationHr = minimum_booking_duration / 60;
  const slotDurationHr = slots_duration / 60;
  const interval = slots_duration;

  const timeSlots = useMemo(() => {
    if (!selectedDate || !interval) return [];
    const base = new Date(selectedDate);
    const now = new Date();
    const isToday = now.toDateString() === base.toDateString();

    const start = parseTime(base, start_time);
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
  }, [selectedDate, start_time, end_time, interval]);

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

  // const handleTimeClick = useCallback((slot) => {
  //   setSelectedTime(slot);
  //   setSelectedDuration(slotMinDurationHr);
  // }, [setSelectedTime, setSelectedDuration, slotMinDurationHr]);

  const cutoffHour = 23; // 11 PM
  const cutoffMinute = 0;

  const handleTimeClick = useCallback((slot) => {
    setErrorMessage('')
    if (!selectedDate) return; // safeguard

    const cutoff = new Date(selectedDate);
    cutoff.setHours(cutoffHour, cutoffMinute, 0, 0);

    // Calculate booking end time with minimum booking duration
    const bookingEnd = new Date(slot);
    bookingEnd.setHours(
      bookingEnd.getHours() + slotMinDurationHr,
      bookingEnd.getMinutes(),
      0,
      0
    );

    if (bookingEnd > cutoff) {
      setErrorMessage('Selected time exceeds daily cutoff (11:00 PM)')
      return;
    }

    setSelectedTime(slot);
    setSelectedDuration(slotMinDurationHr);
  }, [selectedDate, setSelectedTime, setSelectedDuration, slotMinDurationHr]);



  useEffect(() => {
    if (!sportId) {
      setSelectedDuration(0);
      setSelectedTime(null);
    }
  }, [sportId, setSelectedDuration, setSelectedTime]);


  if (isLoading) return <div><TimeslotShimmer /></div>;
  if (error) return <div>Error loading sport details</div>;

  return (
    <>
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



        {sportId ? (<>
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
        <div>{errorMessage && <p style={{ color:"red"}}>{errorMessage}</p>}</div></>
        ) : (
          <p>Select a sport to see available slots</p>
        )}


      </div>
    </>
  );
};

export default TimeSelector;


// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import './Stylesheets/TimeSelector.css';
// import { useSportDetails } from '../../../hooks/favouriteSport/useSportDetails.js';
// import { useFetchTimeslotForVenue } from '../../../hooks/VenueList/useFetchTimingSlots.js';
// import TimeslotShimmer from "./Shimmer/TimeslotShimmer.jsx";

// // Generate slots in [interval] min steps from start to end
// const generateTimeSlots = (start, end, interval) => {
//   const slots = [];
//   let current = new Date(start);
//   while (current <= end) {
//     slots.push(new Date(current));
//     current.setMinutes(current.getMinutes() + interval);
//   }
//   return slots;
// };

// // Parse "HH:mm:ss" as Date on given base date
// const parseTime = (baseDate, timeStr) => {
//   const [hours, minutes, seconds] = timeStr.split(':').map(Number);
//   const date = new Date(baseDate);
//   date.setHours(hours, minutes, seconds || 0, 0);
//   return date;
// };

// // Overlap check for two [start, end) intervals
// const isOverlap = (startA, endA, startB, endB) => {
//   return startA < endB && endA > startB;
// };

// const TimeSelector = ({
//   selectedDate,
//   selectedDuration,
//   setSelectedDuration,
//   selectedTime,
//   setSelectedTime,
//   sportId = null,
//   venueId,
// }) => {
//   const [selectedPitch, setSelectedPitch] = useState('');
//   const bookVenue = (courtId) => setSelectedPitch(courtId);

//   // --- API calls ---
//   const payload = {
//     date: "2025-08-14",  // dynamic!
//     sportsId: sportId,
//     venueId: venueId
//   };

//   const {
//     data: timeslotData,
//     isLoading: timeslotLoading,
//     isError: timeslotError,
//     error: timeslotMessage
//   } = useFetchTimeslotForVenue(payload);

//   const { data, isLoading, error } = useSportDetails(sportId);
//   const sport = data?.result?.[0] || {};

//   const {
//     minimum_booking_duration = 0,
//     from_time = '00:00:00',
//     end_time = '00:00:00',
//     slots_duration = 0,
//     courts = []
//   } = sport;

//   const slotMinDurationHr = minimum_booking_duration / 60;
//   const slotDurationHr = slots_duration / 60;
//   const interval = slots_duration;

//   // === Generate time slots dynamically ===
//   const timeSlots = useMemo(() => {
//     if (!selectedDate || !interval) return [];
//     const base = new Date(selectedDate);
//     const now = new Date();
//     const isToday = now.toDateString() === base.toDateString();

//     const start = parseTime(base, from_time);
//     const end = parseTime(base, end_time);
//     if (isToday && start < now) {
//       start.setHours(
//         now.getHours(),
//         Math.ceil(now.getMinutes() / interval) * interval,
//         0,
//         0
//       );
//     }
//     return generateTimeSlots(start, end, interval);
//   }, [selectedDate, from_time, end_time, interval]);

//   // === Handle max duration for time window ===
//   const getMaxDuration = useCallback(() => {
//     if (!selectedTime || !end_time) return slotMinDurationHr;
//     const [eh, em] = end_time.split(':').map(Number);
//     const end = new Date(selectedTime);
//     end.setHours(eh, em, 0, 0);
//     const diffHr = (end - selectedTime) / (1000 * 60 * 60);
//     const diff = diffHr / slotMinDurationHr;
//     return diff * slotMinDurationHr;
//   }, [selectedTime, end_time, slotMinDurationHr]);

//   // === Duration handlers ===
//   const handleDuration = useCallback(
//     (delta) => {
//       if (!selectedTime) {
//         alert("Please select a timeslot first.");
//         return;
//       }
//       const max = getMaxDuration();
//       setSelectedDuration((prev) => {
//         const next = prev + delta;
//         if (next < slotMinDurationHr) return slotMinDurationHr;
//         if (next > max) return max;
//         return next;
//       });
//     },
//     [selectedTime, getMaxDuration, setSelectedDuration, slotMinDurationHr]
//   );

//   // === Handle time slot click, set min duration ===
//   const handleTimeClick = useCallback(
//     (slot) => {
//       setSelectedTime(slot);
//       setSelectedDuration(slotMinDurationHr);
//       setSelectedPitch(''); // Reset court selection on slot change
//     },
//     [setSelectedTime, setSelectedDuration, slotMinDurationHr]
//   );

//   // Reset state on sportId change
//   useEffect(() => {
//     if (!sportId) {
//       setSelectedDuration(0);
//       setSelectedTime(null);
//     }
//   }, [sportId, setSelectedDuration, setSelectedTime]);

//   // === Extract booking array from API result ===
//   const bookingArray = useMemo(
//     () => timeslotData?.result?.[0]?.booking_Time || [],
//     [timeslotData]
//   );

//   // === Filter available courts for current [selectedTime, selectedTime+duration] ===
//   const availableCourtsForSelectedTime = useMemo(() => {
//     if (!selectedTime || !courts.length) return [];

//     const slotStart = selectedTime;
//     const durationInMs = (selectedDuration || slotMinDurationHr) * 60 * 60 * 1000;
//     const slotEnd = new Date(slotStart.getTime() + durationInMs);

//     return courts.filter((court) => {
//       // True = court is booked for this slot, so we want those that are NOT booked
//       const isBooked = bookingArray.some((booking) => {
//         if (booking.court_id !== court.id) return false;
//         // Optionally only block on status === 1 (if desired)
//         // if (booking.status !== 1) return false;

//         const bookingStart = parseTime(new Date(selectedDate), booking.start_time.split('.')[0]);
//         const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60 * 1000);

//         return isOverlap(slotStart, slotEnd, bookingStart, bookingEnd);
//       });
//       return !isBooked;
//     });
//   }, [selectedTime, selectedDuration, courts, bookingArray, selectedDate, slotMinDurationHr]);

//   // === LOADING, ERROR STATES ===
//   if (isLoading) return <div><TimeslotShimmer /></div>;
//   if (error) return <div>Error loading sport details</div>;

//   // === --- JSX START --- ===
//   return (
//     <>
//       <div className="ts-wrapper">
//         <div className="ts-header">
//           <div className="ts-time">
//             <span>Time:</span>
//             <input
//               value={
//                 selectedTime
//                   ? selectedTime.toLocaleTimeString([], {
//                       hour: '2-digit',
//                       minute: '2-digit'
//                     })
//                   : '--:--'
//               }
//               disabled
//               readOnly
//             />
//           </div>
//           <div className="ts-control">
//             <span>Duration:</span>
//             <div className='ts-button'>
//               <button
//                 onClick={() => handleDuration(-slotDurationHr)}
//                 disabled={!selectedTime}
//               >-</button>
//               <span>{selectedDuration} hr</span>
//               <button
//                 onClick={() => handleDuration(slotDurationHr)}
//                 disabled={!selectedTime}
//               >+</button>
//             </div>
//           </div>
//         </div>

//         {sportId ? (
//           <div className="ts-slots">
//             {timeSlots.map((slot, index) => {
//               const slotStart = slot;
//               const durationInMs = (selectedDuration || slotMinDurationHr) * 60 * 60 * 1000;
//               const slotEnd = new Date(slotStart.getTime() + durationInMs);

//               // Check if ALL courts are booked for this [slotStart, slotEnd)
//               const allCourtsBooked =
//                 courts.length > 0 &&
//                 courts.every((court) =>
//                   bookingArray.some((booking) => {
//                     if (booking.court_id !== court.id) return false;
//                     // Optionally only block on status === 1 (if desired)
//                     // if (booking.status !== 1) return false;
//                     const bookingStart = parseTime(
//                       new Date(selectedDate),
//                       booking.start_time.split('.')[0]
//                     );
//                     const bookingEnd = new Date(
//                       bookingStart.getTime() + booking.duration * 60 * 1000
//                     );
//                     return isOverlap(slotStart, slotEnd, bookingStart, bookingEnd);
//                   })
//                 );

//               const isSelected = selectedTime?.getTime() === slotStart.getTime();

//               return (
//                 <button
//                   key={index}
//                   disabled={allCourtsBooked}
//                   className={`ts-slot${isSelected ? ' active' : ''}`}
//                   style={{
//                     backgroundColor: isSelected
//                       ? "#007bff"
//                       : allCourtsBooked
//                       ? "red"
//                       : "lightgreen",
//                     color: allCourtsBooked ? "white" : isSelected ? "white" : "black"
//                   }}
//                   onClick={() => !allCourtsBooked && handleTimeClick(slotStart)}
//                 >
//                   {slotStart.toLocaleTimeString([], {
//                     hour: '2-digit',
//                     minute: '2-digit'
//                   })}
//                 </button>
//               );
//             })}
//           </div>
//         ) : (
//           <p>Select a sport to see available slots</p>
//         )}
//       </div>

//       <div className="vb-section vb-pitch-options">
//         <label>Court:</label>
//         {selectedTime ? (
//           availableCourtsForSelectedTime.length > 0 ? (
//             availableCourtsForSelectedTime.map((court) => (
//               <button
//                 key={court.id}
//                 type="button"
//                 className={`vb-pitch-btn${selectedPitch === court.id ? ' active' : ''}`}
//                 onClick={() => bookVenue(court.id)}
//               >
//                 {court.court_name}
//               </button>
//             ))
//           ) : (
//             <p>No courts available for this sport/date/time.</p>
//           )
//         ) : (
//           <p className="court-placeholder">
//             Select a timeslot to see available courts
//           </p>
//         )}
//       </div>
//     </>
//   );
// };

// export default TimeSelector;







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
