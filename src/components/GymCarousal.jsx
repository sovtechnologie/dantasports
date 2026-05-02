import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "./StyleSheets/GymCarousal.module.css";
import HomeGymCard from "./HomeGymCard.jsx";
import { Link } from "react-router-dom";
import leftArrow from "../assets/svg-icons/chevron-left-circle.svg";
import rightArrow from "../assets/svg-icons/chevron-right-circle.svg";
import cursorArrow from "../assets/svg-icons/arrow-right.svg";
import { useFetchGym } from "../hooks/GymList/useFetchGym.js";
import fallback from "../assets/images/home/bookgym/bookgym.png";

const fallbackGyms = [
  { Id: "gym-fallback-1", gym_name: "Danta Fitness Studio", desktop_image: fallback, full_address: "Indiranagar, Bengaluru", distance: 2.6, average_rating: 4.8, review_count: 118, gym_price_slot: [{ price: 299 }] },
  { Id: "gym-fallback-2", gym_name: "Iron Yard Gym", desktop_image: fallback, full_address: "Koramangala, Bengaluru", distance: 3.7, average_rating: 4.6, review_count: 91, gym_price_slot: [{ price: 349 }] },
  { Id: "gym-fallback-3", gym_name: "Pulse Training Club", desktop_image: fallback, full_address: "HSR Layout, Bengaluru", distance: 4.1, average_rating: 4.7, review_count: 86, gym_price_slot: [{ price: 399 }] },
  { Id: "gym-fallback-4", gym_name: "Core Strength Arena", desktop_image: fallback, full_address: "Whitefield, Bengaluru", distance: 5.3, average_rating: 4.9, review_count: 102, gym_price_slot: [{ price: 449 }] },
];

const GymCarousel = () => {
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const [index, setIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
  const visibleCount = 4;
  const payload = {
    lat: lat,
    lng: lng,
    userId: userId || null,
  };
  const { data: AllGymdata } = useFetchGym(payload);

  const venues = AllGymdata?.result || [];
  const carouselItems = venues.length ? venues : fallbackGyms;

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
        <h3>Book Gym</h3>
        <Link to="/gym" className={styled.seeall}>
          See All
          <img
            src={cursorArrow}
            style={{ marginLeft: "8px", width: "10px" }}
            alt="cursorArrow"
          />
        </Link>
      </div>

      <div className={styled.eventcarouselwrapper}>
        <div className={styled.eventcarouseltrack}>
          {carouselItems.slice(index, index + visibleCount).map((gym, i) => {
            let extraClass = "";
            if (hoveredArrow === "prev" && i === 0 && index > 0) {
              extraClass = "hover-effect";
            }
            if (
              hoveredArrow === "next" &&
              i === visibleCount - 1 &&
              index < carouselItems.length - visibleCount
            ) {
              extraClass = "hover-effect";
            }

            const minPriceObj = gym.gym_price_slot?.length
              ? gym.gym_price_slot.reduce((min, curr) => curr.price < min.price ? curr : min)
              : { price: 0 };
            const formattedEvent = {
              id: gym.Id,
              image: gym.desktop_image || gym.mobile_image || fallback,
              title: gym.gym_name,
              location: gym.full_address,
              distance: Math.floor(gym.distance) || 0,
              rating: gym.average_rating || 0,
              ratingCount: gym.review_count || 0,
              discountText: gym.discountText || "Upto 50% off",
              priceText: minPriceObj.price ? `${minPriceObj.price} onwards` : "",
              vendorId: gym.vendor_id,
            };

            return (
              <div key={gym.Id || gym.id} className={extraClass}>
                <HomeGymCard gym={formattedEvent} />
              </div>
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

export default GymCarousel;
