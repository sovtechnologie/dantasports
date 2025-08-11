import "../Stylesheets/GymDetailPage.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import GymImage from "../assets/mygym.svg"
import GymImage1 from "../assets/GymImage.svg"
import checkoutIcon from "../assets/checkOutIcon.png";
import CoachImage from "../assets/CoachesImage.svg"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useMemo, useState } from "react";
import CustomMap from "../components/CustomMap";
import CheckoutPricing from "../components/CheckoutPricing";
import ReviewCard from "../components/ReviewCard";
import bannerImage1 from "../../../assets/EventBanner/Banner1.png";
import bannerImage2 from "../../../assets/EventBanner/Banner2.png";
import { useParams } from "react-router-dom";
import { useFetchGymDetail } from "../../../hooks/GymList/useFetchGymDetails";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "date-fns";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchGymPrice } from "../../../hooks/GymList/useFetchGymPrice";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";



const timings = [
    { label: 'Morning (Mon – Sat)', range: '06:00 AM – 12:00 PM' },
    { label: 'Evening (Mon – Sat)', range: '04:00 PM – 10:00 PM' },
    { label: 'Sunday Close', range: '' },
];

const imagelist = [GymImage, GymImage1];







const mapGymData = (apiData) => {
    return {
        name: apiData?.gym_name || "Unknown Venue",
        location: apiData?.full_address || "Unknown Area",
        about: apiData?.about_gym || "No description available for this venue.",
        rating: parseFloat(apiData?.average_rating) || 0,
        reviewcount: apiData?.review_count || 0,
        address: `${apiData?.full_address || ''}`.trim().replace(/^,|,$/g, '')
            || "Not Available",
        gym_timing: Array.isArray(apiData?.gym_timing) ? apiData?.gym_timing : '',
        coaches: Array.isArray(apiData?.gym_coaches) ? apiData?.gym_coaches : '',
        images: Array.isArray(apiData?.event_gallery)
            ? apiData.event_gallery.map((img) => img.image_url)
            : [GymImage, GymImage, GymImage, GymImage],
        latitude: apiData?.lat || 0,
        longitude: apiData?.lng || 0,
        amenities: Array.isArray(apiData?.amenities)
            ? apiData?.amenities?.map((a) => a.name)
            : ["Not Available"],
        favourite: apiData?.favourite,
        favourite_venue_id: apiData?.favourite_venue_id,
        termsAndCondition: apiData?.term_and_conditions,
        cancelPolicy: apiData?.cancellation_policy,
        reviews: Array.isArray(apiData?.reviews)
            ? apiData.reviews.map((review) => ({
                id: review.id,
                userName: review.user_name || "Anonymous",
                rating: review.rating || 0,
                comment: review.comment || "No comment provided",
                // date: formatDate(review.createdAt) || new Date().toISOString().split('T')[0],
            }))
            : [{ comment: "Not Available" }], // Default to first 5 reviews if not available
    };
};

