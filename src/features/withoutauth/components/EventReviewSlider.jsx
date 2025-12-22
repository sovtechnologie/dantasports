import React, { useRef, memo } from "react";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import leftArrow from "../../withoutauth/assets/icons/left-arrow.svg";
import rightArrow from "../../withoutauth/assets/icons/right-arrow.svg";
import stargreen from "../../withoutauth/assets/icons/star-blue.svg";

import "swiper/css";
import "swiper/css/navigation";

import "./Stylesheets/EventReviewSlider.css";

/* -------------------- Helper: Date → “x days ago” -------------------- */
const getTimeAgo = (dateString) => {
  if (!dateString) return "";

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
    "https://cdn-icons-png.flaticon.com/512/1077/1077012.png";

  const displayName = review.userName || review.name || "Anonymous";
  const timeAgo = getTimeAgo(review.date || review.createdAt);

  return (
    <section>
      <div className="review-card1">
        <div>
          <div className="d-flex">
            <span className="me-2">
              <img src={stargreen} alt="rating" />
            </span>
            <p className="review-rating">{review.rating || 0}/5</p>
          </div>
          <p className="review-text">
            {review.comment || "No comment provided."}
          </p>
        </div>

        <div className="review-card-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
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

          <h5 className="days_ago">{timeAgo}</h5>
        </div>
      </div>
    </section>
  );
});

/* -------------------- Main Component -------------------- */
const EventReviewSlider = ({ event }) => {
  const swiperRef = useRef(null);

  const reviews =
    Array.isArray(event?.review) && event.review.length > 0
      ? event.review
      : [];

  const handleNext = () => swiperRef.current?.slideNext();
  const handlePrev = () => swiperRef.current?.slidePrev();

  return (
    <section className="event-review mb-4">
      <h2 className="details_page_heading mb-lg-4 mb-3">
        Rating & Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center">No reviews yet.</p>
      ) : (
        <>
          <div className="event-review-slider">
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={20}
              slidesPerView={Math.min(3, reviews.length)}
              loop={reviews.length > 3}
              breakpoints={{
                0: { slidesPerView: 1 },
                576: { slidesPerView: 1 },
                992: {
                  slidesPerView: Math.min(2, reviews.length),
                },
                1200: {
                  slidesPerView: Math.min(3, reviews.length),
                },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review.id || index}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
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
