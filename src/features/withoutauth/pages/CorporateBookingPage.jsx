import React, { useEffect, useState } from 'react';
import '../Stylesheets/CorporateBookingPage.css';
import caroselImage from "../assets/carousel-image1.png";
import caroselImage2 from "../assets/carousel-image2.png";
import SportEventImage from "../assets/Sport-event-image.png";
import BenefitCard from '../components/BenefitCard';
import SportEventCardList from '../components/SportEventCardList';
import CorporateBookingForm from '../components/CorporateBookingForm';
import DownloadApp from "../components/DownloadApp";
import OurGallery from '../components/OurGallery';
import { benefits } from "../StaticData/CorportateData.js";


const images = [
  caroselImage,
  caroselImage2,
  caroselImage,
  caroselImage2,
];

function CorporateBookingPage() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Corporate-main-Container">
      <div className="Corporate-header">
        <div className="header-left">
          <h1>
            Let Us Take Charge of <br />
            <span>Your Employee Wellness</span>
          </h1>
          <p>Join the 3,000+ facilities nationwide using Dantasports.com
            Do you operate sports facilities or events? Click Become A Partner or Book a Call to find out how Dantasports can help you
          </p>
          <div className="button-group">
            <button className="primary-btn-one">Request a Demo</button>
            <button className="secondary-btn-two">Book a Call With Us</button>
          </div>
        </div>

        <div className="header-right">
          <img src={images[currentImage]} alt="Corporate Wellness" className="carousel-img" />
          <div className="pagination-dots">
            {images.map((_, i) => (
              <span key={i} className={`dot ${i === currentImage ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      <div className='corporate-booking'>
        <h1>Trusted by <span> the best</span></h1>
      </div>

      <div className='clients-carousel'>
        <BenefitCard benefits={benefits}/>
      </div>

      <div className="Corporate-sport-event">
        <div className="left-sport-event">
          <img src={SportEventImage} alt="Corporate Wellness" className="carousel-sport-img" />
        </div>
        <div className="right-sport-event">
          <h1>
            Corporate <span>Sport Events</span>
          </h1>
          <p>
            Get ready to break a sweat and have some fun! Our events are all about bringing teams together for some friendly competition and a whole lot of good vibes.
          </p>
        </div>

      </div>
      <OurGallery />

      <div className='corporate-service-container'>
        <h1>Corporate & Long Term/ <span>Bulk Booking</span></h1>

      </div>
      <SportEventCardList />
      <CorporateBookingForm />

      <DownloadApp />
    </div>
  );
}

export default CorporateBookingPage;
