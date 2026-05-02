import React from "react";
import "../Stylesheets/CorporateBookingPage.css";
import "../../../stylesheets/pages.css";
import { Container } from "react-bootstrap";
import CorporateBooking from "../../../assets/svg-icons/booking.svg";
import BenefitCard from "../components/BenefitCard";
import SportEventCardList from "../components/SportEventCardList";
import CorporateBookingForm from "../components/CorporateBookingForm";
import OurGallery from "../components/OurGallery";
import { benefits } from "../StaticData/CorportateData.js";
import DownloadAppSection from "../../../components/DownloadAppSection.jsx";

function CorporateBookingPage() {
  const handleDemo = () => {
    document.getElementById("corporate-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Corporate Wellness</span>
          <h1 className="page-hero-title">
            Let Us Take Charge of<br />
            <span>Your Employee Wellness</span>
          </h1>
          <p className="page-hero-sub">
            Sports-led corporate wellness programs, simplified. DantaSports helps
            organizations design, manage, and scale employee fitness through sports
            events, venue bookings, and long-term activity programs.
          </p>
          <div className="partner-hero-ctas">
            <button className="pg-btn-primary" onClick={handleDemo}>
              Request a Demo
            </button>
            <button className="pg-btn-ghost" onClick={handleDemo}>
              Book a Call With Us
            </button>
          </div>
        </Container>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#f1f3f2" />
          </svg>
        </div>
      </div>

      {/* ── Trusted by ── */}
      <section style={{ background: "#f1f3f2" }} className="pt-4 pt-lg-5 pb-4 pb-lg-5">
        <Container>
          <div className="corporate-booking">
            <h2>Trusted by <span>the Best</span></h2>
            <p className="text-center" style={{ color: "#757575", fontSize: "17px", maxWidth: 560, margin: "0 auto" }}>
              Companies choose DantaSports to power consistent, engaging, and measurable
              employee wellness initiatives across cities.
            </p>
          </div>
          <div className="clients-carousel corporate_events mt-4">
            <BenefitCard benefits={benefits} />
          </div>
        </Container>
      </section>

      {/* ── Corporate Sports Events ── */}
      <Container className="my-lg-5 my-4">
        <div className="Corporate-sport-event row align-items-center g-4">
          <div className="col-lg-5 col-md-6 col-10 m-auto">
            <div className="corp-img-wrap">
              <img src={CorporateBooking} alt="Corporate Wellness" className="w-100" />
            </div>
          </div>
          <div className="col-lg-7 col-md-6 col-12">
            <span className="pg-eyebrow">End-to-End</span>
            <h2 className="corp-section-title">
              Corporate Sports Events,{" "}
              <span>Fully Managed</span>
            </h2>
            <p className="corp-body">
              From friendly tournaments to multi-company leagues, we handle
              everything — so your teams focus on playing.
            </p>
            <ul className="corp-feature-list">
              <li>Inter-office tournaments</li>
              <li>Annual sports days</li>
              <li>City-wide corporate leagues</li>
              <li>One-day or recurring formats</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* ── Gallery ── */}
      <Container>
        <OurGallery />
      </Container>

      {/* ── Services & Form ── */}
      <section style={{ background: "#f1f3f2" }} className="py-5" id="corporate-form">
        <Container>
          <div className="pg-section-header">
            <span className="pg-eyebrow">Services</span>
            <h2 className="pg-title">
              Corporate &amp; Long-Term / <span>Bulk Booking</span>
            </h2>
            <p className="pg-sub">
              Designed for organizations looking for consistent, scalable sports
              access for employees.
            </p>
          </div>
          <SportEventCardList />
          <div className="mt-5">
            <CorporateBookingForm />
          </div>
        </Container>
      </section>

      <DownloadAppSection />
    </>
  );
}

export default CorporateBookingPage;
