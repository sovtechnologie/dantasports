import React, { useEffect, useState } from 'react';
import '../Stylesheets/CorporateBookingPage.css';
import caroselImage from "../assets/carousel-image1.png";
import banner from "../assets/icons/CorporateBooking-banner.png";
import CorporateBooking from "../assets/icons/CorporateBooking.png";
import SportEventImage from "../assets/Sport-event-image.png";
import BenefitCard from '../components/BenefitCard';
import SportEventCardList from '../components/SportEventCardList';
import CorporateBookingForm from '../components/CorporateBookingForm';
import OurGallery from '../components/OurGallery';
import { benefits } from "../StaticData/CorportateData.js";
import DownloadAppSection from '../../../components/DownloadAppSection.jsx';





function CorporateBookingPage() {

  return (
    <>
      <section>

        <div className="container">
          <div className="Corporate-header row">
            <div className="header-left col-lg-6 col-md-6 col-12">
              <h1>
                Let Us Take Charge of <br />
                <span>Your Employee Wellness</span>
              </h1>
              <p><b>Sports-led corporate wellness programs, simplified.</b></p>
              <p>DantaSports helps organizations design, manage, and scale employee fitness through sports
events, venue bookings, and long-term activity programs-without operational overhead.</p>
              <div className="button-group">
                <button className="primary-btn-one">Request a Demo</button>
                <button className="secondary-btn-two">Book a Call With Us</button>
              </div>
            </div>

            <div className="header-right col-lg-4 m-auto col-md-6 col-8">
              <img className='w-100' src={banner} alt="" />
            </div>
          </div>
        </div>

        <section style={{ background: "#f1f3f2" }} className='pt-4 pt-lg-5 pb-4 pb-lg-5'>
          <div className="container">
            <div className='corporate-booking'>
              <h2>Trusted by <span> the best</span></h2>
              <p className='text-center' style={{ color: "#757575", fontSize: "18px" }}>Companies choose DantaSports to power consistent,<br/>engaging, and measurable employee
                wellness initiatives across cities.</p>
            </div>

            <div className='clients-carousel corporate_events'>
              <BenefitCard benefits={benefits} />
            </div>
          </div>
        </section>



        <div className="container my-lg-5 my-4">
          <div className="Corporate-sport-event row">
          <div className="col-lg-4 col-md-6 col-8 m-auto">
            <div className="left-sport-event">
            <img src={CorporateBooking} alt="Corporate Wellness" className="w-100" />
          </div>
          </div>
          <div className="right-sport-event col-lg-6 col-md-6 col-12">
            <h2>
              Corporate Sports Events, 
              <span>End-to-End</span>
            </h2>
            <p className='pt-lg-3'>
             From friendly tournaments to multi-company leagues, we handle everything-so your teams
focus on playing.
            </p>
            <p>Inter-office tournaments</p>
            <p>Annual sports days</p>
            <p>City-wide corporate leagues</p>
            <p>One-day or recurring formats
</p>
          </div>

        </div>
        </div>
       <div className="container">
         <OurGallery />
       </div>

        
        <section style={{ background: "#f1f3f2" }} className='py-5'>
          <div className='corporate-service-container text-center'>
          <h2 className='mb-4'>Corporate & Long Term/ <span>Bulk Booking</span></h2>
          <p style={{ color: "#757575", fontSize: "18px" }}>Designed for organizations looking for consistent, scalable sports access for employees.</p>

        </div>
          <div className="container">
           <SportEventCardList />
           <div className="mt-5">
             <CorporateBookingForm />
           </div>
        </div>
        </section>
        

     <DownloadAppSection />



      </section>
    </>
  );
}

export default CorporateBookingPage;
