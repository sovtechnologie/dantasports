import React, { useCallback, useState } from 'react';
import "../Stylesheets/VenuePage.css";
import { Link } from 'react-router-dom';
import SortFilterPopup from '../components/SortFilterPopup.jsx';
import FilterPopup from '../components/FilterPopup.jsx';
import SortingIcon from "../assets/Filtericon/sortingicon.png";
import FilterIcon from "../assets/Filtericon/Filtericon.png";
import VenueCard from '../components/VenueCard';
import VenueCardData from '../StaticData/VenueCardData.js';
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import AppDownloadBanner from '../components/AppDownloadBanner.jsx';
import Calendar from "../components/FilterCalendar.jsx";
import Timeslot from '../components/Timeslot.jsx';
import SearchIcon from "../assets/Search-icon.png";
import Cricket from "../assets/sport-list/Cricket-Icon.png";
import Football from "../assets/sport-list/Football-Icon.png";
import BasketBall from "../assets/sport-list/BasketBall-Icon.png";
import TableTenis from "../assets/sport-list/Table-tennis.png";
import PickelBall from "../assets/sport-list/PickelBall.png";
import Batminton from "../assets/sport-list/Batminton.png";
import Swimming from "../assets/sport-list/Swimming.png";
import Skating from "../assets/sport-list/Skating.png";
import Fitness from "../assets/sport-list/Fitness.png";
import Kabaddi from "../assets/sport-list/Kabaddi.png";
import Running from "../assets/sport-list/Running.png";
import Golf from "../assets/sport-list/Golf.png";
import DeskTopFilterCalendar from '../components/DeskTopFilterCalendar.jsx';
import { format } from 'date-fns';



const sportsData = [
    { name: "Cricket", icon: Cricket },
    { name: "Football", icon: Football },
    { name: "Basketball", icon: BasketBall },
    { name: "Tennis", icon: TableTenis },
    { name: "PickelBall", icon: PickelBall },
    { name: "Badminton", icon: Batminton },
    { name: "Swimming", icon: Swimming },
    { name: "Skating", icon: Skating },
    { name: "Fitness", icon: Fitness },
    { name: "Kabaddi", icon: Kabaddi },
    { name: "Running", icon: Running },
    { name: "Golf", icon: Golf },

];

const sortOptions = [
    "Popularity",
    "Near By",
    "Favorites",
    "Price: Low to High"
];




