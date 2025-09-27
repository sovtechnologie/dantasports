import React, { useState } from "react";
import "../Stylesheets/EventDetails.css"
import Cookies from 'js-cookie';
import ReviewCard from "../components/ReviewCard";
import Gallery from "../components/Gallery";
import CustomMap from "../components/CustomMap";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import RunImage from "../assets/EventImage1.svg";
import { EventCalandar } from "../components/EventCalandar";
import TicketSelector from "../components/TicketSelector";
import CheckoutPricing from "../components/CheckoutPricing";
import { useFetchSingleEvent } from "../../../hooks/EventList/useFetchSingleEvent";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchSingleEventPrice } from "../../../hooks/EventList/useFetchEventPrice";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { useBookEvent } from "../../../hooks/EventList/useBookEvent";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";
import ShareIcon from "../assets/VenueDetailIcon/shareIcon.png";
import LikeIcon from "../assets/VenueDetailIcon/LikeIcon.png";
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useParams } from "react-router-dom";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { useUnlikeEvent } from "../../../hooks/favouriteEvent/useUnLikeEvent";
import { useLikeEvent } from "../../../hooks/favouriteEvent/useLikeEvent";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Share } from "../../../utils/share";


const initialTickets = [
    { id: 1, label: '5Km Run', price: 999 },
    { id: 2, label: '10Km Run', price: 999 },
    { id: 3, label: '15Km Run', price: 999 },
    { id: 4, label: '20Km Run', price: 999 },
];






