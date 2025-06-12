import React from 'react';
import "./Stylesheets/ReviewCard.css";
import reviews from "../StaticData/ReviewRatingData.js";

function ReviewCard({ review }) {
  if (!review) {  
    return <div className="review-card">No review available</div>;
  }
  return (
    <div className="review-card" key={review.id}>
      <div className="rating">
        <span className="star">★</span> {review.rating}
      </div>
      <p className="text">{review.review}</p>
      <div className="review-footer">
        <div className="user">
          <img src={review.avatar} alt={review.name} />
          <span className="name">{review.name}</span>
        </div>
        <span className="time">{review.time}</span>
      </div>
    </div>
  )
}

export default ReviewCard;