import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StyleSheets/HomeBanner.css";
import { Link } from "react-router-dom";
import icon       from "../assets/homebanner/icon.svg";
import whiteArrow from "../assets/homebanner/white-arrow.svg";
import bannervdo  from "../assets/homebanner/banner-img.gif";
import bannercard from "../assets/homebanner/bannercards.png";

const WORDS = ["Turfs", "Coaches", "Run Clubs", "Gyms", "Events", "Players"];

const STATS = [
  { value: "1K+",  label: "Users",      icon: "👥" },
  { value: "75+",  label: "Sports",     icon: "🏅" },
  { value: "500+", label: "Venues",     icon: "📍" },
  { value: "6K+",  label: "Connections",icon: "🤝" },
];

const FEATURES = [
  { icon: "⚡", text: "Instant Booking" },
  { icon: "📍", text: "Near You"        },
  { icon: "🔒", text: "Secure Pay"      },
];

export default function HomeBanner() {
  const [wordIdx,  setWordIdx]  = useState(0);
  const [wordFade, setWordFade] = useState(true);
  const [mounted,  setMounted]  = useState(false);
  const [statIn,   setStatIn]   = useState(false);
  const ref = useRef(null);

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setTimeout(() => setStatIn(true), 900); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWordFade(false);
      setTimeout(() => { setWordIdx(p => (p + 1) % WORDS.length); setWordFade(true); }, 380);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hb-section" ref={ref} aria-label="Hero banner">
      {/* ── Animated background layers ── */}
      <div className="hb-bg-mesh"    aria-hidden="true" />
      <div className="hb-bg-glow-1"  aria-hidden="true" />
      <div className="hb-bg-glow-2"  aria-hidden="true" />
      <div className="hb-bg-glow-3"  aria-hidden="true" />
      <div className="hb-bg-grid"    aria-hidden="true" />
      <div className="hb-bg-dots"    aria-hidden="true" />

      <Container className="hb-container">
        <Row className="hb-row align-items-center">

          {/* ══ LEFT ══ */}
          <Col lg={6} className="hb-left">

            {/* Community pill */}
            <div className={`hb-pill${mounted ? " hb-pill--in" : ""}`}>
              <img src={icon} width={18} height={18} alt="" aria-hidden="true" />
              <span>India's Fastest Growing Fitness Community</span>
              <span className="hb-pill-dot" aria-hidden="true" />
            </div>

            {/* Headline */}
            <h1 className={`hb-headline${mounted ? " hb-headline--in" : ""}`}>
              <span className="hb-headline-line1">Book</span>
              {" "}
              <span className="hb-word-wrap">
                <span className={`hb-word${wordFade ? " hb-word--in" : " hb-word--out"}`}>
                  {WORDS[wordIdx]}
                </span>
              </span>
              <br />
              <span className="hb-headline-line2">Near You</span>
            </h1>

            {/* Sub-copy */}
            <p className={`hb-sub${mounted ? " hb-sub--in" : ""}`}>
              Play, host, run, train and compete with local teams.
              <br />
              <strong>We Move as One. Keep India Fit.</strong>
            </p>

            {/* Feature chips */}
            <div className={`hb-chips${mounted ? " hb-chips--in" : ""}`}>
              {FEATURES.map((f, i) => (
                <span className="hb-chip" key={i}>
                  <span>{f.icon}</span> {f.text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className={`hb-ctas${mounted ? " hb-ctas--in" : ""}`}>
              <Link to="/venue" className="hb-btn hb-btn--primary">
                Book a Turf
                <img src={whiteArrow} alt="" aria-hidden="true" className="hb-btn-arrow" />
              </Link>
              <Link to="/about" className="hb-btn hb-btn--ghost">
                Learn More
              </Link>
            </div>

            {/* Stats strip */}
            <div className={`hb-stats${statIn ? " hb-stats--in" : ""}`}>
              {STATS.map((s, i) => (
                <div className="hb-stat" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="hb-stat-icon" aria-hidden="true">{s.icon}</span>
                  <span className="hb-stat-value">{s.value}</span>
                  <span className="hb-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </Col>

          {/* ══ RIGHT ══ */}
          <Col lg={6} className="hb-right">
            <div className={`hb-visual${mounted ? " hb-visual--in" : ""}`}>

              {/* Orbit rings */}
              <div className="hb-orbit hb-orbit-1" aria-hidden="true" />
              <div className="hb-orbit hb-orbit-2" aria-hidden="true" />

              {/* Main image */}
              <div className="hb-img-frame">
                <div className="hb-img-glow" aria-hidden="true" />
                <img src={bannervdo} alt="Danta Sports App" className="hb-hero-img" loading="eager" />
              </div>

              {/* Card strip */}
              <div className="hb-card-strip" aria-hidden="true">
                <img src={bannercard} alt="" loading="lazy" />
              </div>

              {/* Floating info cards */}
              <div className="hb-float hb-float--tl">
                <span className="hb-float-emoji">🏆</span>
                <div>
                  <p className="hb-float-title">Top Rated</p>
                  <p className="hb-float-sub">Sports Platform</p>
                </div>
              </div>

              <div className="hb-float hb-float--br">
                <span className="hb-float-emoji">⚡</span>
                <div>
                  <p className="hb-float-title">Instant Booking</p>
                  <p className="hb-float-sub">Zero Hassle</p>
                </div>
              </div>

              {/* Live indicator */}
              <div className="hb-live" aria-label="Live">
                <span className="hb-live-dot" aria-hidden="true" />
                <span>Live</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Wave */}
      <div className="hb-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
