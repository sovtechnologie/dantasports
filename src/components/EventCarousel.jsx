import React, { useState, useEffect } from 'react';
import './StyleSheets/EventCarousel.css'; // Assuming you have a CSS file for styling
import BannerData from '../StaticData/EventCarousel';


function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev === BannerData.length - 2 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='main-carousel-container'>
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {BannerData.map((item, i) => (
          <div className="carousel-slide" key={i}>
            <img src={item.image} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {BannerData.slice(0, BannerData.length - 1).map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>
    </div>
    </div>
  );
}

export default EventCarousel;
