import React, { useState, useEffect } from 'react';
import './StyleSheets/EventCarousel.css'; // Assuming you have a CSS file for styling
import BannerData from '../StaticData/EventCarousel';
import Banner1 from "../assets/EventBanner/Banner1.png";
import { useBanner } from '../hooks/useBanner';


function EventCarousel() {
 const [currentIndex, setCurrentIndex] = useState(0);
  const pageNo = 1; // Pass dynamic page number as needed
  const { data: bannerData, isLoading, error } = useBanner(pageNo);

  const banners = bannerData?.result || [];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === banners.length - 2 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  if (isLoading) return <div>Loading banners...</div>;
  if (error) return <div>Error loading banners</div>;
  if (!banners.length) return null;

  return (
    <div className='main-carousel-container'>
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {banners.map((item, i) => (
          <div className="carousel-slide" key={i}>
           <img
                src={item.banner_image }
                alt={`Slide ${i + 1}`}
                onError={(e) => { e.target.src = Banner1; }}
                className='carousel-image'
              />
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {banners.slice(0, banners.length - 1).map((_, idx) => (
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
