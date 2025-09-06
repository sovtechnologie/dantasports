import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from './StyleSheets/GymCarousal.module.css';
import HomeGymCard from "./HomeGymCard.jsx"
import { Link } from 'react-router-dom';
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchGym } from '../hooks/GymList/useFetchGym.js';



const GymCarousel = () => {
    const userId = useSelector((state) => state.auth.id);
    const { lat, lng } = useSelector((state) => state.location);
    const [index, setIndex] = useState(0);
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;
    const payload = {
        lat: lat,
        lng: lng,
        userId: userId || null,
    }
    const { data: AllGymdata, isLoading, isError, error } = useFetchGym(payload);

    const venues = AllGymdata?.result || [];

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
                <h3>Book Gym</h3>
                <Link to="/Coach" className={styled.seeall}>
                    See All
                    <img src={cursorArrow} style={{ marginLeft: "8px", width: "auto" }} alt='cursorArrow' />
                </Link>
            </div>

            <div className={styled.eventcarouselwrapper}>
                <div
                    className={styled.eventcarouseltrack}
                >
                    {venues.slice(index, index + visibleCount).map((gym, i) => {
                        let extraClass = "";
                        if (hoveredArrow === "prev" && i === 0 && index > 0) {
                            extraClass = "hover-effect";
                        }
                        if (hoveredArrow === "next" && i === visibleCount - 1 && index < venues.length - visibleCount) {
                            extraClass = "hover-effect";
                        }
                        const formattedEvent = {
                            id: gym.Id,
                            image: gym.desktop_image || gym.mobile_image,
                            title: gym.gym_name,
                            location: gym.full_address,
                            distance: gym.distance || 0,
                            rating: gym.rating || 0,
                            ratingCount: gym.ratingCount || 0,
                            discountText: gym.discountText || 'Upto 50% off',
                            priceText: gym.priceText || '1000 onwards',
                            vendorId: gym.vendor_id,
                        };

                        return (
                            <HomeGymCard
                                key={gym.id}
                                gym={formattedEvent} />
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

export default GymCarousel;
