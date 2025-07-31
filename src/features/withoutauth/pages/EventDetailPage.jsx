import React, { useState } from "react";
import "../Stylesheets/EventDetailPage.css";
import ReviewCard from "../components/ReviewCard";
import Gallery from "../components/Gallery";
import bannerImage1 from "../../../assets/EventBanner/Banner1.png";
import bannerImage2 from "../../../assets/EventBanner/Banner2.png";
import CustomMap from "../components/CustomMap";


const banners = [bannerImage1, bannerImage2, bannerImage1]

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

const options = [
    { value: "IN", label: "India" },
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" }
  ];
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
                                    <div className="guide-label">Difficulty?</div>
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
                        <div className="event-right-section">
                            <div className="event-heading"><strong>Location</strong></div>
                            <p>PSA Ground Next To Shreeji Lawns Ganga Dham
                                Road Bibwewadi Pune 411037</p>
                            <div className="venue-map">
                                <CustomMap latitude={93.40166} longitude={62.90311} />
                            </div>

                        </div>

                        <div className="event-right-section">
                            <div className="event-heading"><strong>Meetup Point</strong></div>
                            <div className="meetup-time-dropdown">
                                <select
                                    value={'delhi'}
                                    className="meetup-select"
                                >
                                    <option value="">Select Meetup pint</option>
                                    {options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <Gallery />
                <div className='event-banner-container'>
                    <h2 className='event-banner-heading'>Ongoing Events</h2>
                    <div className="event-banner-wrapper">
                        {banners.map((item, i) => (
                            <div key={i} className="event-banner">
                                <img src={item} alt="Event" className="event-banner-img" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}