import React, { useState } from "react";
import "../StyleSheets/AddReviewModal.css";
import { Rating } from 'react-simple-star-rating';
import { useAddReview } from "../../../../hooks/BookingVenue/useAddReview.js";


export const AddReviewModal = ({ isOpen, onClose, bookingId, venueId }) => {
    const createReview = useAddReview();
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (rating === 0) {
            setError("Please provide a star rating.");
            return;
        }
        if (!reviewText.trim()) {
            setError("Review text cannot be empty.");
            return;
        }
        setError('');
        const payload = {
            rating: rating,           // convert to 0–5
            comment: reviewText,
            type: "venue",
            reviewableId: venueId,
            bookingId,
        };
        createReview.mutate(payload, {
            onSuccess: () => {
                onClose();
                setRating(0);
                setReviewText('');
            },
            onError: (err) => {
                setError("Failed to submit review. Try again.");
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="AddReviewmodal-overlay" onClick={onClose}>
            <div className="AddReviewmodal-content" onClick={e => e.stopPropagation()}>
                <button className="AddReviewmodal-close" onClick={onClose}>×</button>
                <p className="rm-prompt">Did you enjoy your session?</p>
                <Rating
                    onClick={rate => setRating(rate)}
                    initialValue={rating}
                    size={35}
                    fillColor="#ffd700"
                    emptyColor="#ccc"
                />
                <textarea
                    className="rm-textarea"
                    placeholder="Reviews"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                />
                {error && <p className="rm-error">{error}</p>}
                <button className="rm-submit-btn" onClick={handleSubmit}>
                    SUBMIT
                </button>

            </div>
        </div>
    )
}