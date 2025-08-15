import React, { useEffect, useState } from 'react';
import {
  format,
  addDays,
  subDays,
  isToday,
  isBefore,
  startOfDay,
  isSameDay,
  getYear,
  getMonth,
  setMonth,
  setYear,
  eachMonthOfInterval,
  startOfYear,
  startOfMonth,
  endOfMonth,
  endOfYear,
  addYears,
  subYears,
  isAfter
} from 'date-fns';
import "./Stylesheets/MyCalandar.css";

const DeskTopFilterCalendar = ({ selectedDate, onDateChange }) => {
  const [currentDate, setCurrentDate] = useState(startOfDay(new Date()));
  // const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [viewMode, setViewMode] = useState('days'); // 'days', 'months', 'years'
  const today = startOfDay(new Date());

  // Prevent selecting past dates
  const handleDateSelection = (date) => {
    if (!isBefore(date, today)) {
      onDateChange(date);
    }
  };

 

  // Prevent navigating to months/years where all dates would be in the past
  const handleMonthSelection = (month) => {
    const newDate = setMonth(currentDate, getMonth(month));
    if (!isBefore(endOfYear(newDate), today)) {
      setCurrentDate(startOfMonth(newDate));
      // setSelectedDate(setMonth(selectedDate, getMonth(month)));
      setViewMode('days');
    }
  };

  const handleYearSelection = (year) => {
    const newDate = setYear(currentDate, year);
    if (!isBefore(endOfYear(newDate), today)) {
      setCurrentDate(newDate);
      // setSelectedDate(setYear(selectedDate, year));
      setViewMode('months');
    }
  };

  // Date navigation - prevent navigating to past periods
  const prevPeriod = () => {
    if (viewMode === 'days') {
      const newDate = subDays(currentDate, 5);
      if (!isBefore(addDays(newDate, 4), today)) {
        setCurrentDate(newDate);
      }
    } else if (viewMode === 'months') {
      setCurrentDate(subYears(currentDate, 1));
    } else {
      setCurrentDate(subYears(currentDate, 12));
    }
  };

  const nextPeriod = () => {
    if (viewMode === 'days') {
      setCurrentDate(addDays(currentDate, 5));
    } else if (viewMode === 'months') {
      setCurrentDate(addYears(currentDate, 1));
    } else {
      setCurrentDate(addYears(currentDate, 12));
    }
  };

  // Generate days view (5 days)
  const renderDays = () => {
    const days = Array.from({ length: 5 }).map((_, i) => {
      const date = addDays(currentDate, i);
      return {
        date,
        day: format(date, 'd'),
        label: format(date, 'EEE'),
        isToday: isToday(date),
        isPast: isBefore(date, today),
      };
    });

    return (
      <div className="days-grid">
        {days.map((day) => (
          <div
            key={day.date.toString()}
            className={`day-cell 
              ${isSameDay(day.date, selectedDate) ? 'selected' : ''}
              ${day.isToday ? 'today' : ''}
              ${day.isPast ? 'past' : ''}`}
            onClick={() => handleDateSelection(day.date)}
          >
            <div className="day-number">{day.day}</div>
            <div className="day-label">{day.label}</div>
          </div>
        ))}
      </div>
    );
  };

  // Generate months view - disable months where all dates are in the past
  const renderMonths = () => {
    const months = eachMonthOfInterval({
      start: startOfYear(currentDate),
      end: endOfYear(currentDate),
    });

    return (
      <div className="months-grid">
        {months.map((month) => {
          const isAllPast = isBefore(endOfMonth(month), today);
          return (
            <div
              key={month.toString()}
              className={`month-cell 
                ${getMonth(month) === getMonth(selectedDate) ? 'selected' : ''}
                ${isAllPast ? 'disabled' : ''}`}
              onClick={() => !isAllPast && handleMonthSelection(month)}
            >
              {format(month, 'MMM')}
            </div>
          );
        })}
      </div>
    );
  };

  // Generate years view - disable years where all dates are in the past
  const renderYears = () => {
    const currentYear = getYear(currentDate);
    const years = Array.from({ length: 12 }, (_, i) => currentYear - 6 + i);

    return (
      <div className="years-grid">
        {years.map((year) => {
          const yearDate = new Date(year, 0, 1);
          const isAllPast = isBefore(endOfYear(yearDate), today);
          return (
            <div
              key={year}
              className={`year-cell 
                ${year === getYear(selectedDate) ? 'selected' : ''}
                ${isAllPast ? 'disabled' : ''}`}
              onClick={() => !isAllPast && handleYearSelection(year)}
            >
              {year}
            </div>
          );
        })}
      </div>
    );
  };

  // Header title based on view mode
  const getHeaderTitle = () => {
    switch (viewMode) {
      case 'days':
        return format(currentDate, 'MMMM ');
      case 'months':
        return getYear(currentDate);
      case 'years':
        return `${getYear(currentDate) - 6} - ${getYear(currentDate) + 5}`;
      default:
        return '';
    }
  };
 useEffect(() => {
    // console.log("Selected Date:", format(selectedDate, 'yyyy-MM-dd'));
  }, [selectedDate]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevPeriod}>&lt;</button>
        <div 
          className="header-title"
          onClick={() => {
            if (viewMode === 'days') setViewMode('months');
            else if (viewMode === 'months') setViewMode('years');
          }}
        >
          {getHeaderTitle()}
        </div>
        <button onClick={nextPeriod}>&gt;</button>
      </div>

      <div className="calendar-body">
        {viewMode === 'days' && renderDays()}
        {viewMode === 'months' && renderMonths()}
        {viewMode === 'years' && renderYears()}
      </div>
    </div>
  );
};

