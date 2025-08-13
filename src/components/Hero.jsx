import React, { useEffect, useRef, useState } from 'react';
import "./StyleSheets/Hero.css"; // Assuming you have a CSS file for styling

import { googleMapsLoader } from "../utils/locationSearch.js"
import leftCharacters from "../assets/heroImages/character-left.png";
import rightCharacters from "../assets/heroImages/character-right.png"
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import data from "../StaticData/infocard.js";
import InfoCard from './InfoCard';
import searchlogo from "../assets/Search.png";


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
  const [searchTerm, setSearchTerm] = useState("");
  // const visibleCount = 4;
  const totalCards = data.carddata.length;
  const [predictions, setPredictions] = useState([]);
  const [search, setSearch] = useState("");
  const [service, setService] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const loadPlaces = async () => {
      await googleMapsLoader.importLibrary("places");
      if (window.google) {
        setService(new window.google.maps.places.AutocompleteService());
      }
    };
    loadPlaces();
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value && service) {
      service.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: "in" },
          types: ["(cities)"], // Or "geocode"
        },
        (preds) => {
          setPredictions(preds || []);
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handleSelect = (prediction) => {
    setSearch(prediction.description);
    setPredictions([]);

    // Optional: Get lat/lng from Place Details
    const placesService = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    placesService.getDetails(
      { placeId: prediction.place_id, fields: ["geometry", "formatted_address"] },
      (place) => {
        if (place && place.geometry) {
          console.log("Selected:", place.formatted_address);
          console.log("Lat:", place.geometry.location.lat());
          console.log("Lng:", place.geometry.location.lng());
        }
      }
    );
  };

  //   useEffect(() => {
  //   const initAutocomplete = async () => {
  //     await googleMapsLoader.importLibrary("maps");
  //     await googleMapsLoader.importLibrary("places");

  //     if (window.google && inputRef.current) {
  //       const autocomplete = new window.google.maps.places.Autocomplete(
  //         inputRef.current,
  //         {
  //           types: ["(cities)"],
  //           componentRestrictions: { country: "in" },
  //         }
  //       );

  //       autocomplete.addListener("place_changed", () => {
  //         const place = autocomplete.getPlace();
  //         if (!place.geometry) return;

  //         const lat = place.geometry.location.lat();
  //         const lng = place.geometry.location.lng();

  //         console.log("Selected Place:", place.formatted_address || place.name);
  //         console.log("Latitude:", lat);
  //         console.log("Longitude:", lng);

  //         setSearchTerm(place.formatted_address || place.name);
  //       });
  //     }
  //   };

  //   initAutocomplete();
  // }, []);

  //  useEffect(() => {
  //   const initAutocomplete = async () => {

  //     // Make sure base google object exists
  //     await  googleMapsLoader.importLibrary("maps");
  //     // Load Places API
  //     await  googleMapsLoader.importLibrary("places");
  //     console.log("search",inputRef.current)

  //     if (window.google && inputRef.current) {
  //       const autocomplete = new window.google.maps.places.Autocomplete(
  //         inputRef.current,
  //         {
  //           types: ["(cities)"], // or 'geocode'
  //           componentRestrictions: { country: "in" },
  //         }
  //       );

  //       autocomplete.addListener("place_changed", () => {
  //         const place = autocomplete.getPlace();
  //         if (!place.geometry) return;

  //         const lat = place.geometry.location.lat();
  //         const lng = place.geometry.location.lng();

  //         console.log("Selected Place:", place.formatted_address || place.name);
  //         console.log("Latitude:", lat);
  //         console.log("Longitude:", lng);

  //         setSearchTerm(place.formatted_address || place.name);
  //       });
  //     }
  //   };

  //   initAutocomplete();
  // }, []);

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
              <div className="search-input-wrapper">
                <img src={searchlogo} height={35} width={35} alt='searchlogo' />
                {/* <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by venue, sport or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
                <div style={{ width: "100%", position: "relative" }}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={handleInput}
                    placeholder="Search by venue, sport or location"
                    style={{
                      width: "100%",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  />
                  {predictions.length > 0 && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderTop: "none",
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 9999,
                      }}
                    >
                      {predictions.map((p) => (
                        <li
                          key={p.place_id}
                          onClick={() => handleSelect(p)}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                            color:"#333"
                          }}
                          onMouseEnter={(e) => (e.target.style.background = "#f0f0f0")}
                          onMouseLeave={(e) => (e.target.style.background = "transparent")}
                        >
                          {p.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
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
                  <img src={leftArrow} alt="Left Arrow" className="hero-arrow" />
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
                      image={item.image}
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
                <img src={rightArrow} alt="Right Arrow" className="hero-arrow" />
              </button>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Hero;
