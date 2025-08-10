import React, { useMemo, useState } from "react";
import "../Stylesheets/EventDetails.css"
import ReviewCard from "../components/ReviewCard";
import Gallery from "../components/Gallery";
import bannerImage1 from "../../../assets/EventBanner/Banner1.png";
import bannerImage2 from "../../../assets/EventBanner/Banner2.png";
import CustomMap from "../components/CustomMap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import RunImage from "../assets/EventImage1.svg";
import { EventCalandar } from "../components/EventCalandar";
import TicketSelector from "../components/TicketSelector";
import CheckoutPricing from "../components/CheckoutPricing";
import BookingPopupCard from '../../auth/components/BookingPopupCard';
import { useFetchSingleEvent } from "../../../hooks/EventList/useFetchSingleEvent";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchSingleEventPrice } from "../../../hooks/EventList/useFetchEventPrice";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useParams } from "react-router-dom";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";


const banners = [bannerImage1, bannerImage2, bannerImage1];
const imagelist = [RunImage, RunImage]

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
const initialTickets = [
    { id: 1, label: '5Km Run', price: 999 },
    { id: 2, label: '10Km Run', price: 999 },
    { id: 3, label: '15Km Run', price: 999 },
    { id: 4, label: '20Km Run', price: 999 },
];

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
    {
        id: 3,
        rating: 2.0,
        userName: "Sanjay Sharma",
        comment: "Beautiful views and great atmosphere. A bit tiring but worth every step.",
        date: "3 day ago"
    },
    {
        id: 4,
        rating: 2.0,
        userName: "Sanjay Sharma",
        comment: "Beautiful views and great atmosphere. A bit tiring but worth every step.",
        date: "3 day ago"
    },
    {
        id: 5,
        rating: 2.0,
        userName: "Sanjay Sharma",
        comment: "Beautiful views and great atmosphere. A bit tiring but worth every step.",
        date: "3 day ago"
    },
]



const mapEventData = (apiData) => {
    return {
        name: apiData?.event_title || "Unknown Venue",
        location: apiData?.locations[0]?.area || "Unknown Area",
        meetupPoints: apiData?.locations || '',
        about: apiData?.about_event || "No description available for this venue.",
        rating: parseFloat(apiData?.average_rating) || 0,
        startDate: apiData?.start_date,
        endDate: apiData?.end_date,
        reviewcount: apiData?.review_count || 0,
        timing: `${formatTime(apiData?.start_time || '')} - ${formatTime(apiData?.end_time || '')}`,
        address: `${apiData?.locations[0]?.full_address || ''}`.trim().replace(/^,|,$/g, '')
            || "Not Available",
        images: Array.isArray(apiData?.event_gallery)
            ? apiData.event_gallery.map((img) => img.image_url)
            : [RunImage, RunImage, RunImage, RunImage],
        gallery: Array.isArray(apiData?.event_gallery)
            ? apiData?.event_gallery
            : [RunImage, RunImage, RunImage, RunImage],
        sports: Array.isArray(apiData?.sports)
            ? apiData.sports.map((sport) => ({
                sportId: sport.id,
                name: sport.name,
                icon: sport.image,
                categoryId: sport.category_id
            }))
            : '',
        latitude: apiData?.locations?.lat || 0,
        longitude: apiData?.locations?.lng || 0,
        carrything: apiData?.things_to_carry,
        instruction: apiData?.instruction,
        tickets: apiData?.ticket_need_for || "10 years & above",
        activity: apiData?.enter_layout || "Outdoor",
        kidsFriendly: apiData?.kids_friendly || "Yes",
        petFriendly: apiData?.pet_friendly || "No",
        difficulty: 'easy',
        favourite: apiData?.favourite,
        favourite_venue_id: apiData?.favourite_venue_id,
        termsAndCondition: apiData?.terms_and_condition,
        cancelPolicy: apiData?.cancellation_policy,
        reviews: Array.isArray(apiData?.reviews)
            ? apiData.reviews.map((review) => ({
                id: review.id,
                userName: review.user_name || "Anonymous",
                rating: review.rating || 0,
                comment: review.comment || "No comment provided",
                date: formatDate(review.createdAt) || new Date().toISOString().split('T')[0],
            }))
            : [{ comment: "Not Available" }], // Default to first 5 reviews if not available
    };
};



