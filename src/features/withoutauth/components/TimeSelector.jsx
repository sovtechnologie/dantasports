import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import './Stylesheets/TimeSelector.css';
import { useSportDetails } from '../../../hooks/favouriteSport/useSportDetails.js';
import { useFetchTimeslotForVenue } from '../../../hooks/VenueList/useFetchTimingSlots.js';
import TimeslotShimmer from "./Shimmer/TimeslotShimmer.jsx";
import { useCreateVenueBooking } from '../../../hooks/BookingVenue/useCreateVenueBooking.js';
import LoginModal from '../../auth/components/loginModal.jsx';

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};


const getLocalIsoDate = date => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
};

const generateTimeSlots = (start, end, interval) => {
  const slots = [];
  let current = new Date(start);
  while (current < end) {
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

// Overlap check for two [start, end) intervals
const isOverlap = (startA, endA, startB, endB) => {
  return startA < endB && endA > startB;
};

const TimeSelector = ({
  selectedDate,
  selectedDuration,
  setSelectedDuration,
  selectedTime,
  setSelectedTime,
  sportId,
  venueId,
  selectedPitch,
  setSelectedPitch,
  courtError,
  bookingId,
  setBookingId
}) => {
  const isLoggedIn = Boolean(Cookies.get('token'));
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const payload = {
    date: getLocalIsoDate(selectedDate),
    sportsId: sportId,
    venueId: venueId
  };


  const {
    data: timeslotData,
    isLoading: timeslotLoading,
    isError: timeslotError,
    error: timeslotMessage
  } = useFetchTimeslotForVenue(payload);

  const slottime = timeslotData?.result[0] || {};
  console.log("timeslotData", slottime?.end_time);
  const { start_time = '00:00:00', end_time = '00:00:00' } = slottime;


  const { data, isLoading, error } = useSportDetails({ sportId, venueId });
  const sport = data?.result?.[0] || {};

  const {
    minimum_booking_duration = 0,
    slots_duration = 0,
    courts = []
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
    // console.log("slecte duration ,diffHr");
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
      setSelectedTime(null);
      return;
    }
    // 🆕 Reset selected court when switching times
    setSelectedPitch(null);

    setSelectedTime(slot);
    setSelectedDuration(slotMinDurationHr);
  }, [selectedDate, setSelectedTime, setSelectedDuration, slotMinDurationHr]);



  useEffect(() => {
    if (!sportId) {
      setSelectedDuration(0);
      setSelectedTime(null);
    }
  }, [sportId, setSelectedDuration, setSelectedTime]);

  // === Extract booking array from API result ===
  const bookingArray = useMemo(
    () => timeslotData?.result?.[0]?.booking_Time || [],
    [timeslotData]
  );
  // === Filter available courts for current [selectedTime, selectedTime+duration] ===
  const availableCourtsForSelectedTime = useMemo(() => {
    if (!selectedTime || !Array.isArray(courts) || courts.length === 0) return [];

    const slotStart = selectedTime;
    const durationInMs = (selectedDuration || slotMinDurationHr) * 60 * 60 * 1000;
    const slotEnd = new Date(slotStart.getTime() + durationInMs);

    return courts.filter((court) => {
      // True = court is booked for this slot, so we want those that are NOT booked
      const isBooked = bookingArray.some((booking) => {
        if (booking.court_id !== court.id) return false;
        // Optionally only block on status === 1 (if desired)
        // if (booking.status !== 1) return false;

        const bookingStart = parseTime(new Date(selectedDate), booking.start_time.split('.')[0]);
        const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60 * 1000);

        return isOverlap(slotStart, slotEnd, bookingStart, bookingEnd);
      });
      return !isBooked;
    });
  }, [selectedTime, selectedDuration, courts, bookingArray, selectedDate, slotMinDurationHr]);

  const {
    mutate: createBooking,
    isLoading: bookingLoading,
    error: bookingError
  } = useCreateVenueBooking();
  const timeRead = selectedTime?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const bookVenue = (courtId) => {

    if (!isLoggedIn) {
      // alert('Please log in to proceed.')
      setShowLoginModal(true);
      return;
    }
    setSelectedPitch(courtId);

    const bookingPayload = {
      sportId: sportId,
      venueId: venueId,
      date: getLocalIsoDate(selectedDate),
      startTime: timeRead,
      duration: selectedDuration * 60,
      courtId: courtId,
    };

    createBooking(bookingPayload, {
      onSuccess: (data) => {
        const id = data?.result?.insertId;
        setBookingId(id);
        // setBookingId(data?.result?.insertId);
        console.log("My Booking Id", data?.result?.insertId);
      },
      onError: (error) => alert('Booking failed. ' + (error.message || '')),
    });
  }
  console.log("bookingid", bookingId);


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


        {sportId ? (
          <div className="ts-slots">
            {timeSlots?.map((slot, index) => {
              const slotStart = slot;
              const slotDurationMs = slotMinDurationHr * 60 * 60 * 1000;
              const slotEnd = new Date(slotStart.getTime() + slotDurationMs);


              // Check if ALL courts are booked for this [slotStart, slotEnd)
              const allCourtsBooked =
                Array.isArray(courts) && courts.length > 0 &&
                courts?.every((court) =>
                  bookingArray.some((booking) => {
                    if (booking.court_id !== court.id) return false;
                    // Only mark as booked if this slot's minimal duration is unavailable!
                    const bookingStart = parseTime(
                      new Date(selectedDate),
                      booking.start_time.split('.')[0]
                    );
                    const bookingEnd = new Date(
                      bookingStart.getTime() + booking.duration * 60 * 1000
                    );
                    return isOverlap(slotStart, slotEnd, bookingStart, bookingEnd);
                  })
                );



              const isSelected = selectedTime?.getTime() === slotStart.getTime();

              return (
                <button
                  key={index}
                  disabled={allCourtsBooked}
                  className={`ts-slot${isSelected ? ' active' : ''}`}
                  style={{
                    backgroundColor: isSelected
                      ? "#007bff"
                      : allCourtsBooked
                        ? "red"
                        : "",
                    color: allCourtsBooked ? "white" : isSelected ? "white" : "black"
                  }}
                  onClick={() => !allCourtsBooked && handleTimeClick(slotStart)}
                >
                  {slotStart.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </button>
              );
            })}
          </div>

        ) : (
          <p>Select a sport to see available slots</p>
        )}
        <div>{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}</div>
        {courtError.time && <p className="form-error">{courtError.time}</p>}
      </div>

      <div className="vb-section vb-pitch-options">
        <label>Court:</label>

        {selectedTime ? (
          availableCourtsForSelectedTime.length > 0 ? (
            availableCourtsForSelectedTime.map(court => (
              <button
                key={court.id}
                type="button"
                className={`vb-pitch-btn ${selectedPitch === court.id ? 'active' : ''}`}
                onClick={() => bookVenue(court.id)}
              >
                {court.court_name}
              </button>
            ))
          ) : (
            <p>No courts available for this sport/date.</p>
          )
        ) : (
          <p className="court-placeholder">Select a timeslots to see available courts</p>
        )}

        {courtError.court && <p className="form-error">{courtError.court}</p>}

        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>

    </>
  );
};

export default TimeSelector;





























