import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./StyleSheets/QuickBooking.css";

import book   from "../assets/images/home/quickbooking/Deckturf.png";
import play   from "../assets/images/home/quickbooking/Deckplay.png";
import run    from "../assets/images/home/quickbooking/DeckRun.png";
import coach  from "../assets/images/home/quickbooking/Deckcoach.png";
import events from "../assets/images/home/quickbooking/DeckEvent.png";
import gym    from "../assets/images/home/quickbooking/Deckgym.png";

const CARDS = [
  { title:"Turf",   sub:"Book Sports Turf",  img:book,   path:"/venue",  color:"#dbeafe", accent:"#1163C7", emoji:"🏟️" },
  { title:"Play",   sub:"Find Players Fast", img:play,   path:"/Host",   color:"#fef3c7", accent:"#D97706", emoji:"⚽" },
  { title:"Run",    sub:"Join Run Clubs",    img:run,    path:"/Run",    color:"#dcfce7", accent:"#16A34A", emoji:"🏃" },
  { title:"Coach",  sub:"Expert Coaches",   img:coach,  path:"/Coach",  color:"#fce7f3", accent:"#DB2777", emoji:"🎯" },
  { title:"Events", sub:"Book Fit Events",  img:events, path:"/Events", color:"#ede9fe", accent:"#7C3AED", emoji:"🎪" },
  { title:"Gym",    sub:"Pay Per Workout",  img:gym,    path:"/Gym",    color:"#ccfbf1", accent:"#0D9488", emoji:"💪" },
];

export default function QuickBooking() {
  const navigate   = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          CARDS.forEach((_, i) => setTimeout(() => setVisible(p => [...p, i]), i * 65));
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="qb-section" ref={sectionRef}>
      {/* Background pattern */}
      <div className="qb-bg" aria-hidden="true" />

      <Container>
        {/* Header */}
        <div className="qb-header">
          <div>
            <span className="qb-eyebrow">What are you looking for?</span>
            <h2 className="qb-title">Quick Booking</h2>
          </div>
          <p className="qb-desc">
            Discover and book sports venues, coaches, events and more — all in one tap.
          </p>
        </div>

        {/* Grid */}
        <div className="qb-grid">
          {CARDS.map((card, i) => (
            <button
              key={i}
              className={`qb-card${visible.includes(i) ? " qb-card--in" : ""}`}
              style={{ "--qb-color": card.color, "--qb-accent": card.accent, transitionDelay: `${i * 0.055}s` }}
              onClick={() => navigate(card.path)}
              aria-label={`${card.title} — ${card.sub}`}
            >
              {/* Top accent bar */}
              <div className="qb-card-bar" aria-hidden="true" />

              {/* Image */}
              <div className="qb-card-img">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>

              {/* Text */}
              <div className="qb-card-body">
                <h3 className="qb-card-title">{card.title}</h3>
                <p className="qb-card-sub">{card.sub}</p>
              </div>

              {/* Arrow chip */}
              <div className="qb-card-cta">
                <span>Explore</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Shimmer */}
              <div className="qb-shimmer" aria-hidden="true" />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