export default function GymDetailPage() {
    const { id } = useParams();


    const [expandedSection, setExpandedSection] = useState(null);
    const [start, setStart] = useState(0);

    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };

    const [selectedPass, setSelectedPass] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSelect = (e) => setSelectedPass(e.target.value);

    const decrement = () => setQuantity(q => Math.max(0, q - 1));
    const increment = () => setQuantity(q => q + 1);

    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, gym?.reviews?.length - visibleCount)
        );

    const visibleCount = useMemo(() => {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }, []);

    const { data: GymDetails, isLoading: GymDetailsLoading } = useFetchGymDetail(id);
    const gym = Array.isArray(GymDetails?.result) && GymDetails?.result.length > 0
        ? mapGymData(GymDetails?.result[0])
        : '';
    
    const { data: gymPrice, isLoading: gymPriceLoading, error: gymPriceError } = useFetchGymPrice(id);
    const GymPrice = gymPrice?.result || [];
    console.log("gym details", GymPrice[0]?.gym_price_slot);
    
    const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(3);

    const banners = bannerData?.result || [];

    // Helper to convert "HH:mm:ss" → "hh:mm AM/PM"
    // function formatTime(timeStr) {
    //   const [hour, minute] = timeStr.split(":");
    //   let h = parseInt(hour, 10);
    //   const ampm = h >= 12 ? "PM" : "AM";
    //   h = h % 12 || 12;
    //   return `${String(h).padStart(2, "0")}:${minute} ${ampm}`;
    // }

    // Main transformation
    // Days in order with backend keys
    const daysMap = [
        { key: "monday", label: "Monday" },
        { key: "tuesday", label: "Tuesday" },
        { key: "wednesday", label: "Wednesday" },
        { key: "thusday", label: "Thursday" }, // typo matches backend
        { key: "friday", label: "Friday" },
        { key: "saturday", label: "Saturday" },
        { key: "sunday", label: "Sunday" }
    ];

    // Format time function
    function formatTime(timeStr) {
        const [hour, minute] = timeStr.split(":");
        let h = parseInt(hour, 10);
        const ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return `${String(h).padStart(2, "0")}:${minute} ${ampm}`;
    }

    // const gymtime = gym?.gym_timing[0];

    // const timings = daysMap?.map(day => {
    //   if (gymtime[day.key] === 1) {
    //     return {
    //       label: `${day.label} Open`,
    //       range: `${formatTime(gymtime?.start_time)} – ${formatTime(gymtime?.end_time)}`
    //     };
    //   } else {
    //     return {
    //       label: `${day.label} Close`,
    //       range: ""
    //     };
    //   }
    // });

    return (
        <>
            <div className='Gym-main-header'>
                <div className="breadcrumb">
                    <span>Gym &gt; {gym?.location} &gt; {gym?.name}</span>
                </div>

                <h1 className="gympage-name">{gym?.name}</h1>
                <div className="gym-location-rating">
                    <span>{gym?.location}</span>
                    <span>⭐ {gym?.rating} (234 ratings)</span>
                </div>
            </div>


            <div className="gym-details-container">
                <div className="gym-wrapper">
                    <div className="gym-left">

                        <div className="gym-image-carosal">
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
                                modules={[Autoplay, Pagination,]}
                                className="mySwiper"
                            >
                                {imagelist.map((img, index) => (
                                    <SwiperSlide key={index} className="gym-swiperslide">
                                        <img src={img} alt={`gym-image-${index}`} className="gym-swiperslide-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="gym-section">
                            <div className="gym-heading">About Glod’s Gym</div>
                            <div className="gym-description">
                                {expandedSection === "about"
                                    ? gym?.about
                                    : `${gym?.about?.substring(0, 100)}...`}
                            </div>
                        </div>

                        <div className="gym-section">
                            <div className="gym-heading">Amenities</div>
                            <div className="gym-amenities">
                                {gym?.amenities?.map(i => (
                                    <div key={i} className="amenities_tag">
                                        <img src={checkoutIcon} alt="amenities‑tag" className="amt-img" />
                                        <span>{i}</span>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="gym-carry-point">
                            <div className="gym-section gym-carry">
                                <div className="gym-heading">Timing</div>
                                <ol className="timing-list">
                                    {timings.map((t, idx) => (
                                        <li key={idx} className="timing-item">
                                            <span className="label">{t.label}:</span>
                                            {t.range && (
                                                <span className="range">{t.range}</span>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div className="gym-section gym-pickPoints">
                                <div className="gym-heading">Coaches</div>
                                <div className="coaches-list">
                                    {gym?.coaches?.map((coach, index) => (
                                        <div className="coaches-card" key={index}>
                                            <img src={coach.image || CoachImage} alt={coach.name} className="coach-image" />
                                            <p className="coach-name">{coach.name}</p>
                                            <p className="coach-title">{coach.type}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="gym-term_policy">
                            <div className="gym-section terms">
                                <div className="gym-heading">Terms & Conditions
                                </div>
                                <div className="gym-description" style={{ whiteSpace: "pre-wrap" }}>
                                    {expandedSection === "terms"
                                        ? gym?.termsAndCondition
                                        : `${gym?.termsAndCondition?.substring(0, 200)}...`}
                                </div>
                                <button onClick={() => toggleSection("terms")} className="read-more-btn">
                                    {expandedSection === "terms" ? "Read less" : "Read more"}
                                </button>
                            </div>
                            <div className="gym-section policy">
                                <div className="gym-heading">Cancellation Policy
                                </div>
                                <div className="gym-description" style={{ whiteSpace: "pre-wrap" }}>
                                    {expandedSection === "cancel"
                                        ? gym?.cancelPolicy
                                        : `${gym?.cancelPolicy?.substring(0, 200)}...`}
                                </div>
                                <button onClick={() => toggleSection("cancel")} className="read-more-btn">
                                    {expandedSection === "cancel" ? "Read less" : "Read more"}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="gym-right">

                        <div className="gym-right-section">
                            <div className="gym-heading">Location</div>
                             <div className="gym-right-section-p"><p>{gym?.address}</p></div>
                            <div className="gym-map">
                                <CustomMap latitude={93.40166} longitude={62.90311} />
                            </div>
                        </div>

                        <div className="gym-right-section">
                            <div className="gym-heading">Choose Passes:</div>
                            <div className="section-group">
                                <div className="select-box">
                                    <label>Passes*</label>
                                    <select
                                        className="dropdown"
                                        value={selectedPass}
                                        onChange={handleSelect}
                                    >
                                        <option value="" disabled>Select Passes</option>
                                        {GymPrice[0]?.gym_price_slot?.map((item, index) => (
                                            <option key={index} value={item.passes_name}>₹{item.price}/{item.passes_name}</option>
                                        ))}
                                    </select>
                                    {/* Replace above with real dropdown component if needed */}
                                </div>
                                <div className="quantity-box">
                                    <label>Quantity:</label>
                                    <div className="qty-control">
                                        <button type="button" className="btn minus" onClick={decrement}>−</button>
                                        <span className="qty">{quantity}</span>
                                        <button type="button" className="btn plus" onClick={increment}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="gym-right-section">
                            <div className="gym-heading">Price details</div>
                            <CheckoutPricing />
                        </div>

                        <div className="gym-right-section-button">
                            <button className="gym-btn" >Proceed</button>
                        </div>


                    </div>
                </div>

                {/* review section */}
                <div className="ratings-carousel">
                    <h2 className="review-heading">Ratings & Reviews</h2>
                    <div className="review-carousel-container">
                        {gym?.reviews?.slice(start, start + visibleCount).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <div className="carousel-buttons">
                        <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                        <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                    </div>
                   
                </div>

                {/* Banners sections */}
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