import React, { useCallback, useEffect, useState } from 'react';
import "../Stylesheets/VenuePage.css";
import searchlogo from "../assets/Searchlogo.png";
import locationlogo from "../assets/locationlogo.png";
import { useQuery } from '@tanstack/react-query';
import SortFilterPopup from '../components/SortFilterPopup.jsx';
import FilterPopup from '../components/FilterPopup.jsx';
import SortingIcon from "../assets/Filtericon/sortingicon.png";
import FilterIcon from "../assets/Filtericon/Filtericon.png";
import VenueCard from '../components/VenueCard';
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import AppDownloadBanner from '../components/AppDownloadBanner.jsx';
import Timeslot from '../components/Timeslot.jsx';
import SearchIcon from "../assets/Search-icon.png";
import DeskTopFilterCalendar from '../components/DeskTopFilterCalendar.jsx';
import FilterSportSwipper from "../components/FilterSportSwipper.jsx"
import { format } from 'date-fns';
import { useLikeVenue } from '../../../hooks/favouriteVenue/useLikeVenue.js';
import { useUnlikeVenue } from '../../../hooks/favouriteVenue/useUnlikeVenue.js';
import { useSelector } from 'react-redux';
import { fetchSportList } from '../../../services/withoutLoginApi/SportListApi/endpointApi.js';
import { useFetchVenue } from '../../../hooks/VenueList/useFetchVenue.js';
import { useQueryClient } from '@tanstack/react-query';
import { VenueListShimmer } from '../components/Shimmer/VenueListShimmer.jsx';
import { useSortVenue } from '../../../hooks/SortAndFilter/useSortVenue.js';
import { useFilterVenue } from '../../../hooks/SortAndFilter/useFilterVenue.js';
import { getUserLocation } from '../../../utils/getUserLocation.js';


const sortOptions = [
    { id: 1, label: "Popularity" },
    { id: 2, label: "Near By" },
    { id: 3, label: "Favorites" },
    { id: 4, label: "Price: Low to High" }
];

const formatTimeHHMMSS = (timeStr) => {
    if (!timeStr) return "";
    const date = new Date(`1970-01-01T${timeStr}`);
    return date.toLocaleTimeString("en-GB", { hour12: false }); // "HH:mm:ss"
};



