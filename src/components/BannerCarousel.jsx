import React, { useState, useEffect } from "react";
import "./StyleSheets/BannerCarousel.css";
import Banner1 from "../assets/EventBanner/Banner1.png";
import { useBanner } from "../hooks/useBanner";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageNo = 1;
  const { data: bannerData, isLoading, error } = useBanner(pageNo);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

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

  if (isLoading)
    return (
      <div className="mainEvent-carousel-container">
        <div
          style={{
            height: 180,
            borderRadius: 20,
            background: "linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      </div>
    );
  if (error) return null;
  if (!banners.length) return null;

  return (
    <div
      ref={ref}
      className={`mainEvent-carousel-container${isVisible ? " banner-visible" : ""}`}
    >
      <div className="Eventcarousel-container">
        <div
          className="Eventcarousel-track"
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {banners.concat(banners).map((item, i) => (
            <div className="Eventcarousel-slide" key={i}>
              <img
                src={item.banner_image}
                alt={`Banner ${(i % banners.length) + 1}`}
                onError={(e) => {
                  e.target.src = Banner1;
                }}
                className="Eventcarousel-image"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <div className="Eventcarousel-dots">
          {banners.slice(0, banners.length - 1).map((_, idx) => (
            <span
              key={idx}
              className={`Eventdot${idx === currentIndex ? " active" : ""}`}
              onClick={() => goToSlide(idx)}
              role="button"
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerCarousel;
