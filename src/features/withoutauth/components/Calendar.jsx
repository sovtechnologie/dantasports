import React, { useState } from 'react';
import './Stylesheets/Calendar.css';
import {
  format,
  startOfWeek,
  addDays,
  subWeeks,
  addWeeks,
  isToday,
  isBefore,
  startOfDay,
} from 'date-fns';

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = startOfDay(new Date());
  const startWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startWeek, i);
    return {
      day: format(date, 'd'),
      label: format(date, 'EEE'),
      fullDate: date,
      isToday: isToday(date),
      isPast: isBefore(date, today),
    };
  });

  const prevWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const nextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevWeek}>&lt;</button>
        <span>{format(currentWeek, 'MMMM')}</span>
        <button onClick={nextWeek}>&gt;</button>
      </div>

      <div className="calendar-week">
        {weekDays.map(({ day, label, fullDate, isToday, isPast }) => {
          const isSelected =
            format(fullDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

          return (
            <div
              key={label}
              className={`calendar-day 
                ${isSelected ? 'active' : ''} 
                ${isToday ? 'today' : ''} 
                ${isPast ? 'disabled' : ''}`}
              onClick={() => !isPast && setSelectedDate(fullDate)}
            >
              <div className="calendar-day-number">{day}</div>
              <div className="calendar-day-label">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;






// const venueData = [
//     {
//         name: 'Red Meadows',
//         sport: 'Cricket',
//         availableDates: {
//             '2025-06-12': ['11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM'],
//         },
//         location: 'Adbor bypass road (~0.7 km)',
//         rating: '4.0',
//         offer: 'Upto 50% off',
//         price: '1000 onwards',
//         image: 'https://img.icons8.com/ios-filled/100/cricket.png'
//     },
    
// ];

// const sportsList = [
//     'Football', 'Cricket', 'Tennis', 'Badminton', 'Basketball'
// ];




// function SportsCarousel({ selectedSport, setSelectedSport }) {
//     return (
//         <div className="sports-carousel-wrapper">
//             <div className="sports-carousel">
//                 {sportsList.map((sport, idx) => (
//                     <button
//                         key={idx}
//                         className={`sport-button ${selectedSport === sport ? 'selected' : ''}`}
//                         onClick={() => setSelectedSport(sport)}
//                     >
//                         <img src={`https://img.icons8.com/ios-filled/50/${sport.toLowerCase()}.png`} alt={sport} />
//                         <span>{sport}</span>
//                     </button>
//                 ))}
//             </div>
//         </div>
//     );
// }

// function Calendar({ selectedDate, setSelectedDate }) {
//     const today = startOfDay(new Date());
//     const startWeek = startOfWeek(today, { weekStartsOn: 1 });
//     const days = Array.from({ length: 7 }).map((_, i) => addDays(startWeek, i));

//     return (
//         <div className="calendar">
//             {days.map((date, idx) => {
//                 const formatted = format(date, 'yyyy-MM-dd');
//                 return (
//                     <div
//                         key={idx}
//                         className={`calendar-day ${selectedDate === formatted ? 'selected' : ''}`}
//                         onClick={() => setSelectedDate(formatted)}
//                     >
//                         <div>{format(date, 'd')}</div>
//                         <div>{format(date, 'EEE')}</div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// function TimeSlots({ selectedTime, setSelectedTime, times }) {
//     return (
//         <div className="time-slots">
//             {times.map((time, idx) => (
//                 <button
//                     key={idx}
//                     className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
//                     onClick={() => setSelectedTime(time)}
//                 >
//                     {time}
//                 </button>
//             ))}
//             <div className="timeline">
//                 {times.map((time, idx) => (
//                     <div
//                         key={idx}
//                         className={`line-segment ${selectedTime === time ? 'selected' : 'available'}`}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     );
// }