const mapEventData = (apiData) => {
    return {
        name: apiData?.event_title || "Unknown Venue",
        type: apiData?.event_type,
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
        latitude: apiData?.locations[0]?.lat || 0,
        longitude: apiData?.locations[0]?.lng || 0,
        carrything: apiData?.things_to_carry,
        instruction: apiData?.instruction,
        tickets: apiData?.ticket_need_for || "10 years & above",
        activity: apiData?.enter_layout || "Outdoor",
        kidsFriendly: apiData?.kids_friendly || "Yes",
        petFriendly: apiData?.pet_friendly || "No",
        difficulty: 'easy',
        favourite: apiData?.favourite,
        favourite_event_id: apiData?.favourite_event_id,
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
    const queryClient = useQueryClient();
    const userId = useSelector((state) => state.auth.id);
    const isLoggedIn = Boolean(Cookies.get('token'));
    const [expandedSection, setExpandedSection] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');
    const [locationId, setLocationId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [totalPrice, setTotalPrice] = useState(null);
    const [finalAmount, setFinalAmount] = useState(null);
    const [tickets, setTickets] = useState({ ticketsId: null, quantity: null })

    const { data: EventDetails, isLoading: eventLoading, error: eventError } = useFetchSingleEvent({ eventId: id, userId });
    const event = Array.isArray(EventDetails?.result) && EventDetails.result.length > 0
        ? mapEventData(EventDetails.result[0])
        : '';
    const type = event?.type;

    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };

    const likeEvent = useLikeEvent();
    const unlikeEvent = useUnlikeEvent();

    // like and unlike event
    const handleClickLike = (event) => {
        if (!event.favourite) {
            likeEvent.mutate(
                { eventId: id, userId, type: event?.type },
                {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries([
                            "fetchSingleEvent",
                            id,
                            userId,
                        ]);
                    },
                    onError: () => {
                        console.error("Failed to like the event");
                    },
                }
            );
        } else {
            debugger
            unlikeEvent.mutate(
                { favouriteEventId: event?.favourite_event_id, type: event?.type },
                {
                    onSuccess: async () => {
                        await queryClient.invalidateQueries([
                            "fetchSingleEvent",
                            id,
                            userId,
                        ]);
                    },
                    onError: () => {
                        console.error("Failed to unlike the event");
                    },
                }
            );
        }
    };


    const [ticketCounts, setTicketCounts] = useState(
        Array(initialTickets.length).fill(0)
    );


    const handleTicketChange = (updatedCounts) => {
        setTicketCounts(updatedCounts);
    };

    const { mutate: CreateBookingPayment, isLoading: paymentLoading } = useCreateBookingPayment();
    const {
        mutate: BookEvent,
        isLoading: bookingLoading,
        error: bookingError
    } = useBookEvent();


    const [start, setStart] = useState(0);
    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, event?.reviews.length - visibleCount)
        );

    const visibleCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;



    const { data: eventPrice, isLoading: eventPriceLoading, error: eventPriceError } = useFetchSingleEventPrice(id);
    const EventPrice = eventPrice?.result || [];
    const ConvenienceFee = EventPrice[0]?.convension_fees;
    const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(3);

    const banners = bannerData?.result || [];
    // console.log("eventDetail", selectedArea, locationId);


    const handleBookEvent = () => {
        if (!isLoggedIn) {
            alert('Please log in to proceed.')
            return;
        }
        const bookingPayload = {
            locationId: 1,
            bookingDate: selectedDate,
            eventId: id,
            tickets: tickets,
        };

        BookEvent(bookingPayload, {
            onSuccess: (data) => {
                const bookingId = data?.result;
                // If your API returns "insertId" or something else, change this accordingly
                // Call createPayment with that bookingId
                CreateBookingPayment({
                    bookingId,
                    amount: finalAmount, // example amount
                    type: type, // or "UPI" etc.
                }, {
                    onSuccess: (paymentData) => {
                        // console.log("Payment created:", paymentData);

                        // If API returns paymentUrl, redirect
                        if (paymentData?.result) {
                            window.open(paymentData.result, "_blank", "noopener,noreferrer");

                            // reset the Fieids
                            setSelectedArea('');
                            setSelectedDate(null);
                            setFinalAmount(null);
                            setTotalPrice(0);
                            setTickets([]);
                        }

                    },
                    onError: (error) => {
                        alert("Payment creation failed: " + (error.message || ""));
                    },
                });
            },
            onError: (error) => {
                alert("Booking failed: " + (error.message || ""));
            },
        });
    };

    return (
        <>
            <div className='Event-main-header'>
                <div className="breadcrumb">
                    <span>Event &gt; {event.location} &gt; {event.name}</span>
                </div>

                <h1 className="event-name">{event.name}</h1>
                <div className="event-location-rating">
                    <span>{event.location}</span>
                    <span className="star" style={{ marginLeft: "20px" }}>★</span> <span className="light-text" style={{ marginLeft: "5px" }}>{event?.rating}({event?.reviewcount} ratings)</span>
                </div>

                <div className="event-icon-topwrapper">
                    <button className="event-icon-btns" onClick={Share}>
                        <img src={ShareIcon} alt="share" className="" />
                    </button>
                    <button
                        className="event-icon-btns"
                        onClick={() => handleClickLike(event)}
                    >
                        <img
                            src={event.favourite ? HeartFilled : LikeIcon}
                            alt="like"
                            className="like-icon"
                        />
                    </button>
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
                                <CustomMap latitude={event?.latitude} longitude={event?.longitude} />
                            </div>

                        </div>

                        <div className="event-right-section">
                            <div className="event-heading">Meetup Point</div>
                            <div className="meetup-time-dropdown">
                                <select
                                    value={selectedArea || ''}
                                    className="meetup-select"
                                    onChange={(e) => {
                                        setSelectedArea(e.target.value)
                                        setLocationId(e.target.key);

                                    }}
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
                                setTotalPrice={setTotalPrice}
                                setTickets={setTickets}
                            />
                        </div>

                        <div className="event-right-section">
                            <div className="event-heading">Price details</div>
                            <CheckoutPricing
                                totalPrice={totalPrice}
                                convenienceFee={ConvenienceFee}
                                type={type}
                                setFinalAmount={setFinalAmount} />
                        </div>

                        <div className="event-right-section-button">
                            <button className="event-btn" onClick={handleBookEvent} disabled={bookingLoading || paymentLoading}> {bookingLoading || paymentLoading ? "Processing..." : "Book Tickets"}</button>
                        </div>

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
                    {/* <div className="carousel-buttons">
                        <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                        <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                    </div> */}
                </div>


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