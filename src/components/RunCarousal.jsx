import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import styled from './StyleSheets/RunCarousal.module.css';
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchEvent } from '../hooks/EventList/useFetchEvents.js';
import HomeRunCard from './HomeRunCard.jsx';
import { useSelector } from 'react-redux';

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

const RunCarousel = () => {
     const { lat, lng } = useSelector((state) => state.location);
    const [index, setIndex] = useState(0);
    const [coords, setCoords] = useState({ lat: lat, lng: lng, type: 2, userId: null });
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;
    const { data, isLoading, error } = useFetchEvent(coords);

    const venues = data?.result || [];

    const prev = () => {
        setIndex((prevIndex) => {
            if (prevIndex > 0) {
                setLastClicked('prev');
                return prevIndex - 1;
            }
            return prevIndex;
        });
    };

    const next = () => {
        setIndex((prevIndex) => {
            if (prevIndex < venues.length - visibleCount) {
                setLastClicked('next');
                return prevIndex + 1;
            }
            return prevIndex;
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading venues: {error.message}</p>;



    return (
        <div className={styled.eventsectioncontainer}>
            <div className={styled.eventsheader}>
                <h3>Book Run</h3>
                <Link to="/Run" className={styled.seeall}>
                    See All
                    <img src={cursorArrow} style={{ marginLeft: "8px", width: "10px" }} alt='cursorArrow' />
                </Link>
            </div>

            <div className={styled.eventcarouselwrapper}>
                <div
                    className={styled.eventcarouseltrack}
                >
                    {venues.slice(index, index + visibleCount).map((evt, i) => {
                        let extraClass = "";
                        if (hoveredArrow === "prev" && i === 0 && index > 0) {
                            extraClass = "hover-effect";
                        }
                        if (hoveredArrow === "next" && i === visibleCount - 1 && index < venues.length - visibleCount) {
                            extraClass = "hover-effect";
                        }
                        const formattedEvent = {
                            id: evt.id,
                            name: evt.event_title,
                            rating: evt.average_rating ?? 0,
                            type: evt?.event_type,
                            RatingCount: evt.review_count ?? 0,
                            price: `₹${parseInt(evt.lowest_ticket_price)} onwards`,
                            offer: evt.offer ?? 'No offer',
                            favourite: evt?.favourite,
                            favourite_event_id: evt?.favourite_event_id,
                            location: `${evt.locations[0]?.area}, ${evt.locations[0]?.city}` || '',
                            date: `${new Date(evt.start_date).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short'
                            })} – ${new Date(evt.end_date).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short'
                            })} | ${formatTime(evt.start_time)}‑${formatTime(evt.end_time.slice(0, 5))}`,
                            image: evt.desktop_image,
                            sportIcon: evt.sports || ''
                        };

                        return (
                            <HomeRunCard
                                key={evt.id}
                                event={formattedEvent} />
                        );
                    })}
                </div>
                <div className={styled.eventnav}>
                    {/* <button
                        onClick={prev}
                        disabled={index === 0}
                        onMouseEnter={() => setHoveredArrow('prev')}
                        onMouseLeave={() => setHoveredArrow(null)}
                    >
                        <img src={leftArrow} alt='leftArrow' />
                    </button>
                    <button
                        onClick={next}
                        disabled={index >= venues.length - visibleCount}
                        onMouseEnter={() => setHoveredArrow('next')}
                        onMouseLeave={() => setHoveredArrow(null)}
                    >
                        <img src={rightArrow} alt='rightArrow' />
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default RunCarousel;
