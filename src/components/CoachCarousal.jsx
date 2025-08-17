import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from './StyleSheets/CoachCarousal.module.css';
import HomeCoachCard from "./HomeCoachCard.jsx"
import { Link } from 'react-router-dom';
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchCoach } from '../hooks/CoachList/useFetchCoach.js';;


const CoachCarousel = () => {
    const { lat, lng } = useSelector((state) => state.location);
    const [index, setIndex] = useState(0);
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;
    const { data: AllCoachdata, isLoading, isError, error } = useFetchCoach({ lat, lng });

    const venues = AllCoachdata?.result || [];

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
    if (error) return <p>Error loading coaches: {error.message}</p>;



    return (
        <div className={styled.eventsectioncontainer}>
            <div className={styled.eventsheader}>
                <h3>Book Coach</h3>
                <Link to="/Coach" className={styled.seeall}>
                    See All
                    <img src={cursorArrow} style={{ marginLeft: "8px", width: "auto" }} alt='cursorArrow' />
                </Link>
            </div>

            <div className={styled.eventcarouselwrapper}>
                <div
                    className={styled.eventcarouseltrack}
                >
                    {venues.slice(index, index + visibleCount).map((coach, i) => {
                        let extraClass = "";
                        if (hoveredArrow === "prev" && i === 0 && index > 0) {
                            extraClass = "hover-effect";
                        }
                        if (hoveredArrow === "next" && i === visibleCount - 1 && index < venues.length - visibleCount) {
                            extraClass = "hover-effect";
                        }
                        const formattedEvent = {
                            id: coach.id,
                            image: coach.desktop_image || coach.mobile_image,
                            name: coach.name,
                            location: `${coach.locations?.area},${coach.locations?.city}`,
                            rating: coach.average_rating || 0,
                            ratingCount: coach.review_count || 0,
                            sportIcon: coach.linked_sports,
                            category: coach.training_type,
                            tag: coach.type === 1 ? "Trainer" : "Academy",
                        };

                        return (
                            <HomeCoachCard
                                key={coach.id}
                                coach={formattedEvent} />
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

export default CoachCarousel;
