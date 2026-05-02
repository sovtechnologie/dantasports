import React from "react";
import "../stylesheets/pages.css";
import { Container } from "react-bootstrap";

function RefundPolicy() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Legal</span>
          <h1 className="page-hero-title">Cancellation &amp; Refund Policy</h1>
          <p className="page-hero-sub">
            Understand how cancellations and refunds work on the Danta Sports Platform.
          </p>
        </Container>
        <div className="page-hero-wave">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <div className="legal-page">
        <span className="legal-updated">Last updated: July 2, 2025</span>

        <h2>Venue Cancellation Policies</h2>
        <p>
          Cancellations are governed by the individual policies of each venue listed on the
          Danta Sports Platform. We encourage users to review the specific cancellation policy
          of the venue before confirming a booking. These policies are visible on the venue's
          listing page as well as within your booking confirmation.
        </p>

        <hr className="legal-divider" />

        <h2>How to Cancel a Booking</h2>
        <p>
          Users can initiate cancellations directly from their booking ticket under the
          <strong> "My Bookings"</strong> section in the app or website. The applicable refund
          amount, if any, will be clearly displayed before you confirm the cancellation.
        </p>
        <ol>
          <li>Open the Danta Sports App or visit the website</li>
          <li>Go to <strong>Profile → My Bookings</strong></li>
          <li>Select the booking you wish to cancel</li>
          <li>Tap <strong>"Cancel Booking"</strong> and review the refund amount</li>
          <li>Confirm the cancellation</li>
        </ol>

        <hr className="legal-divider" />

        <h2>Refund Processing</h2>
        <p>
          Refunds, if eligible, will be processed to the original payment method used during
          the booking. It may take <strong>5–7 working days</strong> for the amount to reflect
          in your account after the cancellation is confirmed.
        </p>
        <ul>
          <li>Credit/Debit Card: 5–7 working days</li>
          <li>UPI / Net Banking: 3–5 working days</li>
          <li>Wallet: 1–2 working days</li>
        </ul>

        <hr className="legal-divider" />

        <h2>Non-Refundable Situations</h2>
        <ul>
          <li>Cancellations made after the venue's specified cut-off time</li>
          <li>No-shows without prior cancellation</li>
          <li>Bookings marked as non-refundable by the venue</li>
          <li>Partial usage of a booked slot</li>
        </ul>

        <hr className="legal-divider" />

        <h2>Event &amp; Run Cancellations</h2>
        <p>
          For events and runs, cancellation policies are set by the event organizer and
          displayed on the event listing page. Danta Sports will facilitate refunds as per
          the organizer's stated policy.
        </p>

        <hr className="legal-divider" />

        <h2>Contact Support</h2>
        <p>
          If you face any issues with cancellations or refunds, please reach out to our
          support team:
        </p>
        <address>
          Email: <a href="mailto:support@dantasports.com">support@dantasports.com</a><br />
          Phone: <a href="tel:+918884803877">+91-8884803877</a><br />
          Support Hours: Monday–Saturday, 9 AM – 6 PM IST
        </address>
      </div>
    </>
  );
}

export default RefundPolicy;
