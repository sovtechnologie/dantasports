import React, { useState } from 'react';
import './Stylesheets/FilterCalendar.css';
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

const FilterCalendar = () => {
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

<div className="calendar-week-wrapper">
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
    </div>
  );
};

export default FilterCalendar;
