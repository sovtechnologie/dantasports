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
        description: "Control bookings, prevent conflicts, and scale your venue without extra costs."
    },
];

const FacilityManagement = () => {
    return (
        <section className="row g-3 py-5">
            <div className="facility-text col-lg-6 col-md-6 col-12">
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
            <div className="col-lg-6 col-md-6 col-10 m-auto">
               <div className="facility-image m-auto text-center">
                <img src={phonesImage1} alt="Facility Management App Preview" className="w-100 h-100" />
            
            </div>
            </div>
           
        </section>
    );
};

export default FacilityManagement;
