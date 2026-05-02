import React from "react";
import "../stylesheets/About.css";
import "../stylesheets/pages.css";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import about from "../assets/aboutus/about-banner.jpeg";
import DantaStats from "../components/DantaStats";
import CultureValues from "../components/CultureValues";
import Testimonials from "../components/Testimonials";
import DownloadAppSection from "../components/DownloadAppSection";

function About() {
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Our Story</span>
          <h1 className="page-hero-title">
            Building India's Largest<br />
            <span>Fitness Community</span>
          </h1>
          <p className="page-hero-sub">
            DantaSports is a unified fitness platform bringing people together
            through play, training, and community — on and off the field.
          </p>
        </Container>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ── Intro ── */}
      <section className="about-intro">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6} className="pg-reveal-left">
              <span className="pg-eyebrow">Who We Are</span>
              <h2 className="about-section-title">
                More Than a Booking App
              </h2>
              <p className="about-body">
                DantaSports is a unified fitness platform built to bring people
                together through play, training, and community.
              </p>
              <p className="about-body">
                We help sports and fitness enthusiasts discover venues, join games,
                stay active consistently, and grow together on and off the field.
              </p>
              <div className="about-cta-group">
                <Link to="/" className="pg-btn-primary">Get Started</Link>
                <Link to="/venue" className="pg-btn-ghost">Book a Venue</Link>
              </div>
            </Col>
            <Col lg={6} className="pg-reveal-right">
              <div className="about-img-wrap">
                <img src={about} alt="Danta Sports Community" className="about-hero-img" loading="lazy" />
                <div className="about-img-badge">
                  <span>🏆</span>
                  <div>
                    <p className="about-badge-title">India's #1</p>
                    <p className="about-badge-sub">Sports Platform</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "60px 0", background: "#fff" }}>
        <Container>
          <DantaStats />
        </Container>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="about-mv-section">
        <Container>
          <div className="pg-section-header pg-reveal">
            <span className="pg-eyebrow">Purpose</span>
            <h2 className="pg-title">Mission &amp; <span>Vision</span></h2>
          </div>
          <Row className="g-4">
            <Col lg={6} className="pg-reveal" style={{ transitionDelay: ".1s" }}>
              <div className="about-mv-card about-mv-card--mission">
                <div className="about-mv-icon">🎯</div>
                <h3>Our Mission</h3>
                <p className="about-mv-lead">To make fitness a daily lifestyle, not a luxury.</p>
                <p>
                  We aim to empower individuals and communities across India by
                  creating an accessible, structured, and inclusive fitness
                  ecosystem — where anyone can play, train, improve, and belong,
                  regardless of skill level.
                </p>
                <p className="about-mv-tagline"><strong>Keep India Fit.</strong></p>
              </div>
            </Col>
            <Col lg={6} className="pg-reveal" style={{ transitionDelay: ".2s" }}>
              <div className="about-mv-card about-mv-card--vision">
                <div className="about-mv-icon">🔭</div>
                <h3>Our Vision</h3>
                <p className="about-mv-lead">
                  To build India's most trusted and scalable fitness ecosystem.
                </p>
                <p>
                  Where community meets consistency, participation turns into habit,
                  and everyday players become lifelong athletes.
                </p>
                <p>
                  We envision a future where fitness is not occasional, isolated,
                  or intimidating — but social, connected, and sustainable.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Culture & Values ── */}
      <CultureValues />

      {/* ── Founder Notes ── */}
      <section className="about-founders">
        <Container>
          <div className="pg-section-header pg-reveal">
            <span className="pg-eyebrow">Leadership</span>
            <h2 className="pg-title">A Note from the <span>Founders</span></h2>
          </div>
          <Row className="g-4">
            {/* Founder 1 */}
            <Col lg={6} className="pg-reveal" style={{ transitionDelay: ".1s" }}>
              <div className="about-founder-card">
                <div className="about-founder-avatar">S</div>
                <div className="about-founder-body">
                  <p>
                    When I started DantaSports, it wasn't to build just another sports app.
                    It came from a simple observation:{" "}
                    <strong>India doesn't lack talent or intent — it lacks structure and connection.</strong>
                  </p>
                  <p>
                    People want to play. They want to stay fit. They want to belong.
                    But the ecosystem makes it harder than it should be.
                    DantaSports was built to change that.
                  </p>
                  <p>
                    We are creating a platform where fitness is not intimidating,
                    fragmented, or transactional — but <strong>human, social, and consistent.</strong>
                  </p>
                  <p>
                    At its core, DantaSports is about moving together.
                    About progress over perfection. About building habits that last.
                  </p>
                  <p className="about-founder-sign">
                    <strong>— Sabyasachi Mangaraj</strong><br />
                    <span>Co-Founder, DantaSports</span>
                  </p>
                </div>
              </div>
            </Col>
            {/* Founder 2 */}
            <Col lg={6} className="pg-reveal" style={{ transitionDelay: ".2s" }}>
              <div className="about-founder-card">
                <div className="about-founder-avatar">D</div>
                <div className="about-founder-body">
                  <p>
                    I built Danta Sports with a simple belief — fitness isn't about skill,
                    it's about <strong>YOU</strong>. Your journey, your effort, your consistency.
                  </p>
                  <p>
                    Most people want to stay active, but finding the right sports venue,
                    gym, or trainer is still a struggle. Progress gets lost, routines break,
                    and motivation fades.{" "}
                    <strong>Danta Sports was created to remove these barriers.</strong>
                  </p>
                  <p>
                    With Danta, you can book sports venues, check in at gyms, train with
                    certified coaches, and track your progress — all in one place.
                  </p>
                  <p>
                    Danta Sports is not about being the best. It's about showing up,
                    growing, and becoming a better version of yourself — at your pace.
                  </p>
                  <p className="about-founder-sign">
                    <strong>— Deepak Jaiswal</strong><br />
                    <span>Co-Founder, DantaSports</span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "60px 0", background: "#f8fafc" }}>
        <Container>
          <Testimonials />
        </Container>
      </section>

      {/* ── Download App ── */}
      <DownloadAppSection />
    </div>
  );
}

export default About;
