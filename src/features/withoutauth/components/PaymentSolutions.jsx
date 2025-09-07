import React from "react";
import "./Stylesheets/PaymentSolutions.css";
import analyticsImg from "../assets/analyticsImg.png"; // Your uploaded image
import analyticsImg1 from "../assets/analyticsImg1.png"; // Your uploaded image


const paymentSolutions = [
    {
        title: "Centralised Transaction Tracking",
        description:
            "Track all transactions in one place, eliminating manual reconciliations.",
    },
    {
        title: "Automated Invoice Generation",
        description:
            "Enjoy auto-generated invoices and export reports anytime for financial clarity.",
    },
    {
        title: "Secure Instant Payments",
        description:
            "Experience hassle-free payments that are always on time and secure.",
    },
];

const PaymentSolutions = () => {
    return (
        <section className="payment-section">
            <h2 className="payment-title">Streamlined Accounting and<br />
                <span className="highlight">Payments Solutions</span></h2>
            <p className="payment-description">Discover the advantages of efficient financial management</p>
            <div className="payment-cards">
                {paymentSolutions.map((solution, index) => (
                    <div key={index} className="payment-card">
                        <img src={analyticsImg1} alt="Analytics Preview" />
                        <h3>{solution.title}</h3>
                        <p>{solution.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PaymentSolutions;
