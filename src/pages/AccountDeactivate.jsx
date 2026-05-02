import React from "react";
import "../stylesheets/pages.css";
import "../stylesheets/AccountDeactivate.css";
import { Container, Row, Col } from "react-bootstrap";
import { useScrollReveal } from "../hooks/useScrollReveal";
import delt   from "../features/withoutauth/assets/account/delete.svg";
import days   from "../features/withoutauth/assets/account/days.svg";
import months from "../features/withoutauth/assets/account/months.svg";
import years  from "../features/withoutauth/assets/account/years.svg";

const RETENTION_CARDS = [
  {
    icon: delt,
    title: "Immediately Deleted",
    items: [
      "Profile information (name, photo, bio)",
      "Location history and preferences",
      "Saved venues and favourites",
      "Social connections and followers",
      "App settings and notifications",
    ],
  },
  {
    icon: days,
    title: "Deleted After 90 Days",
    items: [
      "Booking history and records",
      "Reviews and ratings you submitted",
      "Messages and chat history",
      "Activity logs and check-ins",
    ],
  },
  {
    icon: months,
    title: "Retained for 24 Months",
    items: [
      "Transaction records (legal requirement)",
      "Payment receipts and invoices",
      "Dispute resolution records",
    ],
  },
  {
    icon: years,
    title: "Retained for 10 Years",
    items: [
      "Financial records (tax compliance)",
      "Fraud prevention data",
      "Legal compliance records",
    ],
  },
];

function AccountDeactivate() {
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      {/* Hero */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Account</span>
          <h1 className="page-hero-title">Account Deactivation &amp;<br /><span>Data Retention Policy</span></h1>
          <p className="page-hero-sub">
            Understand what happens to your data when you delete your Danta Sports account.
          </p>
        </Container>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <section className="ad-section" style={{ background: "#F1F3F2" }}>
        <Container>

          {/* Overview */}
          <div className="ad-overview pg-reveal">
            <div className="ad-overview-icon">🔒</div>
            <div>
              <h2>Overview</h2>
              <p>
                When you delete your Danta Sports account, we permanently remove your personal
                data from our active systems. Some data may be retained for legal, financial,
                or fraud-prevention purposes as outlined below. This policy was last updated
                on <strong>28 Sep 2025</strong>.
              </p>
            </div>
          </div>

          <div className="ad-divider" />

          {/* How to delete */}
          <Row className="align-items-start g-4 my-2">
            <Col lg={6} className="pg-reveal">
              <div className="ad-card">
                <h2>How to Request Account Deletion</h2>
                <ol className="ad-list ad-list--ordered">
                  <li>Open the DantaSports App or Website</li>
                  <li>Go to <strong>Profile → Settings → Account → Delete Account</strong></li>
                  <li>Confirm via OTP or email verification</li>
                  <li>You will receive an email confirmation once deletion completes</li>
                </ol>
                <p className="ad-alt-text">
                  Alternatively, email us at{" "}
                  <a href="mailto:support@dantasports.com">support@dantasports.com</a>{" "}
                  from your registered email with the subject{" "}
                  <strong>"Delete my account"</strong>.
                </p>
              </div>
            </Col>
            <Col lg={6} className="pg-reveal" style={{ transitionDelay: ".15s" }}>
              <div className="ad-card">
                <h2>What Happens After Deletion?</h2>
                <ul className="ad-list">
                  <li>Your account becomes <strong>immediately inaccessible</strong></li>
                  <li>Active bookings will be cancelled per venue policy</li>
                  <li>Pending refunds will still be processed</li>
                  <li>You will receive a confirmation email within 24 hours</li>
                  <li>Data deletion is <strong>irreversible</strong> — you cannot recover your account</li>
                </ul>
              </div>
            </Col>
          </Row>

          <div className="ad-divider" />

          {/* Retention timeline */}
          <div className="pg-section-header pg-reveal">
            <span className="pg-eyebrow">Data Lifecycle</span>
            <h2 className="pg-title">Data <span>Retention Timeline</span></h2>
            <p className="pg-sub">
              Different types of data are handled differently based on legal and operational requirements.
            </p>
          </div>

          <Row className="g-4">
            {RETENTION_CARDS.map((card, i) => (
              <Col lg={3} md={6} key={i} className="pg-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="ad-retention-card">
                  <div className="ad-retention-icon">
                    <img src={card.icon} alt={card.title} loading="lazy" />
                  </div>
                  <h3>{card.title}</h3>
                  <ul className="ad-retention-list">
                    {card.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>

          <div className="ad-divider" />

          {/* Contact */}
          <div className="ad-contact pg-reveal">
            <div className="ad-contact-icon">📧</div>
            <div>
              <h2>Questions or Concerns?</h2>
              <p>
                If you have any questions about your data or this policy, please contact our
                Data Protection team:
              </p>
              <p>
                <a href="mailto:support@dantasports.com">support@dantasports.com</a>
                {" · "}
                <a href="tel:+918884803877">+91-8884803877</a>
              </p>
            </div>
          </div>

        </Container>
      </section>
    </div>
  );
}

export default AccountDeactivate;
