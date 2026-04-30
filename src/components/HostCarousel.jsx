import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "./StyleSheets/HostCarousal.module.css";
import cursorArrow from "../assets/cursorArrow.png";
import { useFetchHostList } from "../hooks/Hostlist/useFetchHostList.jsx";
import { useSelector } from "react-redux";
import { HostCard } from "./HostCard.jsx";
import gameImage from "../features/withoutauth/assets/gameImage.png";
import gameImage1 from "../features/withoutauth/assets/gameImage1.png";
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

const HostCarousel = () => {
  const { lat, lng } = useSelector((state) => state.location);
  const [index] = useState(0);
  const visibleCount = 4;
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const { data, isLoading, error } = useFetchHostList({ lat, lng });
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
        <h3>Book Game</h3>
        <Link to="/Host" className={styled.seeall}>
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
          {venues.slice(index, index + visibleCount).map((host) => {
            const formattedHost = {
              id: host?.id,
              type: host?.activity_type,
              host: host?.host_name,
              hostImage: host?.host_image,
              address: host?.full_address,
              distance: host?.distance_km,
              city: host?.city,
              state: host?.state,
              totalPlayer: host?.total_players,
              startTime: host?.start_time,
              endTime: host?.end_time,
              attendees: host?.going,
              date: `${new Date(host?.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
              })} | ${formatTime(host?.start_time)}‑${formatTime(
                host?.end_time.slice(0, 5)
              )}`,
              skill: host?.game_skill,
              attendeesAvatars: host?.userProfile_image || [
                { profile_image: gameImage },
                { profile_image: gameImage1 },
              ],
            };
            return <HostCard key={host.id} host={formattedHost} />;
          })}
        </div>
        <div className={styled.eventnav} />
      </div>
    </div>
  );
};

export default HostCarousel;
