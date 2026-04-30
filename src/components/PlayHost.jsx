import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StyleSheets/BookVenues.css";
import "./StyleSheets/PlayHost.css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import calendarIcon from "../assets/images/home/bookrun/date.svg";
import locationIcon from "../assets/images/home/bookrun/map.svg";
import profile1 from "../assets/images/home/playhost/user1.png";
import profile2 from "../assets/images/home/playhost/user2.png";
import { useFetchHostList } from "../hooks/Hostlist/useFetchHostList.jsx";

function formatTime(t = "00:00") {
  if (!t) return "";
  const [h, m, s = 0] = t.split(":").map(Number);
  const d = new Date(); d.setHours(h, m, s);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

const SKILL_MAP = {
  0: { label: "Novice",  color: "#18429F" },
  1: { label: "Learner", color: "#0FA903" },
  2: { label: "Skilled", color: "#FFA200" },
  3: { label: "Expert",  color: "#E65B00" },
  4: { label: "Elite",   color: "#4C2DFF" },
};

const ACTIVITY_LABEL = { 1: "Regular", 2: "Coaching", 3: "Tournament" };

export default function PlayHost() {
  const { lat, lng } = useSelector((s) => s.location);
  const [sectionRef, sectionVisible] = useIntersectionObserver({ threshold: 0.06 });
  const { data, isLoading } = useFetchHostList({ lat, lng });
  const hosts = data?.result || [];

  const handleClick = () => window.open("https://play.google.com/store/apps", "_blank");

  if (isLoading || !hosts.length) return null;

  return (
    <section className={`hs-section hs-section--alt${sectionVisible ? " section-in" : ""}`} ref={sectionRef}>
      <Container>
        <div className="hs-header">
          <div className="hs-title-wrap">
            <span className="hs-eyebrow">Community</span>
            <h2 className="hs-title">Play &amp; Host</h2>
          </div>
          <Link to="/Host" className="hs-see-all">
            See All
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className="hs-grid">
          {hosts.slice(0, 4).map((host) => {
            const skill = SKILL_MAP[host.game_skill] || SKILL_MAP[2];
            const dateText = `${new Date(host?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} | ${formatTime(host?.start_time)}`;
            const attendees = host?.userProfile_image?.length
              ? host.userProfile_image
              : [{ profile_image: profile1 }, { profile_image: profile2 }];

            return (
              <div className="hs-card ph-card" key={host.id} onClick={handleClick} role="button" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}>
                {/* Activity type badge */}
                <div className="ph-type-badge">{ACTIVITY_LABEL[host.activity_type] || "Regular"}</div>

                {/* Attendees */}
                <div className="ph-attendees">
                  <div className="ph-avatars">
                    {attendees.slice(0, 3).map((a, i) => (
                      <img key={i} src={a.profile_image || profile1} alt="player"
                        className="ph-avatar" style={{ zIndex: 3 - i }}
                        onError={(e) => { e.target.src = profile1; }} />
                    ))}
                  </div>
                  <div className="ph-going">
                    <span className="ph-dot" />
                    <span>{host.going || 0} Going</span>
                  </div>
                </div>

                {/* Host name */}
                <p className="ph-host-by">
                  Host By: <strong>{host.host_name || "Unknown"}</strong>
                </p>

                {/* Date */}
                <div className="ph-meta">
                  <img src={calendarIcon} alt="" />
                  <span>{dateText}</span>
                </div>

                {/* Location */}
                <div className="ph-meta">
                  <img src={locationIcon} alt="" />
                  <span>{host.city || "—"}, {host.state || ""} (~{host.distance_km?.toFixed(1) || "0"} km)</span>
                </div>

                {/* Skill */}
                <div className="ph-footer">
                  <span className="ph-skill" style={{ color: skill.color }}>{skill.label}</span>
                  <span className="ph-join">Join →</span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
