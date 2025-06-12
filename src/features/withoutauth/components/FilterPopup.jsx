import React, { useEffect, useRef, useState } from "react";
import "./Stylesheets/FilterPopup.css";
import Calendar from "./FilterCalendar";
import CancelIcon from "../assets/CancelIcon.png";
import FootballIcon from "../assets/Football.png";


const timeSlots = ["11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM"];

const sportsData = [
    { name: "Football", icon: FootballIcon },
    { name: "Tennis", icon: FootballIcon },
    { name: "Basketball", icon: FootballIcon },
    { name: "Badminton", icon: FootballIcon },
    { name: "Cricket", icon: FootballIcon },
    { name: "Volleyball", icon: FootballIcon },
    { name: "Badminton", icon: FootballIcon },
    { name: "Cricket", icon: FootballIcon },
    { name: "Volleyball", icon: FootballIcon },
];


const FilterPopup = ({ onClose }) => {
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedDay, setSelectedDay] = useState(19);
    const [selectedTime, setSelectedTime] = useState("11:30 AM");

    // const scrollRef = useRef();
    // let scrollInterval = useRef(null);

    // const startAutoScroll = () => {
    //     if (scrollRef.current) {
    //         scrollInterval.current = setInterval(() => {
    //             scrollRef.current.scrollLeft += 1.5;
    //         }, 10);
    //     }
    // };

    // const stopAutoScroll = () => {
    //     clearInterval(scrollInterval.current);
    // };

    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const itemWidth = 72; // estimated width (including margin/padding)
    const gap = 24;
    const visibleItems = 5; // Adjust based on screen size for responsiveness

    useEffect(() => {
        const scrollContainer = scrollRef.current;

        const handleScroll = () => {
            const index = Math.round(scrollContainer.scrollLeft / (itemWidth + gap));
            setActiveIndex(index);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    const totalDots = Math.ceil(sportsData.length / visibleItems);


    return (
        <div className="popup-overlay">
            <div className="popup-drawer">
                <div className="popup-header">
                    <h3>Filter</h3>
                    <button className="close-btn" onClick={onClose}><img src={CancelIcon} alt="cancel" /></button>
                </div>

                <div className="filter-section">

                    <h3 className="sports-title">Sports</h3>
                    <div className="search-box">
                        <input type="text" placeholder="Search" aria-label="Search sports" />
                    </div>

                    <div className="sports-scroll-wrapper" ref={scrollRef}>
                        <div className="sports-scroll">
                            {sportsData.map((sport, idx) => (
                                <div className="sport-item" key={idx}>
                                    <img src={sport.icon} alt={sport.name} />
                                    <span>{sport.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pagination-dots">
                        {Array.from({ length: totalDots }).map((_, i) => (
                            <span key={i} className={`dot ${i === 0 ? "active" : ""}`} />
                        ))}
                    </div>

                </div>

                <div className="filter-section">
                    <h4>Availability</h4>
                    <div className="weekdays">
                        <Calendar />
                    </div>

                    <div className="time-select">
                        <label>Time:</label>
                        <span className="selected-time">{selectedTime}</span>
                    </div>

                    <div className="timeslots">
                        {timeSlots.map((time, i) => (
                            <button
                                key={i}
                                className={`slot ${selectedTime === time ? "active" : ""}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="popup-actions">
                    <button className="btn reset-btn" onClick={() => {
                        setSelectedSport(null);
                        setSelectedTime("11:30 AM");
                        setSelectedDay(19);
                    }}>RESET</button>

                    <button className="btn apply-btn" onClick={() => onClose()}>APPLY</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
