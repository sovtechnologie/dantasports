import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Stylesheets/ReactSlickSlider.css";

// Default static images (for fallback)
import slide1 from "../assets/reactslickslider/slide1.jpg";
import slide2 from "../assets/reactslickslider/slide2.jpg";
import slide3 from "../assets/reactslickslider/slide3.png";

function ReactSlickSlider({ images = [], coverImage = null, mobileCoverImage = null }) {
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

  
  let slides = [];

  if (Array.isArray(images) && images.length > 0) {
    slides = images.map((img) => ({
      src: img.image || img.cover_image || img,
      alt: "Venue Image",
    }));
  } else if (coverImage) {
    slides = [{ src: coverImage, alt: "Cover Image" }];
  } else if (mobileCoverImage) {
    slides = [{ src: mobileCoverImage, alt: "Mobile Cover" }];
  } else {
    slides = [
      { src: slide1, alt: "Default Slide 1" },
      { src: slide2, alt: "Default Slide 2" },
      { src: slide3, alt: "Default Slide 3" },
    ];
  }

  return (
    <div className="react-slick-slider">
      <Slider {...settings}>
        {slides.map((s, i) => (
          <div key={i} className="slider-wrapper">
            <img
              src={s.src}
              alt={s.alt}
              className="slider-image"
          //     style={{
          //       height: "220px",

          // width: "100%",
          // objectFit: "cover",
          // overflow: "none",
          // borderRadius: "12px 12px 0 0"
          //           }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReactSlickSlider;
