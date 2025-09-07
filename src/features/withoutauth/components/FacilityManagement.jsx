import React from "react";
import "./Stylesheets/FacilityManagement.css";
import phonesImage from "../assets/facilitylogo/Phone_image.png"; // adjust path as needed
import slotIcon from "../assets/facilitylogo/Slot-Icon-image.png"; // replace with actual icon paths
import rolesIcon from "../assets/facilitylogo/Role-Icon-image.png";
import dashboardIcon from "../assets/facilitylogo/Dashboard-Icon-image.png";
import phonesImage1 from "../assets/facilitylogo/Phone_image_1.png"; 


const features = [
    {
        icon: slotIcon,
        title: "Smart Slot System",
        description: "Create and manage time slots effortlessly, optimising usage and scheduling."
    },
    {
        icon: rolesIcon,
        title: "Custom Roles and Permissions",
        description: "Efficiently control staff access with tailored roles, enhancing security and operational flow."
    },
    {
        icon: dashboardIcon,
        title: "One Dashboard, Total Control",
        description: "Centralise tracking for bookings, revenue, and customer data in one user-friendly dashboard."
    },
];

const FacilityManagement = () => {
    return (
        <section className="facility-container">
            <div className="facility-text">
                <h2>
                    Streamlined Facility <br />
                    <span className="highlight">Management Solutions</span>
                </h2>
                <p>Enhancing Efficiency in Facility Operations</p>
                <ul className="facility-features">
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
                <img src={phonesImage1} alt="Facility Management App Preview" />
                {/* <img src={phonesImage1} alt="Facility Management App Preview" />
                <img src={phonesImage2} alt="Facility Management App Preview" />
                <img src={phonesImage3} alt="Facility Management App Preview" /> */}
            </div>
        </section>
    );
};

export default FacilityManagement;
