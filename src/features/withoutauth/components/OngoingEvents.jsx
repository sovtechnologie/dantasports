import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

import "../../withoutauth/Stylesheets/Filterpages/OngoingEvents.css";

const OngoingEvents = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div className="slider-container">
      <h2 className="details_page_heading mb-lg-4 mb-3">
        Ongoing Events
      </h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
           540: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {banners.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slide-card">
              <img
                src={item.banner_image}
                alt={`banner-${index}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OngoingEvents;
