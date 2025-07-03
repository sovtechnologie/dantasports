import React, { useState } from 'react';
import './Stylesheets/Calendar.css';
import {
  format,
  addDays,
  subDays,
  isBefore,
  startOfDay,
  isSameDay
} from 'date-fns';
import {
  toZonedTime,
  getTimezoneOffset
} from 'date-fns-tz';

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const timeZone = 'Asia/Kolkata';
  const today = new Date();
  const todayZoned = startOfDay(toZonedTime(today, timeZone));
  const [startDate, setStartDate] = useState(startOfDay(todayZoned));

  // Generate days in IST
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(startDate, i);
    const zonedDate = toZonedTime(date, timeZone);
    const dayStr = format(zonedDate, 'd');
    const label = format(zonedDate, 'EEE');
    const todayStr = format(todayZoned, 'yyyy-MM-dd');
    const thisStr = format(zonedDate, 'yyyy-MM-dd');

    return {
      full: zonedDate,
      day: dayStr,
      label,
      isToday: thisStr === todayStr,
      isPast: isBefore(zonedDate, todayZoned)
    };
  });

  const prevWeek = () => setStartDate(d => subDays(d, 7));
  const nextWeek = () => setStartDate(d => addDays(d, 7));
  const monthLabel = format(startDate, 'MMMM');

  console.log("my selected data is", selectedDate);
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevWeek}>&lt;</button>
        <span>{monthLabel}</span>
        <button onClick={nextWeek}>&gt;</button>
      </div>
      <div className="calendar-week">
        {weekDays.map(({ full, day, label, isToday, isPast }) => {
          const isSelected = selectedDate ? isSameDay(full, selectedDate) : false;

          return (
            <div
              key={`${label}${day}`}
              className={`calendar-day${isSelected ? ' active' : ''}${isToday ? ' today' : ''}${isPast ? ' disabled' : ''}`}
              onClick={() => !isPast && setSelectedDate(full)}
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