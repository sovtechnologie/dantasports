import React from "react";
import "./Stylesheets/AnalyticsCapabilities.css";
import "./Stylesheets/FacilityManagement.css";
import analyticsImage from "../assets/facilitylogo/Phone-two-image.png"; // adjust as needed
import bookingIcon from "../assets/facilitylogo/Slot-Icon-image.png"; // replace with actual icons
import reportIcon from "../assets/facilitylogo/Role-Icon-image.png";
import insightsIcon from "../assets/facilitylogo/Dashboard-Icon-image.png";
import phonesImage2 from "../assets/facilitylogo/Phone_image_2.png";
import CoachDashboard from "../assets/facilitylogo/coach-dashboard.jpeg";
import gym from "../assets/facilitylogo/Gym.png";
import runevents from "../assets/facilitylogo/runevents.jpeg";
function CoachSection() {
  const analyticsFeatures = [
    {
    //   icon: bookingIcon,
      title: "Real-time Booking Trends",
      description: "Identify peak booking hours to enhance pricing strategies.",
    },
    {
    //   icon: reportIcon,
      title: "Revenue & Performance Reports",
      description:
        "Utilise comprehensive reports for informed decision-making.",
    },
    {
    //   icon: insightsIcon,
      title: "Customer Insights",
      description: "Gain understanding of repeat bookings and preferences.",
    },
  ];
  return (
    <>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="analytics-content">
                <h2>
                  Built for Coaches, <br />
                  <span className="highlight">Trainers & Academies</span>
                </h2>
                <h3 className="fw-bold mb-4">
                  Manage Clients. Monetize Skills. Scale Reach
                </h3>
                <h5 className="mb-3">
                  DantaSports gives coaches a professional digital workspace to
                  manage clients and grow their personal brand.
                </h5>
                <p><b>Coach Dashboard Includes:</b></p>
                <ul className="coach_listing">
                    <li>Training plan creation and scheduling</li>
                    <li>Client progress tracking</li>
                    <li>Session history and notes</li>
                    <li>Calendar and availability management</li>
                    <li>Direct access to users actively seeking coaching</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-10 m-auto">
              <div className="analytics-image ">
                <img
                  src={CoachDashboard}
                  className="w-100 h-100"
                  alt="Analytics App Preview"
                />
              </div>
            </div>
          </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 col-10 m-auto d-none d-lg-block">
              <div className="analytics-image ">
                <img
                  src={gym}
                  className="w-100 h-100"
                  alt="Analytics App Preview"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="analytics-content">
                <h2>
                  Built for Gyms & <br />
                  <span className="highlight">Fitness Centers</span>
                </h2>
                <h3 className="fw-bold mb-4">
                 Modern Gym Management, Simplified
                </h3>
                <h5 className="mb-3">
                  Digitize your gym operations and attract high-intent fitness users actively searching for gyms near them.

                </h5>
                <p><b>Capabilities:</b></p>
                <ul className="coach_listing">
                    <li>Gym discovery and booking</li>
                    <li>Subscription and session tracking</li>
                    <li>Member activity insights</li>
                    <li>Integrated payments and invoicing</li>
                    <li>CRM to track repeat users and engagement</li>
                </ul>
              </div>
            </div>
            
            </div>
            <div className="row my-lg-5 my-4">
            
            <div className="col-lg-6 col-md-6 col-12">
              <div className="analytics-content">
                <h2>
                  Built for Event &  <br />
                  <span className="highlight">Run Organisers</span>
                </h2>
                <h3 className="fw-bold mb-4">
                 Plan Better. Sell Faster. Scale Seamlessly.
                </h3>
                <h5 className="mb-3">
                 DantaSports empowers fitness event organisers and run clubs with a centralized platform to create, promote, manage, and scale fitness events-without operational friction.

                </h5>
                <h5 className="mb-3">
                    Whether it’s a marathon, fitness challenge, trekking thrills, running togetheror local sports tournament, DantaSports helps you reach the right audience and manage everything end-to-end.
                </h5>
                <p><b>Event & Run Organiser Capabilities:</b></p>
                <ul className="coach_listing">
                    <li>Event discovery and ticketing</li>
                    <li>Run, marathon, and fitness event listings</li>
                    <li>Registration and participant management</li>
                    <li>Automated schedules, slots, and check-ins</li>
                    <li>Integrated payments, invoicing, and refunds</li>
                    <li>Real-time participant insights and analytics</li>
                    <li>Community discovery for run clubs and recurring events</li>
                    <li>Direct access to active fitness-first users</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-10 m-auto">
                <div className="analytics-image">
                    <img
                    src={runevents}
                    className="w-100 h-100"
                    alt="Analytics App Preview"
                    />
                </div>
            </div>
            
            </div>
        </div>
      </section>
    </>
  );
}

export default CoachSection;