// export default DeskTopFilterCalendar;
export default React.memo(DeskTopFilterCalendar); 






















// import React, { useState } from 'react';
// import './Stylesheets/MyCalandar.css';
// import {
//   format,
//   addDays,
//   isToday,
//   isBefore,
//   startOfDay,
//   isSameDay,
//   subDays,
//   startOfMonth,
//   getMonth,
//   getYear,
//   setMonth,
//   setYear,
//   eachMonthOfInterval,
//   startOfYear,
//   endOfYear
// } from 'date-fns';

// const MyCalendar = () => {
//   const [currentStartDate, setCurrentStartDate] = useState(startOfDay(new Date()));
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showMonthPicker, setShowMonthPicker] = useState(false);
//   const today = startOfDay(new Date());
  
//   // Get 5 days starting from currentStartDate (Monday to Friday)
//   const visibleDays = Array.from({ length: 5 }).map((_, i) => {
//     const date = addDays(currentStartDate, i);
//     return {
//       day: format(date, 'd'),
//       label: format(date, 'EEE'),
//       fullDate: date,
//       isToday: isToday(date),
//       isPast: isBefore(date, today),
//     };
//   });

//   // Navigation functions - move by 5 days
//   const prevBlock = () => setCurrentStartDate(subDays(currentStartDate, 5));
//   const nextBlock = () => setCurrentStartDate(addDays(currentStartDate, 5));

//   // Get all months of current year for month picker
//   const currentYear = getYear(currentStartDate);
//   const months = eachMonthOfInterval({
//     start: startOfYear(new Date(currentYear, 0, 1)),
//     end: endOfYear(new Date(currentYear, 0, 1))
//   });

//   // Handle month selection
//   const selectMonth = (month) => {
//     const newDate = setMonth(setYear(currentStartDate, currentYear), getMonth(month));
//     setCurrentStartDate(startOfMonth(newDate));
//     setShowMonthPicker(false);
//   };

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <button onClick={prevBlock}>&lt;</button>
//         <span 
//           className="month-display" 
//           onClick={() => setShowMonthPicker(!showMonthPicker)}
//         >
//           {format(currentStartDate, 'MMMM yyyy')}
//         </span>
//         <button onClick={nextBlock}>&gt;</button>
//       </div>

//       {showMonthPicker && (
//         <div className="month-picker">
//           <div className="month-picker-header">{currentYear}</div>
//           <div className="month-grid">
//             {months.map((month) => (
//               <div
//                 key={month.toString()}
//                 className={`month-item ${
//                   getMonth(currentStartDate) === getMonth(month) ? 'selected' : ''
//                 }`}
//                 onClick={() => selectMonth(month)}
//               >
//                 {format(month, 'MMM')}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="calendar-week-wrapper">
//         <div className="calendar-week">
//           {visibleDays.map(({ day, label, fullDate, isToday, isPast }) => {
//             const isSelected = isSameDay(fullDate, selectedDate);

//             return (
//               <div
//                 key={fullDate.toString()}
//                 className={`calendar-day 
//                   ${isSelected ? 'active' : ''} 
//                   ${isToday ? 'today' : ''} 
//                   ${isPast ? 'disabled' : ''}`}
//                 onClick={() => !isPast && setSelectedDate(fullDate)}
//               >
//                 <div className="calendar-day-number">{day}</div>
//                 <div className="calendar-day-label">{label}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCalendar;