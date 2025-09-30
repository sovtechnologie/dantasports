import "../Stylesheets/GymDetailPage.css";
import Cookies from 'js-cookie'
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
import { useParams } from "react-router-dom";
import { useFetchGymDetail } from "../../../hooks/GymList/useFetchGymDetails";
import { useBookGym } from "../../../hooks/GymList/useBookGym";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchGymPrice } from "../../../hooks/GymList/useFetchGymPrice";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { useCreateVenueBooking } from "../../../hooks/BookingVenue/useCreateVenueBooking";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";



const timings = [
    { label: 'Morning (Mon – Sat)', range: '06:00 AM – 12:00 PM' },
    { label: 'Evening (Mon – Sat)', range: '04:00 PM – 10:00 PM' },
    { label: 'Sunday Close', range: '' },
];

const imagelist = [GymImage, GymImage1];







const mapGymData = (apiData) => {
    return {
        name: apiData?.gym_name || "Unknown Venue",
        location: apiData?.area || "Unknown Area",
        about: apiData?.about_gym || "No description available for this venue.",
        rating: parseFloat(apiData?.average_rating) || 0,
        reviewcount: apiData?.review_count || 0,
        address: `${apiData?.full_address || ''}`.trim().replace(/^,|,$/g, '')
            || "Not Available",
        gym_timing: Array.isArray(apiData?.gym_timing) ? apiData?.gym_timing : '',
        coaches: Array.isArray(apiData?.gym_coaches) ? apiData?.gym_coaches : null,
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
    const isLoggedIn = Boolean(Cookies.get('token'));
    const [expandedSection, setExpandedSection] = useState(null);
    const [start, setStart] = useState(0);
    const [selectedPass, setSelectedPass] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [passess, setPassess] = useState([{ passId: null, quantity: null }])
    const [finalAmount, setFinalAmount] = useState(null);

    const { data: GymDetails, isLoading: GymDetailsLoading } = useFetchGymDetail(id);
    const gym = Array.isArray(GymDetails?.result) && GymDetails?.result.length > 0
        ? mapGymData(GymDetails?.result[0])
        : '';

    console.log("Gym Details", gym);

    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };

    // const handleSelect = (e) => setSelectedPass(e.target.value);
    const handleSelect = (e) => {
        const selectedValue = e.target.value;
        const selectedItem = GymPrice[0]?.gym_price_slot?.find(
            (item) => item.passes_name === selectedValue
        );
        if (selectedItem) {
            setSelectedPass({
                name: selectedItem.passes_name,
                price: selectedItem.price
            });
            setQuantity(0);
            // also update passess with passId and quantity
            setPassess({
                passId: selectedItem.id, // assuming `id` exists in the object
                quantity: 0
            });
        }
    }

    const decrement = () => setQuantity(q => {
        const newQty = Math.max(0, q - 1);
        setPassess(prev => ({ ...prev, quantity: newQty }));
        return newQty;
    });

    const increment = () => setQuantity(q => {
        const newQty = q + 1;
        setPassess(prev => ({ ...prev, quantity: newQty }));
        return newQty;
    });


    const totalAmount = selectedPass ? selectedPass.price * quantity : 0;


    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, gym?.reviews?.length - visibleCount)
        );

    const visibleCount = useMemo(() => {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 3 : 3;
    }, []);




    const { data: gymPrice, isLoading: gymPriceLoading, error: gymPriceError } = useFetchGymPrice(id);
    const GymPrice = gymPrice?.result || [];
    const ConvenienceFee = GymPrice[0]?.convension_fees;


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
    const type = 3;
    const { mutate: CreateBookingPayment, isLoading: paymentLoading } = useCreateBookingPayment();
    const {
        mutate: BookGym,
        isLoading: bookingLoading,
        error: bookingError
    } = useBookGym();

    const handleProceed = () => {
        if (!isLoggedIn) {
            alert('Please log in to proceed.')
            return;
        }
        const bookingPayload = {
            isInsuranceSelected: true,
            gymId: id,
            passess: [passess]
        }


        BookGym(bookingPayload, {
            onSuccess: (data) => {
                const bookingId = data?.result;


                // Call createPayment with that bookingId
                CreateBookingPayment({
                    bookingId,
                    amount: finalAmount, // example amount
                    type: type, // or "UPI" etc.
                }, {
                    onSuccess: (paymentData) => {


                        // If API returns paymentUrl, redirect
                        if (paymentData?.result) {
                            window.open(paymentData.result, "_blank", "noopener,noreferrer");

                            // reset the fields
                            setPassess([]);
                            setSelectedPass(null)
                            setQuantity(0);
                            setFinalAmount(0);

                        }

                    },
                    onError: (error) => {
                        alert("Payment creation failed: " + (error.message || ""));
                    },
                });
            },
            onError: (error) => alert('Booking failed. ' + (error.message || '')),
        });

    }

    return (
        <>
            <div className='Gym-main-header'>
                <div className="breadcrumb">
                    <span>Gym &gt; {gym?.location} &gt; {gym?.name}</span>
                </div>

                <h1 className="gympage-name">{gym?.name}</h1>
                <div className="gym-location-rating">
                    <span>{gym?.location}</span>
                    <span className="star" style={{ marginLeft: "20px", marginRight: "5px" }}>★</span><span className="light-text"> {gym?.rating}</span><span style={{ marginLeft: "5px" }}>({gym?.reviewcount}ratings)</span>
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
                                    {/* {gym?.coaches?.map((coach, index) => (
                                        <div className="coaches-card" key={index}>
                                            <img src={coach.image || CoachImage} alt={coach.name} className="coach-image" />
                                            <p className="coach-name">{coach.name}</p>
                                            <p className="coach-title">{coach.type}</p>
                                        </div>
                                    ))} */}
                                    {Array.isArray(gym?.coaches) && gym.coaches.length > 0 ? (
                                        gym.coaches.map((coach, index) => (
                                            <div className="coaches-card" key={index}>
                                                <img
                                                    src={coach.image || CoachImage}
                                                    alt={coach.name}
                                                    className="coach-image"
                                                />
                                                <p className="coach-name">{coach.name}</p>
                                                <p className="coach-title">{coach.type}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No coaches available</p>
                                    )}
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
                                <CustomMap latitude={gym?.latitude} longitude={gym?.longitude} />
                            </div>
                        </div>

                        <div className="gym-right-section">
                            <div className="gym-heading">Choose Passes:</div>
                            <div className="section-group">
                                <div className="select-box">
                                    <label>Passes*</label>
                                    <select
                                        className="dropdown"
                                        value={selectedPass?.name || ""}
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
                            <CheckoutPricing
                                totalPrice={totalAmount}
                                convenienceFee={ConvenienceFee}
                                type={3}
                                setFinalAmount={setFinalAmount}
                            />
                        </div>

                        <div className="gym-right-section-button">
                            <button className="gym-btn" onClick={handleProceed} disabled={bookingLoading || paymentLoading}>{bookingLoading || paymentLoading ? "Processing..." : "Proceed"}</button>
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
                    {/* <div className="carousel-buttons">
                        <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                        <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                    </div> */}

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