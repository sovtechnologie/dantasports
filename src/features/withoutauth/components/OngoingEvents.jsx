import React from "react";
import Slider from "react-slick";
import "../../withoutauth/Stylesheets/Filterpages/OngoingEvents.css";

const OngoingEvents = ({ banners }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div className="slider-container">
      <h2 className="details_page_heading mb-lg-4 mb-3">Ongoing Events</h2>
      <Slider {...settings}>
        {banners.map((item, index) => (
          <div key={index} className="slide-card">
            <img src={item.banner_image} alt={`banner-${index}`} />
          </div>
        ))}
      </Slider>
      
    </div>
  );
};

export default OngoingEvents;
