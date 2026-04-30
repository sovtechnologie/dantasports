import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "./StyleSheets/GymCarousal.module.css";
import HomeGymCard from "./HomeGymCard.jsx";
import { Link } from "react-router-dom";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchGym } from "../hooks/GymList/useFetchGym.js";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const GymCarousel = () => {
  const userId = useSelector((state) => state.auth.id);
  const { lat, lng } = useSelector((state) => state.location);
  const [index] = useState(0);
  const visibleCount = 4;
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const payload = { lat, lng, userId: userId || null };
  const { data: AllGymdata, isLoading, error } = useFetchGym(payload);
  const venues = AllGymdata?.result || [];

  if (isLoading) return null;
  if (error) return null;
  if (!venues.length) return null;

  return (
    <div
      ref={ref}
      className={`${styled.eventsectioncontainer}${isVisible ? ` ${styled["section-visible"]}` : ""}`}
    >
      <div className={styled.eventsheader}>
        <h3>Book Gym</h3>
        <Link to="/Gym" className={styled.seeall}>
          See All
          <img
            src={cursorArrow}
            style={{ marginLeft: "6px", width: "10px" }}
            alt=""
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className={styled.eventcarouselwrapper}>
        <div className={styled.eventcarouseltrack}>
          {venues.slice(index, index + visibleCount).map((gym) => {
            const minPriceObj = gym.gym_price_slot.reduce((min, curr) =>
              curr.price < min.price ? curr : min
            );
            const formattedEvent = {
              id: gym.Id,
              image: gym.desktop_image || gym.mobile_image,
              title: gym.gym_name,
              location: gym.full_address,
              distance: Math.floor(gym.distance) || 0,
              rating: gym.average_rating || 0,
              ratingCount: gym.review_count || 0,
              discountText: gym.discountText || "Upto 50% off",
              priceText: `${minPriceObj.price} onwards` || "0 onwards",
              vendorId: gym.vendor_id,
            };
            return <HomeGymCard key={gym.id} gym={formattedEvent} />;
          })}
        </div>
        <div className={styled.eventnav} />
      </div>
    </div>
  );
};

export default GymCarousel;
