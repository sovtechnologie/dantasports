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
    endDateProp, }) => {
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
        if (!startDateProp || !endDateProp) return [];
        const interval = {
            start: startOfDay(toZonedTime(startDateProp, timeZone)),
            end: startOfDay(toZonedTime(endDateProp, timeZone)),
        };
        return eachDayOfInterval(interval).map((d) => {
            const z = toZonedTime(d, timeZone);
            return {
                full: z,
                day: format(z, 'd'),
                monthLabel: format(z, 'MMM'),
                isPast: isBefore(z, todayZoned),
            };
        });
    }, [startDateProp, endDateProp, timeZone]);

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
            <div><p>Select any date to continue</p></div>
        </>
    )
}