import React from "react";
import "../stylesheets/pages.css";
import { Container } from "react-bootstrap";

function PrivacyAndPolicy() {
  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <Container>
          <span className="page-hero-eyebrow">Legal</span>
          <h1 className="page-hero-title">Privacy &amp; Policy</h1>
          <p className="page-hero-sub">
            How we collect, use, and protect your personal information.
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
          In accordance with this privacy policy ("Policy"), Danta Sports Pvt. Ltd. and its
          colleagues, partners, successors, and authorized assigns ("Danta Sports," "we," "us,"
          and "our") are dedicated to preserving your privacy. This Policy outlines the kinds of
          data we might gather from you when you use our Platform and how we collect, use,
          preserve, safeguard, and disclose that data.
        </p>
        <p>
          By using or accessing this Platform and submitting information, you accept the terms
          and conditions of this Policy and give your express consent to our using and disclosing
          your information as specified herein.
        </p>

        <hr className="legal-divider" />

        <h2>I. Definitions</h2>
        <dl>
          <dt>Account</dt>
          <dd>The password-protected account that users set up to access and engage with the Platform.</dd>

          <dt>Non-personal Identification Information</dt>
          <dd>
            Any non-personal information collected from Users as a result of their interaction
            with the Platform — including browser name, operating system, and technical
            connection information.
          </dd>

          <dt>Personal Identification Information</dt>
          <dd>
            Information that can be used to identify, contact, or locate a person — such as
            name, email address, phone number, and residence address. Users may access our
            website anonymously and are free to decline to provide this information.
          </dd>

          <dt>Sensitive Personal Data or Information (SPDI)</dt>
          <dd>
            Information pertaining to: passwords; financial data (bank account, credit/debit
            card details); physical, physiological, and mental health conditions; sexual
            orientation; medical records and history; biometric data.
          </dd>
        </dl>

        <hr className="legal-divider" />

        <h2>II. Information We Collect</h2>
        <p>
          We collect information you provide directly (registration, bookings, forms), information
          collected automatically (usage data, device information, location), and information from
          third-party services (Google, Facebook login).
        </p>
        <ul>
          <li>Name, email address, and phone number during registration</li>
          <li>Location data to show nearby venues and services</li>
          <li>Payment information processed securely through our payment partners</li>
          <li>Usage data including pages visited, features used, and time spent</li>
          <li>Device information including IP address, browser type, and operating system</li>
        </ul>

        <hr className="legal-divider" />

        <h2>III. How We Use Your Information</h2>
        <ul>
          <li>To provide, operate, and improve our services</li>
          <li>To process bookings and payments</li>
          <li>To send booking confirmations, reminders, and service updates</li>
          <li>To personalize your experience and show relevant venues near you</li>
          <li>To respond to customer support requests</li>
          <li>To comply with legal obligations</li>
          <li>To detect and prevent fraud or abuse</li>
        </ul>

        <hr className="legal-divider" />

        <h2>IV. Information Sharing</h2>
        <p>
          We do not sell your personal information. We may share your information with:
        </p>
        <ul>
          <li><strong>Venue Partners:</strong> To facilitate your bookings</li>
          <li><strong>Payment Processors:</strong> To complete transactions securely</li>
          <li><strong>Service Providers:</strong> Who assist in operating our platform</li>
          <li><strong>Legal Authorities:</strong> When required by law or to protect rights</li>
        </ul>

        <hr className="legal-divider" />

        <h2>V. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your
          information against unauthorized access, alteration, disclosure, or destruction.
          However, no method of transmission over the Internet is 100% secure.
        </p>

        <hr className="legal-divider" />

        <h2>VI. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience,
          analyze usage patterns, and deliver personalized content. You can control cookie
          settings through your browser preferences.
        </p>

        <hr className="legal-divider" />

        <h2>VII. Third-Party Links</h2>
        <p>
          Our Platform may contain links to third-party websites. We are not responsible
          for the privacy practices of those sites and encourage you to review their
          privacy policies.
        </p>

        <hr className="legal-divider" />

        <h2>VIII. Your Rights</h2>
        <ul>
          <li>Access and review your personal information</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your account and data</li>
          <li>Opt out of marketing communications</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>

        <hr className="legal-divider" />

        <h2>IX. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of
          significant changes by posting a notice on our Platform or sending an email.
          Your continued use of the Platform after changes constitutes acceptance.
        </p>

        <hr className="legal-divider" />

        <h2>X. Contact Us</h2>
        <address>
          <strong>Danta Sports Pvt. Ltd.</strong><br />
          No. 13 &amp; 14, Sy No. 151, Neeladri Nagar,<br />
          Electronics City, Bangalore, Karnataka, India<br />
          Email: <a href="mailto:contact@dantasports.com">contact@dantasports.com</a><br />
          Phone: <a href="tel:+918884803877">+91-8884803877</a>
        </address>
      </div>
    </>
  );
}

export default PrivacyAndPolicy;