function formatDate(dateStr) {
    return new Date(dateStr)
        .toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

// Formats "15:00:00" or "15:00" → "03:00 PM"

// Formats "15:00", "15:00:30" → "03:00 PM"
function formatTime(timeStr = "00:00") {
    if (!timeStr) return "";  // Return an empty string or suitable default

    const parts = timeStr.split(':');
    const h = Number(parts[0] || 0);
    const m = Number(parts[1] || 0);
    const s = parts.length > 2 ? Number(parts[2]) : 0;

    const dt = new Date();
    dt.setHours(h, m, s);

    return dt.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}




function VenuePage() {
    const queryClient = useQueryClient();
    const [venueList, setVenueList] = useState([]);
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedSportId, setSelectedSportId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [showSort, setshowSort] = useState(false);
    const [selectedSort, setSelectedSort] = useState('');
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle venueList data by react-Query

    const auth = useSelector((state) => state.auth);
    const [coords, setCoords] = useState({ lat: null, lng: null, userId: auth?.id });

    useEffect(() => {
        async function fetchLongLat() {
            const { lat, lng } = await getUserLocation();
            console.log("my lat and long", lat, lng);
            setCoords({ lat, lng, userId: auth?.id });
        }
        fetchLongLat();
    }, []);

    const { data: AllVenuedata, isLoading, isError, error } = useFetchVenue(coords);


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
    const sortVenue = useSortVenue();
    const FilterVenue = useFilterVenue();
    const userId = useSelector((state) => state.auth?.id);

    const toggleFavourite = (venue) => {
        const venueId = venue.id;
        console.log("toggle")

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
    console.log("Selectedtime and date in filter", selectedTime)


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
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 6;

    // Filter sports based on search query
    const filteredSports = sportsData.filter(sport =>
        sport?.sports_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPageSport = Math.ceil(filteredSports.length / itemsPerPage);

    const scrollLeft = () => {
        setActiveIndex(prev => Math.max(prev - 1, 0));
    };

    const scrollRight = () => {
        setActiveIndex(prev => Math.min(prev + 1, totalPageSport - 1));
    };

    const paginatedSports = filteredSports.slice(
        activeIndex * itemsPerPage,
        (activeIndex + 1) * itemsPerPage
    )


    // Reset to first page when search changes
    useEffect(() => {
        setActiveIndex(0);
    }, [searchQuery]);


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



    const handleVenueSort = async (optionId) => {
        // setSelected(prev => {
        //     const newSelected = prev.includes(optionId)
        //         ? prev.filter(id => id !== optionId)
        //         : [...prev, optionId];
        //     return newSelected;
        // });

        setSelected(prev => (prev === optionId ? null : optionId));

        try {
            const { lat, lng } = await getUserLocation();
            sortVenue.mutate({ sortByType: optionId, lat, lng }, {
                onSuccess: (data) => {
                    if (Array.isArray(data?.result)) {
                        setVenueList(data?.result);
                    } else {
                        queryClient.invalidateQueries(['venueList', userId || null]);
                    }
                },
                onError: err => console.error("Sort failed:", err)
            });
        } catch (err) {
            console.error("Location error:", err);
        }

    };




    console.log("sortedIds", selected);

    const handleSortReset = () => {
        setSelected([]); // Clear selected sort IDs
        if (AllVenuedata?.result) setVenueList(AllVenuedata.result);

        queryClient.invalidateQueries({
            queryKey: ['venueList', auth?.id || null],
            refetchType: 'all', // ensures even inactive queries are considered
        });
    };

    // State for filtered venues
    const [filteredVenues, setFilteredVenues] = useState([]);

    const filterVenues = (sportId, date, time) => {
        if (!sportId || !date || !time) return;

        const formattedTime = formatTimeHHMMSS(time);
        console.log("Filtering with:", { sportsId: sportId, date: date, time: time });

        try {
            FilterVenue.mutate({ sportsId: sportId, date: date, time: formattedTime }, {
                onSuccess: (data) => {
                    if (Array.isArray(data?.result)) {
                        setVenueList(data?.result);
                    } else {
                        queryClient.invalidateQueries(['venueList', userId || null]);
                    }
                },
                onError: err => console.error("filter failed:", err)
            });
        } catch (err) {
            console.error("Location error:", err);
        }

        // Replace with real API

    };

    useEffect(() => {
        filterVenues(selectedSportId, selectedDate, selectedTime);
    }, [selectedSport, selectedDate, selectedTime]);


    const handleReset = () => {
        setSelectedSport(null);
        setSelectedSportId(null);
        setSelectedDate(new Date());
        setSelectedTime(null);
        setSearchQuery("")
    }

    useEffect(() => {
        if (AllVenuedata?.result) {
            setVenueList(AllVenuedata.result);
        }
    }, [AllVenuedata]);
    console.log("venueList", venueList)



    if (isLoading) return <div> <VenueListShimmer /></div>;
    if (isError) return <div>Error loading venues: {error.message}</div>;
    if (isSportsLoading) return <div><VenueListShimmer /></div>;
    if (isSportsError) return <div>Error loading sports: {sportsError.message}</div>;

    // if (!venueList.length) return <div>No venues found.</div>;
    return (
        <>

            {/* filter section */}
            <div className='venue-page'>
                <div className="filter-bar">
                    <h3 className="filter-title">Discover sports venues in near you:</h3>

                    <div className='search-input'>
                        <img src={searchlogo} height={30} width={30} alt='searchlogo' />
                        <input
                            type="text"
                            placeholder="Search by venue, location"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <img src={locationlogo} height={30} width={30} alt='locationlogo' />
                    </div>


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
                                onClose={() => {
                                    setshowSort(false);
                                }}
                                onApply={handleVenueSort}
                                reset={handleSortReset}
                                selected={selectedSort}
                                setSelected={setSelectedSort}
                            />
                        )}
                    </div>
                </div>


                <div className='venue-container'>

                    <aside className='left-section'>
                        <div className='filters'>
                            <div className='filters-one'>
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
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                className="clear-search-btn"
                                                onClick={() => setSearchQuery("")}
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="filter-sec1">
                                    <div className="carousel-navigation">
                                        {totalPageSport > 1 && (
                                            <button className="nav-arrow left" onClick={scrollLeft}>&lt;</button>
                                        )}

                                        <div className="sports-scroll-wrapper">
                                            <div className="">
                                                <FilterSportSwipper
                                                    SportsData={paginatedSports}
                                                    selectedSport={selectedSport}
                                                    setSelectedSport={setSelectedSport}
                                                    setSportId={setSelectedSportId}
                                                />

                                            </div>
                                        </div>

                                        {totalPageSport > 1 && (
                                            <button className="nav-arrow right" onClick={scrollRight}>&gt;</button>
                                        )}
                                    </div>
                                    {totalPageSport > 1 && (
                                        <div className="pagination-dots">
                                            {Array.from({ length: totalPageSport }).map((_, i) => (
                                                <span key={i} className={`dot ${i === activeIndex ? "active" : ""}`} />
                                            ))}
                                        </div>
                                    )}
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
                                    <div className='timeslots'>
                                        {selectedSport} |{formatDate(selectedDate)} | {formatTime(selectedTime)}
                                    </div>
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
                                <button className="reset-btns" onClick={handleSortReset}>Reset</button>
                            </div>

                            <div className="checkbox-list">
                                {sortOptions.map(({ id, label }) => (
                                    <label key={id} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            // checked={selected.includes(id)}
                                            checked={selected === id}
                                            onChange={() => handleVenueSort(id)}
                                        />
                                        <span>{label}</span>
                                    </label>
                                ))}

                            </div>

                        </div>

                    </aside>


                    <aside className='right-section'>
                        {
                            !venueList.length ? (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: "center",
                                    marginTop: "20rem"
                                }}>No venues found.</div>
                            ) : (
                                <>
                                    <div className="venue-list-mobile-scroll">

                                        <div className="venue-list">

                                            {paginatedVenues.map((venue, index) => {
                                                const formattedVenue = {
                                                    id: venue.id,
                                                    image: venue.cover_image,
                                                    sportsIcons: venue?.sports,
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

                                                    <VenueCard
                                                        key={venue.id}
                                                        venue={formattedVenue}
                                                        isLiked={formattedVenue.favourite}
                                                        onLikeToggle={() => toggleFavourite(venue)}
                                                    />

                                                );
                                            })}

                                        </div>
                                    </div>
                                    <div className="venue-nav">
                                        <button onClick={handlePrev} disabled={page === 0}><img src={leftArrow} alt='left arrow' /></button>
                                        <button onClick={handleNext} disabled={page >= totalPages - 1}><img src={rightArrow} alt='right-arrow' /></button>
                                    </div>
                                </>
                            )
                        }

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