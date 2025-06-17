import React from "react";
import "./Stylesheets/FacilityManagement.css";
import phonesImage from "../assets/facilitylogo/Phone_image.png"; // adjust path as needed
import slotIcon from "../assets/facilitylogo/Slot-Icon-image.png"; // replace with actual icon paths
import rolesIcon from "../assets/facilitylogo/Role-Icon-image.png";
import dashboardIcon from "../assets/facilitylogo/Dashboard-Icon-image.png";

const features = [
    {
        icon: slotIcon,
        title: "Effortless Venue Management",
        description: "Start managing your venue swiftly with minimal setup time."
    },
    {
        icon: rolesIcon,
        title: "Always-Available Support Team",
        description: "Our dedicated support team is on hand to assist you at any hour."
    },
    {
        icon: dashboardIcon,
        title: "Stay Updated with New Features",
        description: "Receive regular updates to enjoy the latest features and innovations."
    },
];

const OnboardingSupport = () => {
    return (
        <section className="facility-container">
            <div className="facility-text" >
                <h2>
                    Streamlined Onboarding  <br />
                    <span className="highlight">with 24/7 Support</span>
                </h2>
                
                <ul className="facility-features" style={{marginTop:"40px"}}>
                    {features.map((feature, idx) => (
                        <li key={idx}>
                            <img src={feature.icon} alt="" />
                            <div>
                                <span>{feature.title}</span>
                                <p>{feature.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
            <div className="facility-image">
                <img src={phonesImage} alt="Facility Management App Preview" />
            </div>
        </section>
    );
};

export default OnboardingSupport;
