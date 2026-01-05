import "./Stylesheets/EventCalandar.css"
import {
    format,
    addDays,
    subDays,
    isBefore,
    startOfDay,
    isSameDay,
    eachDayOfInterval
} from 'date-fns';
import {
    toZonedTime,
    getTimezoneOffset
} from 'date-fns-tz';
import { useMemo, useState } from "react";
export const EventCalandar = ({ selectedDate, setSelectedDate, startDateProp,
    endDateProp, eventCalendar,
    eventDates = [], }) => {
    console.log(startDateProp,
        endDateProp)
    const timeZone = 'Asia/Kolkata';
    const today = new Date();
    const todayZoned = startOfDay(toZonedTime(today, timeZone));
    const [startDate, setStartDate] = useState(startOfDay(todayZoned));

    // Generate days in IST
    // const weekDays = Array.from({ length: 5 }).map((_, i) => {
    //     const date = addDays(startDate, i);
    //     const zonedDate = toZonedTime(date, timeZone);
    //     const dayStr = format(zonedDate, 'd');
    //     const label = format(zonedDate, 'EEE');
    //     const todayStr = format(todayZoned, 'yyyy-MM-dd');
    //     const thisStr = format(zonedDate, 'yyyy-MM-dd');

    //     return {
    //         full: zonedDate,
    //         day: dayStr,
    //         label,
    //         isToday: thisStr === todayStr,
    //         isPast: isBefore(zonedDate, todayZoned)
    //     };
    // });

    const dayList = useMemo(() => {
        // 🔹 CASE 1: event_calendar === 2 → event_dates array
        if (eventCalendar === 2) {
            return eventDates
                .map((item) => {
                    const z = startOfDay(toZonedTime(new Date(item.dates), timeZone));
                    return {
                        full: z,
                        day: format(z, "d"),
                        monthLabel: format(z, "MMM"),
                        isPast: isBefore(z, todayZoned),
                    };
                })
                .filter((d) => !d.isPast); // ❌ past remove
        }

        // 🔹 CASE 2: start & end date (existing logic)
        if (!startDateProp || !endDateProp) return [];

        return eachDayOfInterval({
            start: startOfDay(toZonedTime(startDateProp, timeZone)),
            end: startOfDay(toZonedTime(endDateProp, timeZone)),
        })
            .map((d) => {
                const z = toZonedTime(d, timeZone);
                return {
                    full: z,
                    day: format(z, "d"),
                    monthLabel: format(z, "MMM"),
                    isPast: isBefore(z, todayZoned),
                };
            })
            .filter((d) => !d.isPast); // ❌ past remove
    }, [eventCalendar, eventDates, startDateProp, endDateProp]);

    const monthLabel = format(startDate, 'MMM');
    return (
        <>
            <div className="Event-calendar-container">
                <div className="calendar-week">
                    {/* {weekDays.map(({ full, day, label, isToday, isPast }) => {
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
                })} */}
                    <div className="select-date"><p>Select any date to continue</p></div>
                    <div className="calendar">
                        {dayList.map(({ full, day, monthLabel, isPast }) => {
                            const isSelected = selectedDate
                                ? isSameDay(full, selectedDate)
                                : false;
                            return (
                                !isPast && (
                                    <div
                                        key={full.toISOString()}
                                        className={`calendar-day${isSelected ? ' active' : ''}`}
                                        onClick={() => setSelectedDate(full)}
                                    >
                                        <div className="calendar-day-number">{day}</div>
                                        <div className="calendar-day-label">{monthLabel}</div>
                                    </div>
                                )
                            );
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}