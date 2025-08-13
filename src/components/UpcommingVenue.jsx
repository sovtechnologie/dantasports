import styled from "./StyleSheets/UpcommingVenue.module.css";
import Cookies from "js-cookie";
import { useGetAllBooking } from "../hooks/BookingVenue/useGetAllBooking";
import UpCommingCard from "./UpCommingCard";
import { useState } from "react";
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";

// Helper to format date to "Wed, 04 Sep 2024"
function formatDate(dateStr) {
    return new Date(dateStr)
        .toLocaleDateString("en-US", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

// Helper to format time "02:00:00" → "02:00 am"
function formatTime(timeStr, durationMinutes) {
    const [h, m, s] = timeStr.split(":").map(Number);
    const dt = new Date();
    dt.setHours(h, m, s);
    const end = new Date(dt.getTime() + durationMinutes * 60000);
    const opts = { hour: "2-digit", minute: "2-digit", hour12: true };
    return `${dt.toLocaleTimeString("en-US", opts)} – ${end.toLocaleTimeString("en-US", opts)}`;
}

export const UpcommingVenues = () => {
    const token = Cookies.get("token");
    const [index, setIndex] = useState(0);
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 3;

    const { data: Bookingdata, isLoading, isError } = useGetAllBooking(!!token);
    const venues = Bookingdata?.result || [];
    

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

     if (venues.length === 0) {
        return null; // or return <p>No upcoming bookings</p>;
    }

    return (
        
        <div className={styled.upcomingVenuecontainer}>
            <div className={styled.eventsheader}>
                <h3>UpComming Booking</h3>
            </div>

            <div className={styled.eventcarouselwrapper}>
                <div className={styled.eventcarouseltrack}>
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
                            title: evt.venue_name,
                            type: `${evt.court_name}, ${evt.sports_name}`,
                            date: formatDate(evt.date),
                            venueId: evt.venue_id,
                            checkReview: evt.has_review,
                            time: formatTime(evt.start_time, evt.duration),
                            reference: `#${String(evt.id).padStart(5, "0")}`,
                            image: evt.cover_image,
                        };

                        return (

                            <UpCommingCard
                                key={evt.id}
                                booking={formattedEvent}
                            />
                        );
                    })}

                </div>

                <div className={styled.eventnav}>
                    <button
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
                    </button>
                </div>

            </div>
        </div>


    )
}