import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VenueCard from "./VenueCard.jsx";
import './StyleSheets/VenueCarousel.css'; // Assuming you have a CSS file for styling
import venues from '../StaticData/VenueCarouselData.js'; // Your data file or replace with static list
import leftArrow from "../assets/VenueImage/left-arrow.png";
import rightArrow from "../assets/VenueImage/right-arrow.png";
import cursorArrow from "../assets/cursorArrow.png";

const VenueCarousel = () => {
    const [index, setIndex] = useState(0);
    const [lastClicked, setLastClicked] = useState(null); // 'prev' | 'next' | null
    const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
    const visibleCount = 4;

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

    return (
        <div className="venue-section">
            <div className="venue-header">
                <h3>Book Venues</h3>
                <Link to="/venue" className="see-all">
                    See All
                    <img src={cursorArrow} height={15} width={15} style={{ marginLeft: "8px" }} />
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
                                key={i}
                                name={venue.name}
                                rating={venue.rating}
                                reviews={venue.reviews}
                                distance={venue.distance}
                                sports={venue.sports}
                                image={venue.image}
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
                        <img src={leftArrow} />
                    </button>
                    <button
                        onClick={next}
                        disabled={index >= venues.length - visibleCount}
                        onMouseEnter={() => setHoveredArrow('next')}
                        onMouseLeave={() => setHoveredArrow(null)}
                    >
                        <img src={rightArrow} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VenueCarousel;
