import React from "react";
import iconImage from "../assets/facilitylogo/Role-Icon-image.png"; // Replace with your actual image path
import "./Stylesheets/PaymentFeatures.css"

const bookingFeatures = [
    {
        title: "Sync With Any Platform",
        desc: "Integrate seamlessly with existing booking systems using Danta API.",
    },
    {
        title: "No Double Bookings Ever",
        desc: "Consolidate all reservations in one place to avoid conflicts.",
    },
    {
        title: "Automate and Scale",
        desc: "Danta handles backend operations, allowing focus on growth.",
    },
    {
        title: "List Your Venue at No Extra Cost",
        desc: "Get discovered without any fees; showcase your venue freely on Danta.",
    },
    {
        title: "Direct User Migration",
        desc: "Easily transfer your existing customers to your Danta booking system.",
    },
    {
        title: "Why Pay Commissions for Customers",
        desc: "60–70% of users return; save on fees by keeping them on Danta.",
    },
];

const PaymentFeatures = () => {
    return (
        <div className="solutions-wrapper">
            <h2 className="solutions-heading">Streamlined Accounting and <br />
              <span> Payments Solutions</span></h2>
            <p>Discover the advantages of efficient financial management</p>
            <div className="solutions-grid">
                {bookingFeatures.map((feature, index) => (
                    <div className="solution-card" key={index}>
                        <img src={iconImage} alt="icon" className="solution-icon" />
                        <div>
                            <h4 className="solution-title">{feature.title}</h4>
                            <p className="solution-description">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaymentFeatures;
