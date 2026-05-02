import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "./StyleSheets/EventCarousal.module.css";
import leftArrow from "../assets/svg-icons/chevron-left-circle.svg";
import rightArrow from "../assets/svg-icons/chevron-right-circle.svg";
import cursorArrow from "../assets/svg-icons/arrow-right.svg";
import { useFetchEvent } from "../hooks/EventList/useFetchEvents.js";
import HomeEventCard from "./HomeEventCard.jsx";
import { useSelector } from "react-redux";
import fallback from "../assets/images/home/bookevents/bookevents.png";

const fallbackEvents = [
  { id: "event-fallback-1", event_title: "Weekend Football League", average_rating: 4.8, review_count: 121, lowest_ticket_price: 499, locations: [{ area: "Sports Hub", city: "Bengaluru" }], start_date: "2026-05-12", end_date: "2026-05-12", start_time: "17:00:00", end_time: "19:00:00", desktop_image: fallback, sports: [] },
  { id: "event-fallback-2", event_title: "Open Badminton Cup", average_rating: 4.7, review_count: 88, lowest_ticket_price: 349, locations: [{ area: "Indoor Arena", city: "Bengaluru" }], start_date: "2026-05-18", end_date: "2026-05-19", start_time: "09:00:00", end_time: "13:00:00", desktop_image: fallback, sports: [] },
  { id: "event-fallback-3", event_title: "Cricket Super Sunday", average_rating: 4.6, review_count: 76, lowest_ticket_price: 599, locations: [{ area: "Red Meadows", city: "Bengaluru" }], start_date: "2026-05-25", end_date: "2026-05-25", start_time: "15:30:00", end_time: "18:30:00", desktop_image: fallback, sports: [] },
  { id: "event-fallback-4", event_title: "Fitness Challenge Fest", average_rating: 4.9, review_count: 104, lowest_ticket_price: 449, locations: [{ area: "City Stadium", city: "Bengaluru" }], start_date: "2026-05-30", end_date: "2026-05-30", start_time: "07:00:00", end_time: "10:00:00", desktop_image: fallback, sports: [] },
];

// Formats "15:00", "15:00:30" → "03:00 PM"
function formatTime(timeStr = "00:00") {
  if (!timeStr) return ""; // Return an empty string or suitable default

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
  const coords = {
    lat: lat,
    lng: lng,
    type: 1,
    userId: null,
  };
  const [hoveredArrow, setHoveredArrow] = useState(null); // 'prev' | 'next' | null
  const visibleCount = 4;

  const { data } = useFetchEvent(coords);

  const venues = data?.result || [];
  const carouselItems = venues.length ? venues : fallbackEvents;

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
        <h3>Book Event</h3>
        <Link to="/events" className={styled.seeall}>
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
          {carouselItems.slice(index, index + visibleCount).map((evt, i) => {
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
            const formattedEvent = {
              id: evt.id,
              name: evt.event_title,
              rating: evt.average_rating ?? 0,
              type: evt?.event_type,
              RatingCount: evt.review_count ?? 0,
              price: evt.lowest_ticket_price ? `₹${parseInt(evt.lowest_ticket_price)} onwards` : "",
              offer: evt.offer ?? "No offer",
              favourite: evt?.favourite,
              favourite_event_id: evt?.favourite_event_id,
              location:
                `${evt.locations?.[0]?.area || ""}, ${evt.locations?.[0]?.city || ""}`.replace(/^,\s*/, ""),
              date: `${new Date(evt.start_date || Date.now()).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })} – ${new Date(evt.end_date || evt.start_date || Date.now()).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })} | ${formatTime(evt.start_time)}‑${formatTime(evt.end_time?.slice(0, 5))}`,
              image: evt.desktop_image || fallback,
              sportIcon: evt.sports || "",
            };

            return (
              <div key={evt.id} className={extraClass}>
                <HomeEventCard event={formattedEvent} />
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

export default EventCarousel;
