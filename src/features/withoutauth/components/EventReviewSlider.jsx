import React, { useRef, memo } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

import leftArrow from "../../withoutauth/assets/icons/left-arrow.svg";
import rightArrow from "../../withoutauth/assets/icons/right-arrow.svg";
import stargreen from "../../withoutauth/assets/icons/star-blue.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Stylesheets/EventReviewSlider.css";

/* -------------------- Helper: Date → “x days ago” -------------------- */
const getTimeAgo = (dateString) => {
  if (!dateString) return "";

  // Backend format like: "25 Jun 2025"
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) {
    console.warn("Invalid date format:", dateString);
    return "";
  }

  const now = new Date();
  const diffMs = now - parsedDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

/* -------------------- Review Card -------------------- */
const ReviewCard = memo(({ review }) => {
  const imageUrl =
    review.image ||
    review.avatar ||
    "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"; // default avatar

  const displayName = review.userName || review.name || "Anonymous";
  const timeAgo = getTimeAgo(review.date || review.createdAt);

  return (
    <div className="review-card1">
      <div>
        <div className="d-flex">
          <span className="me-2">
            <img src={stargreen} alt="rating" />
          </span>
          <p className="review-rating">{review.rating || 0}/5</p>
        </div>
        <p className="review-text">{review.comment || "No comment provided."}</p>
      </div>

      <div className="review-card-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center text-align-center">
          <div className="user_profile">
            <img
              src={imageUrl}
              alt={displayName}
              className="review-avatar"
              loading="lazy"
            />
          </div>
          <div className="username ps-3">
            <p className="m-0">{displayName}</p>
          </div>
        </div>

        <div>
          <h5 className="days_ago">{timeAgo}</h5>
        </div>
      </div>
    </div>
  );
});

/* -------------------- Main Component -------------------- */
const EventReviewSlider = ({ event }) => {
  const sliderRef = useRef(null);

  // ✅ Fixed: pick from "review" key (your API)
  const reviews =
    Array.isArray(event?.review) && event.review.length > 0
      ? event.review
      : [];

  console.log("🔥 Event data in slider:", event);
  console.log("🔥 Extracted reviews:", reviews);

  const settings = {
    dots: false,
    infinite: reviews.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, reviews.length),
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: Math.min(2, reviews.length) } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  const handleNext = () => sliderRef.current?.slickNext();
  const handlePrev = () => sliderRef.current?.slickPrev();

  return (
    <section className="event-review">
      <h2 className="details_page_heading mb-lg-4 mb-3">Rating & Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center">No reviews yet.</p>
      ) : (
        <>
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
            <div className="carousel_buttons text-center mt-3 mt-lg-5 mb-3">
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
        </>
      )}
    </section>
  );
};

export default memo(EventReviewSlider);
