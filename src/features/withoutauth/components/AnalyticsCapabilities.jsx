import React from "react";
import "./Stylesheets/AnalyticsCapabilities.css";
import bookingIcon from "../../../assets/svg-icons/booking.svg";
import reportIcon from "../../../assets/svg-icons/detail.svg";
import insightsIcon from "../../../assets/svg-icons/spark.svg";
import phonesImage2 from "../assets/facilitylogo/account.jpeg"; 

const analyticsFeatures = [
    {
        icon: bookingIcon,
        title: "Real-time Booking Trends",
        description: "Identify peak booking hours to enhance pricing strategies."
    },
    {
        icon: reportIcon,
        title: "Revenue & Performance Reports",
        description: "Utilise comprehensive reports for informed decision-making."
    },
    {
        icon: insightsIcon,
        title: "Customer Insights",
        description: "Gain understanding of repeat bookings and preferences."
    },
];

const AnalyticsCapabilities = () => {
    return (
        <section className="row">
            <div className="col-lg-6 col-md-6 col-10 m-auto">
                <div className="analytics-image d-none d-lg-block d-md-block">
                <img src={phonesImage2} className="w-100 h-100" alt="Analytics App Preview" />
               </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="analytics-content">
                <h2>
                    Unlocking Advanced <br />
                    <span className="highlight">Analytics Capabilities</span>
                </h2>
                <ul className="analytics">
                    {analyticsFeatures.map((item, index) => (
                        <li key={index}>
                            <img src={item.icon} alt={item.title} />
                            <div className="analytics-text">
                                <span>{item.title}</span>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            </div>
        </section>
    );
};

export default AnalyticsCapabilities;
