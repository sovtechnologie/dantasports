import React from "react";
import "./Stylesheets/PaymentSolutions.css";

import PaymentsSolutions1 from "../assets/facilitylogo/PaymentsSolutions1.png";
import PaymentsSolutions2 from "../assets/facilitylogo/paymentsolutions2.png";
import PaymentsSolutions3 from "../assets/facilitylogo/paymentsolutions3.png";

const paymentSolutions = [
  {
    title: "Centralised Transaction Tracking",
    description:
      "Track all transactions in one place, eliminating manual reconciliations.",
    image: PaymentsSolutions1,
  },
  {
    title: "Automated Invoice Generation",
    description:
      "Enjoy auto-generated invoices and export reports anytime for financial clarity.",
    image: PaymentsSolutions2,
  },
  {
    title: "Secure Instant Payments",
    description:
      "Experience hassle-free payments that are always on time and secure.",
    image: PaymentsSolutions3,
  },
];

const PaymentSolutions = () => {
  return (
    <section className="payment-section">
      <h2 className="payment-title">
        Streamlined Accounting and <br />
        <span className="highlight">Payments Solutions</span>
      </h2>

      <p className="payment-description">
        Discover the advantages of efficient financial management
      </p>

      <div className="payment-cards">
        {paymentSolutions.map((solution, index) => (
          <div key={index} className="payment-card">
            <img src={solution.image} alt={solution.title} />
            <h3>{solution.title}</h3>
            <p>{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PaymentSolutions;