function VenuePage() {

    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    //   Handle Time Selection from Timeslots

    const handleTimeChange = useCallback((timeslot) => {
        if (timeslot === selectedTime) return;
        setSelectedTime(timeslot);
    }, [selectedTime]);



    // Handle date selection from calendar
    const handleDateChange = useCallback((date) => {
        if (date.getTime() === selectedDate.getTime()) return;
        setSelectedDate(date);
        applyFilters(date);
    }, [selectedDate]);


    // Apply your filter logic
    const applyFilters = (date) => {
        // Your actual filtering logic here
        const formattedDate = format(date, 'yyyy-MM-dd');
        console.log('Filtering by date:', formattedDate);
        

        // Example: filter some data array
        // const filtered = yourDataArray.filter(item =>
        //     item.date === formattedDate
        // );
        // setFilteredData(filtered);
    };

    const itemsPerPage = 3;
    const [activeIndex, setActiveIndex] = useState(0);

    const totalPageSport = Math.ceil(sportsData.length / itemsPerPage);

    const scrollLeft = () => {
        setActiveIndex(prev => Math.max(prev - 1, 0));
    };

    const scrollRight = () => {
        setActiveIndex(prev => Math.min(prev + 1, totalPageSport - 1));
    };

    const paginatedSports = sportsData.slice(
        activeIndex * itemsPerPage,
        (activeIndex + 1) * itemsPerPage
    );



    const [showFilter, setShowFilter] = useState(false);

    const [showSort, setshowSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');


    const [page, setPage] = useState(0);
    const pageSize = 12; // Number of cards per page

    const totalVenues = VenueCardData.length;
    const totalPages = Math.ceil(totalVenues / pageSize);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const paginatedVenues = VenueCardData.slice(page * pageSize, (page + 1) * pageSize);

    const [selected, setSelected] = useState([]);

    const toggleCheckbox = (option) => {
        setSelected((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option]
        );
    };

    const reset = () => setSelected([]);
    const handleReset = () => {
        setSelectedSport(null);
        setSelectedDate(new Date());
        setSelectedTime(null);
    }





    return (
        <>
            {/* filter section */}
            <div className='venue-page'>
                <div className="filter-bar">
                    <h3 className="filter-title">Discover sports venues in near you:</h3>

                    <div className="filter-actions">
                        <button className="icon-btn" onClick={() => setShowFilter(true)}>
                            <img src={FilterIcon} alt="Filter" className="icon" />
                        </button>

                        {showFilter && (
                            <FilterPopup
                                onClose={() => setShowFilter(false)}
                                onApply={(sort) => {
                                    console.log("Applied Filter:", sort);
                                    setShowFilter(false);
                                }}
                            />
                        )}

                        <button className="icon-btn" onClick={() => setshowSort(true)}>
                            <img src={SortingIcon} alt="Sort" className="icon" />
                        </button>

                        {showSort && (
                            <SortFilterPopup
                                onClose={() => setshowSort(false)}
                                onApply={(sort) => {
                                    console.log("Applied Sort:", sort);
                                    setshowSort(false);
                                }}
                                selected={selectedSort}
                                setSelected={setSelectedSort}
                            />
                        )}
                    </div>
                </div>


                <div className='venue-container'>

                    <aside className='left-section'>
                        <div className='filters'>
                            <div className="filter-header">
                                <h3>Filter</h3>
                                <button className="reset-btns" onClick={handleReset}>Reset</button>
                            </div>

                            <div className="filter-sec1">
                                <label>Sports</label>
                                <div className="search-input-container">
                                    <img src={SearchIcon} alt="search" className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search..."

                                    />
                                </div>
                            </div>

                            <div className="filter-sec1">
                                <div className="carousel-navigation">
                                    <button className="nav-arrow left" onClick={scrollLeft}>&lt;</button>

                                    <div className="sports-scroll-wrapper">
                                        <div className="sports-scroll">
                                            {paginatedSports.map((sport, idx) => (
                                                <div
                                                    className={`sport-item ${selectedSport === sport.name ? 'active-sport' : ''}`}
                                                    key={idx}
                                                    onClick={() => setSelectedSport(sport.name)}
                                                >
                                                    <img src={sport.icon} alt={sport.name} />
                                                    <span>{sport.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="nav-arrow right" onClick={scrollRight}>&gt;</button>
                                </div>

                                <div className="pagination-dots">
                                    {Array.from({ length: totalPageSport }).map((_, i) => (
                                        <span key={i} className={`dot ${i === activeIndex ? "active" : ""}`} />
                                    ))}
                                </div>
                            </div>
                            {selectedSport ? (
                                <div className='filter-sec2'>
                                    <label>Availability</label>
                                    <div className='calendar'>
                                        <DeskTopFilterCalendar
                                            selectedDate={selectedDate}
                                            onDateChange={handleDateChange}
                                        />
                                    </div>
                                    {/* Show timeslot only if date is selected */}
                                    {selectedDate ? (
                                        <div className='timeslot'>
                                            <Timeslot
                                                selectedTime={selectedTime}
                                                onTimeSlotChange={handleTimeChange}
                                            />
                                        </div>
                                    ) : (
                                        <div className="no-sport-msg">
                                            <p>Please select a date to view available time slots.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className='filter-sec2 no-sport-msg'>
                                    <p>Please select a sport first to choose availability (date & time).</p>
                                </div>
                            )}


                        </div>

                        <div className='sort'>
                            <div className="filter-header">
                                <h3 className='header-sort'>Sort By</h3>
                                <button className="reset-btns" onClick={reset}>Reset</button>
                            </div>

                            {/* <p className="work-mode">Work mode</p> */}

                            <div className="checkbox-list">
                                {sortOptions.map((option, idx) => (
                                    <label key={idx} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(option)}
                                            onChange={() => toggleCheckbox(option)}
                                        />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </div>

                        </div>

                    </aside>
                    <aside className='right-section'>
                        <div className="venue-list-mobile-scroll">
                            <div className="venue-list">
                                {paginatedVenues.map((venue, index) => (
                                    <Link
                                        key={venue.id || index}
                                        to={`/venue/${venue.id || index}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <VenueCard key={index} venue={venue} />
                                    </Link>

                                ))}
                            </div>
                        </div>
                        <div className="venue-nav">
                            <button onClick={handlePrev} disabled={page === 0}><img src={leftArrow} alt='left arrow' /></button>
                            <button onClick={handleNext} disabled={page >= totalPages - 1}><img src={rightArrow} alt='right-arrow' /></button>
                        </div>
                    </aside>

                </div>


                <div className='footer-banner'>
                    <AppDownloadBanner />
                </div>

            </div>
        </>
    )
}

export default VenuePage