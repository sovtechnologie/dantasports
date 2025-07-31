import React, { useState } from "react";
import "../Stylesheets/EventDetailPage.css";
import ReviewCard from "../components/ReviewCard";
import Gallery from "../components/Gallery";

const fullText = `cvdc bcdbiw biwo bbwoe cnowe ndowh jie nc bidwu 
    bdbdi hjh u bcjdc bjoc lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

const instructiontext = `Eligibility & Age
Participants must be at least 5 years old for the 5 km event and 18 years or older for the 10 km and 21 km races.

Registration & Ticketing
All registrations are final entries and are non-transferable, non-refundable, and cannot be modified post-booking.
Internet or handling charges may apply; the full amount will be shown at checkout.
Unauthorized resale is strictly prohibited and may
`;

const reviews = [
    {
        id: 1,
        rating: 4.5,
        userName: "Aarav Mehta",
        comment: "Amazing experience! The trek was well organized and the guides were really helpful.",
        date: "3 day ago"
    },
    {
        id: 2,
        rating: 4.0,
        userName: "Priya Sharma",
        comment: "Beautiful views and great atmosphere. A bit tiring but worth every step.",
        date: "3 day ago"
    },
]

const guide = {
    tickets: "10 years & above",
    activity: "Outdoor",
    kidsFriendly: true,
    petFriendly: false,
    difficulty: 'easy'
};


export default function EventDetailPage() {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };

    return (
        <>
            <div className='Event-main-header'>
                <div className="breadcrumb">
                    <span>Event &gt; Bibwewadi &gt; Kalsubai Monsoon Trek</span>
                </div>

                <h1 className="event-name">Kalsubai Monsoon Trek</h1>
                <div className="event-location-rating">
                    <span>Bibwewadi</span>
                    <span>⭐ {4.3} (234 ratings)</span>
                </div>
            </div>

            <div className="event-details-container">
                <div className="event-wrapper">

                    <div className="event-left">
                        <div className="event-section">
                            <div className="event-heading"><strong>About the Event</strong></div>
                            <div className="event-description">
                                {expandedSection === "about"
                                    ? fullText
                                    : `${fullText.substring(0, 100)}...`}
                            </div>
                            <button onClick={() => toggleSection("about")} className="read-more-btn">
                                {expandedSection === "about" ? "Read less" : "Read more"}
                            </button>
                        </div>

                        <div className="event-section">
                            <div className="event-heading"><strong>Event Guide</strong></div>
                            <div className="event-guide-content">
                                <div className="guide-item">
                                    <div className="guide-label">Tickets Needed For</div>
                                    <div className="guide-value">{guide.tickets}</div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Activity</div>
                                    <div className="guide-value">{guide.activity}</div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Kids Friendly?</div>
                                    <div className="guide-value">{guide.kidsFriendly ? "Yes" : "No"}</div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Pet Friendly?</div>
                                    <div className={`guide-value ${!guide.petFriendly ? "no" : ""}`}>
                                        {guide.petFriendly ? "Yes" : "No"}
                                    </div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Add difficulty?</div>
                                    <div className='guide-value'>{guide.difficulty}</div>
                                </div>
                            </div>
                        </div>

                        <div className="event-section">
                            <div className="event-heading"><strong>Instruction</strong></div>
                            <div className="event-description" style={{ whiteSpace: "pre-wrap" }}>
                                {expandedSection === "instruction"
                                    ? instructiontext
                                    : `${instructiontext.substring(0, 200)}...`}
                            </div>
                            <button onClick={() => toggleSection("instruction")} className="read-more-btn">
                                {expandedSection === "instruction" ? "Read less" : "Read more"}
                            </button>
                        </div>

                        <div className="event-term_policy">
                            <div className="event-section terms">Terms & Conditions</div>
                            <div className="event-section policy">Cancellation Policy</div>
                        </div>

                        <div className="event-review">
                            <div className="event-review-heading">Rating & Reviews</div>
                            <div className="event-review-container">
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="event-right">
                        event -right
                    </div>
                </div>
                 <Gallery/>
            </div>

        </>
    )
}