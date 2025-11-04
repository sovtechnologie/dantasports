// OngoingSlider.js
import React from "react";
import Slider from "react-slick";
import "../../withoutauth/Stylesheets/Filterpages/OngoingEvents.css";

const OngoingSlider = () => {
  const settings = {
    dots: false,                // show navigation dots
    infinite: true,            // loop slides
    speed: 300,                // transition speed (ms)
    slidesToShow: 3,           // number of slides visible
    slidesToScroll: 1,
    autoplay: true,            // auto scroll
    autoplaySpeed: 3000,       // 3 seconds per slide
    arrows: false,              // show prev/next arrows
    responsive: [
      {
        breakpoint: 1024,      // screens <= 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,       // screens <= 600px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    { id: 1, image: "https://i.pinimg.com/736x/ea/5a/41/ea5a412bd34925a21c2fe6937edf44b1.jpg" },
    { id: 2, image: "https://i.pinimg.com/1200x/4e/57/e3/4e57e349f7d9d70ee401149889284618.jpg" },
    { id: 3, image: "https://dantasportsdoc.s3.ap-south-1.amazonaws.com/1758962103370Screenshot%20(7).png" },
    { id: 4, image: "https://dantasportsdoc.s3.ap-south-1.amazonaws.com/1761665741618venue%204.jpeg" },
    { id: 5, image: "https://dantasportsdoc.s3.ap-south-1.amazonaws.com/1761665741618venue%204.jpeg" },
  ];

  return (
    <div className="slider-container">
      <h2 className="details_page_heading mb-lg-4 mb-3">Ongoing events </h2>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slide-card">
            <img src={slide.image} alt={`Slide ${slide.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OngoingSlider;
