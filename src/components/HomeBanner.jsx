import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./StyleSheets/HomeBanner.css";
import { Link } from "react-router-dom";
import icon from "../assets/homebanner/icon.svg";
import whiteArrow from "../assets/homebanner/white-arrow.svg";
import blueArrow from "../assets/homebanner/blue-arrow.svg";
import bannervdo from "../assets/homebanner/banner-img.gif";
import bannercard from "../assets/homebanner/bannercards.png";

const ROTATING_WORDS = [
  "Turfs",
  "Coaches",
  "Run Clubs",
  "Gyms",
  "Events",
  "Players",
];

const STATS = [
  { value: "1K+",  label: "Active Users"   },
  { value: "75+",  label: "Sports"         },
  { value: "500+", label: "Venues"         },
  { value: "6K+",  label: "Connections"    },
];

function HomeBanner() {
  const [wordIdx, setWordIdx]   = useState(0);
  const [wordFade, setWordFade] = useState(true);
  const [mounted, setMounted]   = useState(false);
  const sectionRef = useRef(null);

  // Mount animation trigger
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Rotating word
  useEffect(() => {
    const id = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setWordIdx((p) => (p + 1) % ROTATING_WORDS.length);
        setWordFade(true);
      }, 400);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hb-section" ref={sectionRef}>
      {/* ── Decorative blobs ── */}
      <div className="hb-blob hb-blob-1" aria-hidden="true" />
      <div className="hb-blob hb-blob-2" aria-hidden="true" />
      <div className="hb-blob hb-blob-3" aria-hidden="true" />
      <div className="hb-grid-overlay" aria-hidden="true" />

      <Container className="hb-container">
        <Row className="align-items-center hb-row">

          {/* ── LEFT COLUMN ── */}
          <Col lg={6} className="hb-left">

            {/* Badge */}
            <div className={`hb-badge${mounted ? " hb-badge--in" : ""}`}>
              <img src={icon} width={20} height={20} alt="" aria-hidden="true" />
              <span>India's Fastest Growing Fitness Community</span>
            </div>

            {/* Headline */}
            <h1 className={`hb-headline${mounted ? " hb-headline--in" : ""}`}>
              Book&nbsp;
              <span className="hb-word-wrap">
                <span className={`hb-word${wordFade ? " hb-word--in" : " hb-word--out"}`}>
                  {ROTATING_WORDS[wordIdx]}
                </span>
              </span>
              <br />
              Near You
            </h1>

            {/* Sub-copy */}
            <p className={`hb-sub${mounted ? " hb-sub--in" : ""}`}>
              Play, host, run, train and compete with local teams.
              <br />
              <strong>We Move as One. Keep India Fit.</strong>
            </p>

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
            <div className={`hb-stats${mounted ? " hb-stats--in" : ""}`}>
              {STATS.map((s, i) => (
                <div className="hb-stat" key={i} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                  <span className="hb-stat-value">{s.value}</span>
                  <span className="hb-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </Col>

          {/* ── RIGHT COLUMN ── */}
          <Col lg={6} className="hb-right">
            <div className={`hb-img-wrap${mounted ? " hb-img-wrap--in" : ""}`}>
              {/* Glow ring */}
              <div className="hb-glow-ring" aria-hidden="true" />
              <img
                src={bannervdo}
                alt="Danta Sports App"
                className="hb-hero-img"
                loading="eager"
              />
              {/* Floating card strip */}
              <div className="hb-card-strip">
                <img src={bannercard} alt="" loading="lazy" />
              </div>
              {/* Floating badge */}
              <div className="hb-float-badge hb-float-badge--top">
                <span className="hb-float-icon">🏆</span>
                <div>
                  <p className="hb-float-title">Top Rated</p>
                  <p className="hb-float-sub">Sports Platform</p>
                </div>
              </div>
              <div className="hb-float-badge hb-float-badge--bottom">
                <span className="hb-float-icon">⚡</span>
                <div>
                  <p className="hb-float-title">Instant Booking</p>
                  <p className="hb-float-sub">Zero Hassle</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ── Wave divider ── */}
      <div className="hb-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}

export default HomeBanner;
