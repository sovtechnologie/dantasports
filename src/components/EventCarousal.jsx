import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "./StyleSheets/EventCarousal.module.css";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchEvent } from "../hooks/EventList/useFetchEvents.js";
import HomeEventCard from "./HomeEventCard.jsx";
import { useSelector } from "react-redux";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function formatTime(timeStr = "00:00") {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  const h = Number(parts[0] || 0);
  const m = Number(parts[1] || 0);
  const s = parts.length > 2 ? Number(parts[2]) : 0;
  const dt = new Date();
  dt.setHours(h, m, s);
  return dt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const EventCarousel = () => {
  const { lat, lng } = useSelector((state) => state.location);
  const [index, setIndex] = useState(0);
  const [coords] = useState({ lat, lng, type: 1, userId: null });
  const visibleCount = 4;
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const { data, isLoading, error } = useFetchEvent(coords);
  const venues = data?.result || [];

  if (isLoading) return null;
  if (error) return null;
  if (!venues.length) return null;

  return (
    <div
      ref={ref}
      className={`${styled.eventsectioncontainer}${isVisible ? ` ${styled["section-visible"]}` : ""}`}
    >
      <div className={styled.eventsheader}>
        <h3>Book Event</h3>
        <Link to="/Events" className={styled.seeall}>
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
          {venues.slice(index, index + visibleCount).map((evt) => {
            const formattedEvent = {
              id: evt.id,
              name: evt.event_title,
              rating: evt.average_rating ?? 0,
              type: evt?.event_type,
              RatingCount: evt.review_count ?? 0,
              price: `₹${parseInt(evt.lowest_ticket_price)} onwards`,
              offer: evt.offer ?? "No offer",
              favourite: evt?.favourite,
              favourite_event_id: evt?.favourite_event_id,
              location: `${evt.locations[0]?.area}, ${evt.locations[0]?.city}` || "",
              date: `${new Date(evt.start_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })} – ${new Date(evt.end_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })} | ${formatTime(evt.start_time)}‑${formatTime(evt.end_time.slice(0, 5))}`,
              image: evt.desktop_image,
              sportIcon: evt.sports || "",
            };
            return <HomeEventCard key={evt.id} event={formattedEvent} />;
          })}
        </div>
        <div className={styled.eventnav} />
      </div>
    </div>
  );
};

export default EventCarousel;
