import React, { useEffect, useState } from 'react'
import "../stylesheets/About.css"

import caroselImage from "../assets/carousel-image1.png";
import caroselImage2 from "../assets/carousel-image2.png";
import DantaStats from '../components/DantaStats';
import visionImg from "../assets/Mission-Image.png";
import CultureValues from '../components/CultureValues';
import Testimonials from '../components/Testimonials';
import DownloadAppSection from "../components/DownloadAppSection"; 

const images = [
  caroselImage,
  caroselImage2,
  caroselImage,
  caroselImage2,
];

function About() {
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
            Building India’s Largest
            <br />
            <span>Sports Community</span>
          </h1>
          <p>We are a one-stop platform to help sports enthusiasts meet playpals, discover venues, skill-up their game, manage their activities seamlessly and buy gear.    </p>
          <div className="button-group">
            <button className="primary-btn">GET STARTED</button>
            <button className="secondary-btn">BOOK A VENUE</button>
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
      <div className='datastat-wrapper'>
        <DantaStats />
      </div>

      <section className="mission-vision-section">
        <div className="container">
          <div className="content-block">
            <img src={visionImg} alt="Mission" className="content-image" />
            <div className="text-block">
              <h3>
                Our <span className="highlight">Mission</span>
              </h3>
              <p>
                "To empower athletes and sports enthusiasts across all levels by providing
                innovative platforms, inclusive opportunities, and world-class experiences that
                inspire participation, nurture talent, and build champions for life—on and off
                the field."
              </p>
            </div>
          </div>

          <div className="content-block reverse">
            <img src={visionImg} alt="Vision" className="content-image" />
            <div className="text-block">
              <h3>
                Our <span className="highlight">Vision</span>
              </h3>
              <p>
                "To be a global catalyst for sporting excellence—where passion meets purpose,
                talent transforms into triumph, and every player has the opportunity to rise as
                a champion."
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='culture-wrapper'>
        <CultureValues />
      </div>
      <div className='Testimonials-wrapper'>
        <Testimonials />
      </div>
      <div className='DownloadApp-wrapper'>
          <DownloadAppSection />
      </div>
    </div>
  )
}

export default About