import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../withoutauth/Stylesheets/Filterpages/OngoingEvents.css"

const OngoingEvents = () => {
  const banners = [
    { banner_image: "https://via.placeholder.com/400x200/4B0C1B/FFFFFF?text=Event+1" },
    { banner_image: "https://via.placeholder.com/400x200/F5EAEA/000000?text=Event+2" },
    { banner_image: "https://via.placeholder.com/400x200/F5EAEA/000000?text=Event+3" },
    { banner_image: "https://via.placeholder.com/400x200/4B0C1B/FFFFFF?text=Event+4" },
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="event-banner-container">
      <h2 className="event-banner-heading">Ongoing Events</h2>

      <Slider {...settings} className="event-banner-carousel">
        {banners.map((item, i) => (
          <div key={i} className="event-banner">
            <img src={item.banner_image} alt={`Event ${i + 1}`} className="event-banner-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OngoingEvents;
