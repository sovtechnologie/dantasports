import React from "react";
import "./Stylesheets/FacilityManagement.css";
import phonesImage from "../assets/facilitylogo/Phone_image.png"; // adjust path as needed
import slotIcon from "../assets/facilitylogo/Slot-Icon-image.png"; // replace with actual icon paths
import rolesIcon from "../assets/facilitylogo/Role-Icon-image.png";
import dashboardIcon from "../assets/facilitylogo/Dashboard-Icon-image.png";
import phonesImage3 from "../assets/facilitylogo/Phone_image_3.png"; 
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
        <section className="row g-y my-lg-5 my-4">
            <div className="col-lg-6 col-md-6 col-12">
                <div className="facility-text" >
                <h2>
                    Easy Onboarding with   <br />
                    <span className="highlight"> 24/7 Support</span>
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
            </div>
            <div className="col-lg-6 col-md-6 col-10 m-auto">
                <div className="facility-image">
                <img src={phonesImage3} className="w-100 h-100" alt="Facility Management App Preview" />
            </div>
            </div>
        </section>
    );
};

export default OnboardingSupport;
