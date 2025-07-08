import React, { useEffect, useState } from 'react';
import "./StyleSheets/Hero.css"; // Assuming you have a CSS file for styling
import leftCharacters from "../assets/heroImages/character-left.png";
import rightCharacters from "../assets/heroImages/character-right.png"
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import data from "../StaticData/infocard.js";
import InfoCard from './InfoCard';


const headings = [
  "Reserve Nearby Turfs",
  "Book Your Favorite Sports Venue",
  "Find Top-rated Grounds Near You",
  "Instant Booking, Zero Hassle"
];

const Hero = () => {

  const [headingIndex, setHeadingIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState(null); // 'left' | 'right' | null
  const [visibleCount, setVisibleCount] = useState(4);
  // const visibleCount = 4;
  const totalCards = data.carddata.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setVisibleCount(2);
      } else if (window.innerWidth <= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize(); // Run on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = window.innerWidth <= 768;

  const scroll = (direction) => {
    if (direction === "left" && startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
    if (direction === "right" && startIndex < totalCards - visibleCount) {
      setStartIndex(startIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true); // Start animation
      setTimeout(() => {
        setHeadingIndex((prev) => (prev + 1) % headings.length);
        setAnimate(false); // Reset animation after change
      }, 400); // Animation duration (ms)
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="hero-section">
        <div className="hero-background">
          <img src={leftCharacters} alt="Runners" className="hero-left-img" />
          <img src={rightCharacters} alt="Team" className="hero-right-img" />

          <div className="hero-content">
            <h1 className={animate ? "heading-animate" : "heading-nonAnimate"}>{headings[headingIndex]}</h1>
            <div className="hero-search">
              <input type="text" placeholder="Search Venue Name/Sports" />
              <select>
                <option>Location</option>
                <option>Delhi</option>
                <option>Mumbai</option>
              </select>
            </div>

            <div className="hero-cards">
              {!isMobile && (
                <button
                  className="nav-btn left"
                  onClick={() => scroll("left")}
                  disabled={startIndex === 0}
                  onMouseEnter={() => setHoveredArrow('left')}
                  onMouseLeave={() => setHoveredArrow(null)}
                >
                  <img src={leftArrow} alt="Left Arrow" className="hero-arrow left-arrow" />
                </button>)}
              <div className="card-list">
                {data.carddata.slice(startIndex, startIndex + visibleCount).map((item, index) => {
                  let extraClass = "";
                  if (hoveredArrow === "left" && index === 0 && startIndex > 0) {
                    extraClass = "hover-effect";
                  }
                  if (hoveredArrow === "right" && index === visibleCount - 1 && startIndex < totalCards - visibleCount) {
                    extraClass = "hover-effect";
                  }

                  return (
                    <InfoCard
                      key={index}
                      title={item.title}
                      subtitle={item.subtitle}
                      video={item.video}
                      className={extraClass}
                      routePath={item.route}
                    />
                  );
                })}
              </div>
              {/* {!isMobile && ( */}
              <button
                className="nav-btn right"
                onClick={() => scroll("right")}
                disabled={startIndex >= totalCards - visibleCount}
                onMouseEnter={() => setHoveredArrow('right')}
                onMouseLeave={() => setHoveredArrow(null)}
              >
                <img src={rightArrow} alt="Right Arrow" className="hero-arrow right-arrow" />
              </button>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Hero;
