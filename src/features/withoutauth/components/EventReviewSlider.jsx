import React, { useRef, memo } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import leftArrow from "../../withoutauth/assets/icons/left-arrow.svg";
import rightArrow from "../../withoutauth/assets/icons/right-arrow.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Stylesheets/EventReviewSlider.css";

/* -------------------- Review Card -------------------- */
const ReviewCard = memo(({ review }) => (
     console.log("|review.imagereview.imagereview.image",review.image),
  <div className="review-card1">
    <div>
      <p className="review-rating">⭐ {review.rating}/5</p>
      <p className="review-text">{review.comment}</p>
      
    </div>

    <div className="review-card-header d-flex justify-content-between align-items-center">
      <div className="user_profile mt-3">
     
        <img
          src={review.image}
          alt={review.name || review.userName}
          className="review-avatar"
          loading="lazy"
        />
      </div>
      <div>
        <h5 className="mb-0 fw-light m-0">{review.name || review.userName}</h5>
      </div>
    </div>
  </div>
));


ReviewCard.displayName = "ReviewCard";



/* -------------------- Main Component -------------------- */
const EventReviewSlider = ({ event }) => {
  const sliderRef = useRef(null);

  // ✅ Fallback Demo Data
  const demoReviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      comment:
        "Fantastic event! The arrangements were top-notch and very smooth.",
    },
    {
      id: 2,
      name: "Priya Singh",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      comment: "Really well organized. Enjoyed every part of it!",
    },
    {
      id: 3,
      name: "Rohan Patel",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      comment: "Amazing experience! Looking forward to next year’s event.",
    },
    {
      id: 4,
      name: "Sneha Verma",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/88.jpg",
      comment: "Good vibes and excellent coordination by the team!",
    },
  ];

  const reviews = event?.reviews?.length ? event.reviews : demoReviews;

  /* -------------------- Slider Config -------------------- */
  const settings = {
    dots: false,
    infinite: reviews.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  /* -------------------- Handlers -------------------- */
  const handleNext = () => sliderRef.current?.slickNext();
  const handlePrev = () => sliderRef.current?.slickPrev();

  /* -------------------- Render -------------------- */
  return (
    <section className="event-review">
      <h2 className="event-review-heading mb-4">
        Rating & Reviews
      </h2>

      <div className="event-review-slider">
        <Slider ref={sliderRef} {...settings}>
         {reviews.map((review, index) => (
  <div key={review.id || index}>
    <ReviewCard review={review} />
  </div>
))}

        </Slider>
      </div>

      {reviews.length > 1 && (
        <div className="carousel_buttons text-center mt-3 mt-lg-5">
          <button
            type="button"
            className="carousel_btn me-4"
            aria-label="Previous Slide"
            onClick={handlePrev}
          >
            <img src={leftArrow} alt="Previous" />
          </button>
          <button
            type="button"
            className="carousel_btn"
            aria-label="Next Slide"
            onClick={handleNext}
          >
            <img src={rightArrow} alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
};

/* -------------------- PropTypes -------------------- */

export default memo(EventReviewSlider);
