import React, { useCallback, useEffect, useState } from 'react';
import "../Stylesheets/VenuePage.css";
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SortFilterPopup from '../components/SortFilterPopup.jsx';
import FilterPopup from '../components/FilterPopup.jsx';
import SortingIcon from "../assets/Filtericon/sortingicon.png";
import FilterIcon from "../assets/Filtericon/Filtericon.png";
import VenueCard from '../components/VenueCard';
// import VenueCardData from '../StaticData/VenueCardData.js';
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import AppDownloadBanner from '../components/AppDownloadBanner.jsx';
import Timeslot from '../components/Timeslot.jsx';
import SearchIcon from "../assets/Search-icon.png";
import Football from "../assets/sport-list/Football-Icon.png";
import CricketLogo from "../assets/VenueCardLogo/CricketLogo.png";
import FootballLogo from "../assets/VenueCardLogo/FootballLogo.png";
import DeskTopFilterCalendar from '../components/DeskTopFilterCalendar.jsx';
import { format } from 'date-fns';
import { useLikeVenue } from '../../../hooks/favouriteVenue/useLikeVenue.js';
import { useUnlikeVenue } from '../../../hooks/favouriteVenue/useUnlikeVenue.js';
import { useSelector } from 'react-redux';
import { fetchSportList } from '../../../services/withoutLoginApi/SportListApi/endpointApi.js';
import { useFetchVenue } from '../../../hooks/VenueList/useFetchVenue.js';
import { useQueryClient } from '@tanstack/react-query';




const sortOptions = [
    "Popularity",
    "Near By",
    "Favorites",
    "Price: Low to High"
];




function VenuePage() {
    const queryClient = useQueryClient();
    const [venueList, setVenueList] = useState([]);
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setshowSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);


    // Handle venueList data by react-Query

    const auth = useSelector((state) => state.auth);
    const { data, isLoading, isError, error } = useFetchVenue(auth?.id || null);


    const {
        data: sportsDataResponse,
        isLoading: isSportsLoading,
        isError: isSportsError,
        error: sportsError
    } = useQuery({
        queryKey: ['sportsList'],
        queryFn: fetchSportList,
    });

    const sportsData = sportsDataResponse?.result || [];

    const likeVenue = useLikeVenue();
    const unlikeVenue = useUnlikeVenue();
    const userId = useSelector((state) => state.auth?.id);

    const toggleFavourite = (venue) => {
        const venueId = venue.id;

        setVenueList((prevList) =>
            prevList.map((v) =>
                v.id === venueId ? { ...v, favourite: !v.favourite } : v
            )
        );

        if (!venue.favourite) {
            likeVenue.mutate({ venueId, userId: auth?.id }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(['venueList', auth?.id || null]);
                },
                onError: () => {
                    setVenueList((prevList) =>
                        prevList.map((v) =>
                            v.id === venueId ? { ...v, favourite: false } : v
                        )
                    );
                },
            });
        } else {
            unlikeVenue.mutate({ favouriteVenueId: venue.favourite_venue_id }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(['venueList', auth?.id || null]);
                },
                onError: () => {
                    setVenueList((prevList) =>
                        prevList.map((v) =>
                            v.id === venueId ? { ...v, favourite: true } : v
                        )
                    );
                },
            });
        }
    };







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




    const pageSize = 12; // Number of cards per page

    const totalVenues = venueList.length;
    const totalPages = Math.ceil(totalVenues / pageSize);

    const handlePrev = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const paginatedVenues = venueList.slice(page * pageSize, (page + 1) * pageSize);



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

    useEffect(() => {
        if (data?.result) {
            setVenueList(data.result);
        }
    }, [data]);


    if (isLoading) return <div>Loading venues...</div>;
    if (isError) return <div>Error loading venues: {error.message}</div>;
    if (isSportsLoading) return <div>Loading sports...</div>;
    if (isSportsError) return <div>Error loading sports: {sportsError.message}</div>;

    if (!venueList.length) return <div>No venues found.</div>;
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
                                            {paginatedSports.map((sport, id) => (
                                                <div
                                                    className={`sport-item ${selectedSport === sport.sports_name ? 'active-sport' : ''}`}
                                                    key={id}
                                                    onClick={() => setSelectedSport(sport.sports_name)}
                                                >
                                                    <img src={sport.sports_images || Football} alt={sport.sports_name} />
                                                    <span>{sport.sports_name}</span>
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
                                {/* {paginatedVenues.map((venue, index) => (
                                    <Link
                                        key={venue.id || index}
                                        to={`/venue/${venue.id || index}`}
                                        style={{ textDecoration: "none", color: "inherit" }}
                                    >
                                        <VenueCard key={index} venue={venue} />
                                    </Link>

                                ))} */}
                                {paginatedVenues.map((venue, index) => {
                                    const formattedVenue = {
                                        id: venue.id,
                                        image: venue.cover_image,
                                        sportsIcons: [CricketLogo, FootballLogo],
                                        name: venue.venue_name,
                                        about: venue.about_venue,
                                        rating: 4.5,
                                        reviews: 20,
                                        address: `${venue.area}, ${venue.city}`,
                                        distance: "3",
                                        offer: "10% Off",
                                        price: `₹${venue.pricing}`,
                                        favourite: venue.favourite
                                    };

                                    return (
                                        <Link key={venue.id} to={`/venue/${venue.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                            <VenueCard
                                                venue={formattedVenue}
                                                isLiked={formattedVenue.favourite}
                                                onLikeToggle={() => toggleFavourite(venue)}
                                            />
                                        </Link>
                                    );
                                })}

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