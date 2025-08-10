import "./Stylesheets/EventCalandar.css"
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
import { useState } from "react";
export const EventCalandar = ({ selectedDate, setSelectedDate }) => {
    const timeZone = 'Asia/Kolkata';
    const today = new Date();
    const todayZoned = startOfDay(toZonedTime(today, timeZone));
    const [startDate, setStartDate] = useState(startOfDay(todayZoned));

    // Generate days in IST
    const weekDays = Array.from({ length: 5 }).map((_, i) => {
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

    const monthLabel = format(startDate, 'MMM');
    return (
        <>
        <div className="Event-calendar-container">
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
                            <div className="calendar-day-label">{monthLabel}</div>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="calender-text"><p>Select any date to continue</p></div>
        </>
    )
}