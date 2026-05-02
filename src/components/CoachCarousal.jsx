import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from './StyleSheets/CoachCarousal.module.css';
import HomeCoachCard from "./HomeCoachCard.jsx"
import { Link } from 'react-router-dom';
import leftArrow from "../assets/svg-icons/chevron-left-circle.svg";
import rightArrow from "../assets/svg-icons/chevron-right-circle.svg";
import cursorArrow from "../assets/svg-icons/arrow-right.svg";
import { useFetchCoach } from '../hooks/CoachList/useFetchCoach.js';
import fallback from "../assets/images/home/bookcoach/coach1.png";

const fallbackCoaches = [
    { id: "coach-fallback-1", name: "Aarav Sharma", desktop_image: fallback, locations: { area: "Indiranagar", city: "Bengaluru" }, average_rating: 4.8, review_count: 126, linked_sports: [], training_type: "Personal", type: 1 },
    { id: "coach-fallback-2", name: "Danta Football Academy", desktop_image: fallback, locations: { area: "Koramangala", city: "Bengaluru" }, average_rating: 4.7, review_count: 98, linked_sports: [], training_type: "Group", type: 2 },
    { id: "coach-fallback-3", name: "Meera Iyer", desktop_image: fallback, locations: { area: "HSR Layout", city: "Bengaluru" }, average_rating: 4.9, review_count: 84, linked_sports: [], training_type: "Hybrid", type: 1 },
    { id: "coach-fallback-4", name: "Elite Cricket Coaching", desktop_image: fallback, locations: { area: "Whitefield", city: "Bengaluru" }, average_rating: 4.6, review_count: 72, linked_sports: [], training_type: "Academy", type: 2 },
];


const CoachCarousel = () => {
    const { lat, lng } = useSelector((state) => state.location);
    const [index, setIndex] = useState(0);
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;
    const { data: AllCoachdata } = useFetchCoach({ lat, lng });

    const venues = AllCoachdata?.result || [];
    const carouselItems = venues.length ? venues : fallbackCoaches;

    const prev = () => {
        setIndex((prevIndex) => {
            if (prevIndex > 0) {
                return prevIndex - 1;
            }
            return prevIndex;
        });
    };

    const next = () => {
        setIndex((prevIndex) => {
            if (prevIndex < carouselItems.length - visibleCount) {
                return prevIndex + 1;
            }
            return prevIndex;
        });
    };

    return (
        <div className={styled.eventsectioncontainer}>
            <div className={styled.eventsheader}>
                <h3>Book Coach</h3>
                <Link to="/coach" className={styled.seeall}>
                    See All
                    <img src={cursorArrow} style={{ marginLeft: "8px", width: "10px" }} alt='cursorArrow' />
                </Link>
            </div>

            <div className={styled.eventcarouselwrapper}>
                <div
                    className={styled.eventcarouseltrack}
                >
                    {carouselItems.slice(index, index + visibleCount).map((coach, i) => {
                        let extraClass = "";
                        if (hoveredArrow === "prev" && i === 0 && index > 0) {
                            extraClass = "hover-effect";
                        }
                        if (hoveredArrow === "next" && i === visibleCount - 1 && index < carouselItems.length - visibleCount) {
                            extraClass = "hover-effect";
                        }
                        const formattedEvent = {
                            id: coach.id,
                            image: coach.desktop_image || coach.mobile_image || fallback,
                            name: coach.name,
                            location: `${coach.locations?.area || coach.locations?.[0]?.area || "Nearby"}, ${coach.locations?.city || coach.locations?.[0]?.city || ""}`,
                            rating: coach.average_rating || 0,
                            ratingCount: coach.review_count || 0,
                            sportIcon: coach.linked_sports,
                            category: coach.training_type,
                            tag: coach.type === 1 ? "Trainer" : "Academy",
                        };

                        return (
                            <HomeCoachCard
                                key={coach.id}
                                coach={formattedEvent}
                                className={extraClass}
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
    );
};

export default CoachCarousel;
