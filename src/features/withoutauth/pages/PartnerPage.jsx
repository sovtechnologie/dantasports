import React from "react";
import "../Stylesheets/PartnerPage.css";
import "../../../stylesheets/pages.css";
import { Container } from "react-bootstrap";
import ZeroCommissionBanner from "../components/ZeroCommissionBanner";
import BenefitCard from "../components/BenefitCard";
import partnerData from "../StaticData/PartnerData.js";
import FacilityManagement from "../components/FacilityManagement.jsx";
import AnalyticsCapabilities from "../components/AnalyticsCapabilities.jsx";
import PaymentSolutions from "../components/PaymentSolutions.jsx";
import PaymentFeatures from "../components/PaymentFeatures.jsx";
import OnboardingSupport from "../components/OnboardingSupport.jsx";
import PartnerWithUs from "../components/PartnerWithUs.jsx";
import Ready from "../components/Ready.jsx";
import CoachSection from "../components/CoachSection.jsx";
import PartnerForm from "../components/PartnerForm.jsx";

function PartnerPage() {
  const handleDemo = () => {
    document.getElementById("partner-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Hero ── */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Partner With Us</span>
          <h1 className="page-hero-title">
            Grow Your Sports Business.<br />
            <span>Zero Heavy Commissions.</span>
          </h1>
          <p className="page-hero-sub">
            Transform how you manage bookings, clients, and revenue with India's
            fastest-growing sports &amp; fitness platform.
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
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#F1F3F2" />
          </svg>
        </div>
      </div>

      {/* ── Benefits ── */}
      <section style={{ background: "#F1F3F2" }} className="pt-4 pt-lg-5 pb-lg-5 pb-4">
        <div className="zero-banner-wrapper">
          <ZeroCommissionBanner />
        </div>
        <div className="partner-carousel">
          <BenefitCard benefits={partnerData} />
        </div>
      </section>

      {/* ── Facility Management ── */}
      <Container>
        <div className="partner-facility">
          <FacilityManagement />
        </div>
      </Container>

      {/* ── Analytics & Coach ── */}
      <Container>
        <div className="row">
          <div className="col-12">
            <AnalyticsCapabilities />
          </div>
        </div>
        <div className="row my-lg-5 my-4">
          <div className="col-12">
            <CoachSection />
          </div>
        </div>
      </Container>

      {/* ── Payment ── */}
      <section style={{ background: "#F1F3F2" }} className="my-lg-5 my-4 py-lg-5 py-4">
        <Container>
          <div className="partner-payment">
            <PaymentSolutions />
          </div>
          <div className="partner-payment">
            <PaymentFeatures />
          </div>
        </Container>
      </section>

      {/* ── Onboarding ── */}
      <Container>
        <OnboardingSupport />
      </Container>

      <PartnerWithUs />
      <Ready />

      {/* ── Form ── */}
      <div id="partner-form">
        <PartnerForm />
      </div>
    </>
  );
}

export default PartnerPage;
