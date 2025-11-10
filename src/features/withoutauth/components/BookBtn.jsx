import React from 'react'
import "../Stylesheets/BookBtn.css";
import { Link } from "react-router-dom";
function BookBtn({ venueId }) {
  if (!venueId) return null;
  return (
    <div>
      <div className="book_now_btn">
        <Link to={`/venue/${venueId}`} className="book_btn">
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default BookBtn;
