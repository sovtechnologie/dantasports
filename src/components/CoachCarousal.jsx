import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "./StyleSheets/CoachCarousal.module.css";
import HomeCoachCard from "./HomeCoachCard.jsx";
import { Link } from "react-router-dom";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchCoach } from "../hooks/CoachList/useFetchCoach.js";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const CoachCarousel = () => {
  const { lat, lng } = useSelector((state) => state.location);
  const [index] = useState(0);
  const visibleCount = 4;
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const { data: AllCoachdata, isLoading, error } = useFetchCoach({ lat, lng });
  const venues = AllCoachdata?.result || [];

  if (isLoading) return null;
  if (error) return null;
  if (!venues.length) return null;

  return (
    <div
      ref={ref}
      className={`${styled.eventsectioncontainer}${isVisible ? ` ${styled["section-visible"]}` : ""}`}
    >
      <div className={styled.eventsheader}>
        <h3>Book Coach</h3>
        <Link to="/Coach" className={styled.seeall}>
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
          {venues.slice(index, index + visibleCount).map((coach) => {
            const formattedEvent = {
              id: coach.id,
              image: coach.desktop_image || coach.mobile_image,
              name: coach.name,
              location: `${coach.locations?.area}, ${coach.locations?.city}`,
              rating: coach.average_rating || 0,
              ratingCount: coach.review_count || 0,
              sportIcon: coach.linked_sports,
              category: coach.training_type,
              tag: coach.type === 1 ? "Trainer" : "Academy",
            };
            return <HomeCoachCard key={coach.id} coach={formattedEvent} />;
          })}
        </div>
        <div className={styled.eventnav} />
      </div>
    </div>
  );
};

export default CoachCarousel;
