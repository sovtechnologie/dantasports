import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from './StyleSheets/HostCarousal.module.css';
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchHostList } from '../hooks/Hostlist/useFetchHostList.jsx';
import { useSelector } from 'react-redux';
import { HostCard } from './HostCard.jsx';
import gameImage from "../features/withoutauth/assets/gameImage.png";
import gameImage1 from "../features/withoutauth/assets/gameImage1.png";


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


const HostCarousel = () => {
    const { lat, lng } = useSelector((state) => state.location);
    const [index, setIndex] = useState(0);
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;
    const { data, isLoading, error } = useFetchHostList({ lat, lng });

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
                <h3>Book Game</h3>
                <Link to="/Host" className={styled.seeall}>
                    See All
                    <img src={cursorArrow} style={{ marginLeft: "8px", width: "auto" }} alt='cursorArrow' />
                </Link>
            </div>

            <div className={styled.eventcarouselwrapper}>
                <div
                    className={styled.eventcarouseltrack}
                >
                    {venues.slice(index, index + visibleCount).map((host, i) => {
                        let extraClass = "";
                        if (hoveredArrow === "prev" && i === 0 && index > 0) {
                            extraClass = "hover-effect";
                        }
                        if (hoveredArrow === "next" && i === visibleCount - 1 && index < venues.length - visibleCount) {
                            extraClass = "hover-effect";
                        }
                        const formatttedHost = {
                            id: host?.id,
                            type: host?.activity_type,
                            host: host?.host_name,
                            hostImage: host?.host_image,
                            address: host?.full_address,
                            distance: host?.distance_km,
                            city: host?.city,
                            state: host?.state,
                            totalPlayer: host?.total_players,
                            startTime: host?.start_time,
                            endTime: host?.end_time,
                            attendees: host?.going,
                            date: `${new Date(host?.date).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short'
                            })} | ${formatTime(host?.start_time)}‑${formatTime(host?.end_time.slice(0, 5))}`,
                            skill: host?.game_skill,
                            attendeesAvatars: host?.userProfile_image || [{ profile_image: gameImage }, { profile_image: gameImage1 }]

                        };

                        return (
                            <HostCard
                                key={host.id}
                                host={formatttedHost} />
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
    );
};

export default HostCarousel;
