import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VenueCard from "./VenueCard.jsx";
import './StyleSheets/VenueCarousel.css'; // Assuming you have a CSS file for styling
// import venues from '../StaticData/VenueCarouselData.js'; // Your data file or replace with static list
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchVenue } from '../hooks/VenueList/useFetchVenue.js';

const VenueCarousel = () => {
    const [index, setIndex] = useState(0);
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;

    const { data, isLoading, error } = useFetchVenue();

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
        <div className="venue-section">
            <div className="venue-header">
                <h3>Book Venues</h3>
                <Link to="/venue" className="see-all">
                    See All
                    <img src={cursorArrow} height={15} width={15} style={{ marginLeft: "8px" }}  alt='cursorArrow'/>
                </Link>
            </div>

            <div className="venue-carousel-wrapper">
                <div
                    className="venue-carousel-track"
                >
                    {venues.slice(index, index + visibleCount).map((venue, i) => {
                        let extraClass = "";
                        if (hoveredArrow === "prev" && i === 0 && index > 0) {
                            extraClass = "hover-effect";
                        }
                        if (hoveredArrow === "next" && i === visibleCount - 1 && index < venues.length - visibleCount) {
                            extraClass = "hover-effect";
                        }
                        return (

                            <VenueCard
                                key={venue.id}
                                id={venue.id}
                                name={venue.venue_name}
                                rating={4.2} // If your API has no rating, use a static or calculated value
                                reviews={122} // Similarly, static if not provided
                                distance="1.2 km" // You could calculate from lat/lng
                                sports={["Football", "Cricket"]} // Use real sports if available
                                image={venue.cover_image}
                                className={extraClass}
                            />
                        );
                    })}
                </div>
                <div className="venue-nav">
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
                        <img src={rightArrow} alt='rightArrow'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VenueCarousel;
