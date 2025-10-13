import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Stylesheets/ReactSlickSlider.css";

// ✅ Local images
import slide1 from "../assets/reactslickslider/slide1.jpg";
import slide2 from "../assets/reactslickslider/slide2.jpg";
import slide3 from "../assets/reactslickslider/slide3.png";

function ReactSlickSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // ✅ Local image slides
  const slides = [
    { src: slide1, alt: "Slide 1" },
    { src: slide2, alt: "Slide 2" },
    { src: slide3, alt: "Slide 3" },
  ];

  return (
    <div>
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={i}>
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReactSlickSlider;
