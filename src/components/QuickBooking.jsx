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
  { title: "Turf",   sub: "Book Sports Turf",   img: book,   path: "/venue",  emoji: "🏟️", color: "#e8f0fd" },
  { title: "Play",   sub: "Find Players Fast",   img: play,   path: "/Host",   emoji: "⚽", color: "#fef3e8" },
  { title: "Run",    sub: "Join Run Clubs",      img: run,    path: "/Run",    emoji: "🏃", color: "#e8fdf0" },
  { title: "Coach",  sub: "Expert Coaches",      img: coach,  path: "/Coach",  emoji: "🎯", color: "#fde8f0" },
  { title: "Events", sub: "Book Fit Events",     img: events, path: "/Events", emoji: "🎪", color: "#f0e8fd" },
  { title: "Gym",    sub: "Pay Per Workout",     img: gym,    path: "/Gym",    emoji: "💪", color: "#e8fdf8" },
];

function QuickBooking() {
  const navigate   = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          CARDS.forEach((_, i) => {
            setTimeout(() => setVisible((p) => [...p, i]), i * 70);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="qb-section" ref={sectionRef}>
      <Container>
        {/* Header */}
        <div className="qb-header">
          <div className="qb-header-left">
            <span className="qb-eyebrow">What are you looking for?</span>
            <h2 className="qb-title">Quick Booking</h2>
          </div>
          <p className="qb-desc">
            Discover and book sports venues, coaches, events and more — all in one tap.
          </p>
        </div>

        {/* Cards */}
        <div className="qb-grid">
          {CARDS.map((card, i) => (
            <button
              key={i}
              className={`qb-card${visible.includes(i) ? " qb-card--in" : ""}`}
              style={{ "--card-bg": card.color, transitionDelay: `${i * 0.06}s` }}
              onClick={() => navigate(card.path)}
              aria-label={`${card.title} — ${card.sub}`}
            >
              {/* Image */}
              <div className="qb-card-img">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>

              {/* Text */}
              <div className="qb-card-body">
                <h3 className="qb-card-title">{card.title}</h3>
                <p className="qb-card-sub">{card.sub}</p>
              </div>

              {/* Arrow */}
              <div className="qb-card-arrow">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Hover shimmer */}
              <div className="qb-card-shimmer" aria-hidden="true" />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default QuickBooking;