export default function EventDetailPage() {
    const { id } = useParams();

    const [expandedSection, setExpandedSection] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };

    const [ticketCounts, setTicketCounts] = useState(
        Array(initialTickets.length).fill(0)
    );

    const handleTicketChange = (updatedCounts) => {
        setTicketCounts(updatedCounts);
        console.log('Ticket Counts:', updatedCounts);
    };

    const handleBookPop = () => {
        setOpenModal(true);
    }

    const [start, setStart] = useState(0);
    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, event?.reviews.length - visibleCount)
        );

    const visibleCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;

    const { data: EventDetails, isLoading: eventLoading, error: eventError } = useFetchSingleEvent(id);
    const event = Array.isArray(EventDetails?.result) && EventDetails.result.length > 0
        ? mapEventData(EventDetails.result[0])
        : '';

    const { data: eventPrice, isLoading: eventPriceLoading, error: eventPriceError } = useFetchSingleEventPrice(id);
    const EventPrice = eventPrice?.result || [];
    console.log("in event details price", EventPrice)
    const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(3);

    const banners = bannerData?.result || [];
    console.log("eventDetail", event);

    return (
        <>
            <div className='Event-main-header'>
                <div className="breadcrumb">
                    <span>Event &gt; {event.location} &gt; {event.name}</span>
                </div>

                <h1 className="event-name">{event.name}</h1>
                <div className="event-location-rating">
                    <span>{event.location}</span>
                    <span>⭐ {event?.rating} ({event?.reviewcount} ratings)</span>
                </div>
            </div>

            <div className="event-details-container">
                <div className="event-wrapper">

                    <div className="event-left">

                        <div className="event-image-carosal">
                            <Swiper
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
                                // navigation={true}
                                modules={[Autoplay, Pagination]}
                                className="mySwiper"
                            >
                                {event?.images?.map((img, index) => (
                                    <SwiperSlide key={index} className="event-swiperslide">
                                        <img src={img} alt={`event-image-${index}`} className="event-swiperslide-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        <div className="event-section">
                            <div className="event-heading">About the Event</div>
                            <div className="event-description">
                                {expandedSection === "about"
                                    ? event.about
                                    : `${event?.about?.substring(0, 100)}...`}
                            </div>
                        </div>

                        <div className="event-section">
                            <div className="event-heading">Event Guide</div>
                            <div className="event-guide-content">
                                <div className="guide-item">
                                    <div className="guide-label">Tickets Needed For</div>
                                    <div className="guide-value">{event?.tickets}</div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Activity</div>
                                    <div className="guide-value">{event?.activity}</div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Kids Friendly?</div>
                                    <div className="guide-value">{event?.kidsFriendly}</div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Pet Friendly?</div>
                                    <div className={`guide-value ${!event?.petFriendly ? "no" : ""}`}>
                                        {event?.petFriendly}
                                    </div>
                                </div>
                                <div className="guide-item">
                                    <div className="guide-label">Difficulty?</div>
                                    <div className='guide-value'>{event?.difficulty}</div>
                                </div>
                            </div>
                        </div>

                        <div className="event-section">
                            <div className="event-heading">Instruction</div>
                            <div className="event-description" style={{ whiteSpace: "pre-wrap" }}>
                                {expandedSection === "instruction"
                                    ? event?.instruction
                                    : `${event?.instruction?.substring(0, 200)}...`}
                            </div>
                            <button onClick={() => toggleSection("instruction")} className="read-more-btn">
                                {expandedSection === "instruction" ? "Read less" : "Read more"}
                            </button>
                        </div>

                        <div className="event-carry-point">
                            <div className="event-section event-carry">
                                <div className="event-heading">Things to Carry</div>
                                <div className="carry-list">
                                    <ol>
                                        {event?.carrything?.split('\n').map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ol>

                                </div>
                            </div>
                            <div className="event-section event-pickPoints">
                                <div className="event-heading">Pick Points</div>
                                <div className="carry-list">
                                    <ol>
                                        {event?.meetupPoints?.map((item, index) => (
                                            <li key={index}>{item.area} , {item.city}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                        </div>

                        <div className="event-term_policy">
                            <div className="event-section terms">
                                <div className="event-heading">Terms & Conditions
                                </div>
                                <div className="event-description" style={{ whiteSpace: "pre-wrap" }}>
                                    {expandedSection === "terms"
                                        ? event?.termsAndCondition
                                        : `${event?.termsAndCondition?.substring(0, 200)}...`}
                                </div>
                                <button onClick={() => toggleSection("terms")} className="read-more-btn">
                                    {expandedSection === "terms" ? "Read less" : "Read more"}
                                </button>
                            </div>
                            <div className="event-section policy">
                                <div className="event-heading">Cancellation Policy
                                </div>
                                <div className="event-description" style={{ whiteSpace: "pre-wrap" }}>
                                    {expandedSection === "cancel"
                                        ? event?.cancelPolicy
                                        : `${event?.cancelPolicy?.substring(0, 200)}...`}
                                </div>
                                <button onClick={() => toggleSection("cancel")} className="read-more-btn">
                                    {expandedSection === "cancel" ? "Read less" : "Read more"}
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="event-right">
                        <div className="event-right-section">
                            <div className="event-heading">Location</div>
                            <div className="gym-right-section-p"><p>{event.address}</p></div>
                            <div className="venue-map">
                                <CustomMap latitude={93.40166} longitude={62.90311} />
                            </div>

                        </div>

                        <div className="event-right-section">
                            <div className="event-heading">Meetup Point</div>
                            <div className="meetup-time-dropdown">
                                <select
                                    value={selectedArea || ''}
                                    className="meetup-select"
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                >
                                    {event?.meetupPoints?.map((item, index) => (
                                        <option key={index} value={item.area}>
                                            {item.area} , {item.city}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        <div className="event-right-section">
                            <div className="event-heading">Select Date:</div>
                            <EventCalandar
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                startDateProp={event?.startDate}
                                endDateProp={event?.endDate} />
                        </div>

                        <div className="event-right-section">
                            <div className="event-heading">Chosse Tickets :</div>
                            <TicketSelector
                                tickets={EventPrice[0]?.tickets}
                                counts={ticketCounts}
                                onChange={handleTicketChange}
                            />
                        </div>

                        <div className="event-right-section">
                            <div className="event-heading">Price details</div>
                            <CheckoutPricing />
                        </div>

                        <div className="event-right-section-button">
                            <button className="event-btn" onClick={handleBookPop}>Book Tickets</button>
                        </div>
                        {
                            openModal ? (
                                <BookingPopupCard />
                            ) : ""
                        }

                    </div>
                </div>
                <Gallery gallery={event.gallery} />

                <div className="ratings-carousel">
                    <h2 className="review-heading">Ratings & Reviews</h2>
                    <div className="review-carousel-container">
                        {event?.reviews?.slice(start, start + visibleCount).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <div className="carousel-buttons">
                        <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                        <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                    </div>
                </div>

                {/* <div className='event-banner-container'>
                    <h2 className='event-banner-heading'>Ongoing Events</h2>
                    <div className="event-banner-wrapper">
                        {banners.map((item, i) => (
                            <div key={i} className="event-banner">
                                <img src={item.banner_image} alt="Event" className="event-banner-img" />
                            </div>
                        ))}
                    </div>
                </div> */}
                <div className='event-banner-container'>
                    <h2 className='event-banner-heading'>Ongoing Events</h2>
                    <div className="event-banner-carousel">
                        <div className="event-banner-track">
                            {banners.concat(banners).map((item, i) => ( // Duplicate for seamless looping
                                <div key={i} className="event-banner">
                                    <img src={item.banner_image} alt="Event" className="event-banner-img" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}