import React, { useState } from 'react';
import './Stylesheets/Calendar.css';
import {
  format,
  addDays,
  subDays,
  isToday,
  isBefore,
  startOfDay,
} from 'date-fns';

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const today = startOfDay(new Date());

  // Start date for rolling 7-day view
  const [startDate, setStartDate] = useState(today);

  // Generate 7 consecutive days starting from `startDate`
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    return {
      day: format(date, 'd'),
      label: format(date, 'EEE'),
      fullDate: date,
      isToday: isToday(date),
      isPast: isBefore(date, today),
    };
  });

  // Move the window forward or backward by 7 days
  const prevWeek = () => setStartDate(prev => subDays(prev, 7));
  const nextWeek = () => setStartDate(prev => addDays(prev, 7));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevWeek}>&lt;</button>
        <span>{format(startDate, 'MMMM')}</span>
        <button onClick={nextWeek}>&gt;</button>
      </div>

      <div className="calendar-week">
        {weekDays.map(({ day, label, fullDate, isToday, isPast }) => {
          const isSelected =
            format(fullDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');

          return (
            <div
              key={label + day}
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
