import React from "react";
import "../stylesheets/pages.css";
import { Container } from "react-bootstrap";

function TermsAndConditions() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Legal</span>
          <h1 className="page-hero-title">Terms &amp; Conditions</h1>
          <p className="page-hero-sub">
            Please read these terms carefully before using the Danta Sports Platform.
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

        <p>
          These Terms of Use govern your use of the Danta Sports Platform — including our
          website at <a href="https://dantasports.com">dantasports.com</a> and the Danta Sports
          mobile app. By accessing or using the Platform, you agree to be bound by these Terms.
        </p>

        <hr className="legal-divider" />

        <h2>I. Acceptance of Terms</h2>
        <p>
          By downloading, installing, or using the Danta Sports Platform, you agree to these
          Terms of Use and our Privacy Policy. If you do not agree, please do not use the Platform.
        </p>
        <p>
          You affirm that you are at least 18 years old and that all information you provide
          during registration is true and accurate. If you are under 18, your use is presumed
          to be supervised by a parent or legal guardian.
        </p>

        <hr className="legal-divider" />

        <h2>II. Use of the Platform</h2>
        <p>You agree not to use the Platform to:</p>
        <ul>
          <li>Post content that is defamatory, obscene, pornographic, or unlawfully threatening</li>
          <li>Infringe upon intellectual property rights of any third party</li>
          <li>Transmit spam, chain letters, or unsolicited mass communications</li>
          <li>Attempt unauthorized access to any part of the Platform or its systems</li>
          <li>Use automated tools (bots, scrapers) to collect data without written consent</li>
          <li>Engage in any activity that disrupts or interferes with the Platform's operation</li>
          <li>Misrepresent your identity or impersonate another user</li>
          <li>Conduct commercial activities without prior written consent from Danta Sports</li>
        </ul>

        <hr className="legal-divider" />

        <h2>III. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials.
          You agree to notify Danta Sports immediately of any unauthorized use of your account.
          You are solely responsible for all activities that occur under your account.
        </p>

        <hr className="legal-divider" />

        <h2>IV. Bookings and Payments</h2>
        <p>
          All bookings made through the Platform are subject to the availability and policies
          of the respective venue or service provider. Payment is processed securely through
          our payment partners. Danta Sports is not responsible for disputes between users
          and venue operators.
        </p>
        <p>
          Cancellation and refund policies vary by venue. Please review the specific policy
          before confirming a booking.
        </p>

        <hr className="legal-divider" />

        <h2>V. Intellectual Property</h2>
        <p>
          All content on the Danta Sports Platform — including text, graphics, logos, images,
          and software — is the property of Danta Sports Pvt. Ltd. and is protected by
          applicable intellectual property laws. You may not reproduce, distribute, or create
          derivative works without our express written permission.
        </p>

        <hr className="legal-divider" />

        <h2>VI. User Content</h2>
        <p>
          By submitting content (reviews, photos, comments) to the Platform, you grant Danta
          Sports a non-exclusive, royalty-free, worldwide license to use, display, and
          distribute that content in connection with our services.
        </p>
        <p>
          You represent that you own or have the necessary rights to the content you submit
          and that it does not violate any third-party rights.
        </p>

        <hr className="legal-divider" />

        <h2>VII. Disclaimers</h2>
        <p>
          The Platform is provided "as is" without warranties of any kind. Danta Sports does
          not warrant that the Platform will be uninterrupted, error-free, or free of viruses.
          We are not liable for any indirect, incidental, or consequential damages arising
          from your use of the Platform.
        </p>

        <hr className="legal-divider" />

        <h2>VIII. Modifications</h2>
        <p>
          Danta Sports reserves the right to modify these Terms at any time. Changes will be
          posted on the Platform and, where appropriate, notified to you via email or in-app
          notification. Continued use of the Platform after changes constitutes acceptance.
        </p>

        <hr className="legal-divider" />

        <h2>IX. Governing Law</h2>
        <p>
          These Terms are governed by the laws of India. Any disputes shall be subject to
          the exclusive jurisdiction of the courts in Bangalore, Karnataka, India.
        </p>

        <hr className="legal-divider" />

        <h2>X. Contact</h2>
        <address>
          <strong>Danta Sports Pvt. Ltd.</strong><br />
          No. 13 &amp; 14, Sy No. 151, Neeladri Nagar,<br />
          Electronics City, Bangalore, Karnataka, India<br />
          Email: <a href="mailto:contact@dantasports.com">contact@dantasports.com</a>
        </address>
      </div>
    </>
  );
}

export default TermsAndConditions;
