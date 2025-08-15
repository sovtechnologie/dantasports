import React, { useState, useEffect } from 'react';
import './StyleSheets/BannerCarousel.css'; // Assuming you have a CSS file for styling
import Banner1 from "../assets/EventBanner/Banner1.png";
import { useBanner } from '../hooks/useBanner';


function BannerCarouse() {
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
      setCurrentIndex((prev) => (prev === banners.length - 3 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  if (isLoading) return <div>Loading banners...</div>;
  if (error) return <div>Error loading banners</div>;
  if (!banners.length) return null;

  return (
    <div className='mainEvent-carousel-container'>
    <div className="Eventcarousel-container">
      <div
        className="Eventcarousel-track"
        style={{ transform: `translateX(-${currentIndex * 50}%)` }}
      >
        {banners.concat(banners).map((item, i) => (
          <div className="Eventcarousel-slide" key={i}>
           <img
                src={item.banner_image }
                alt={`Slide ${i + 1}`}
                onError={(e) => { e.target.src = Banner1; }}
                className='Eventcarousel-image'
              />
          </div>
        ))}
      </div>
      <div className="Eventcarousel-dots">
        {banners.slice(0, banners.length - 1).map((_, idx) => (
          <span
            key={idx}
            className={`Eventdot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>
    </div>
    </div>
  );
}

export default BannerCarouse;
