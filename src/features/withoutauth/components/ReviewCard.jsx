import React from 'react';
import "./Stylesheets/ReviewCard.css";


function ReviewCard({ review }) {
  if (!review) {
    return <div className="review-card">No review available</div>;
  }
  return (
    <div className="review-card" key={review.id}>
      <div className="rating">
        <span className="star">★</span> {review.rating}
      </div>
      <p className="text">{review.comment}</p>
      <div className="review-footer">
        <div className="user">
          <img src="https://i.pravatar.cc/40?img=1" alt={review.userName} />
          <span className="name">{review.userName}</span>
        </div>
        <span className="time">{review.date}</span>
      </div>
    </div>
  )
}

export default ReviewCard;