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

const fullText = `A gym, short for gymnasium, is a facility equipped with various exercise machines, free weights, and training spaces designed to help individuals improve their physical fitness. It offers a structured. `;


const timings = [
    { label: 'Morning (Mon – Sat)', range: '06:00 AM – 12:00 PM' },
    { label: 'Evening (Mon – Sat)', range: '04:00 PM – 10:00 PM' },
    { label: 'Sunday Close', range: '' },
];

const imagelist = [GymImage, GymImage1];
const amenities = ['Parking', 'Restroom', 'Changing Room', 'First Aid'];
const options = [
    { value: 'basic', label: 'Basic' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP' },
];

const coaches = [
    { name: "Yogesh Kumar", title: "Head Trainer", image: CoachImage },
    { name: "Yogesh Kumar", title: "Head Trainer", image: CoachImage },
    { name: "Yogesh Kumar", title: "Head Trainer", image: CoachImage },
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
        userName: "Harsh Sharma",
        comment: "Beautiful views and great atmosphere. A bit tiring but worth every step.",
        date: "3 day ago"
    },
]

const banners = [bannerImage1, bannerImage2, bannerImage1];

export default function GymDetailPage() {
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
                Math.min(prev + 1, reviews.length + 1 - visibleCount)
            );
    
        const visibleCount = useMemo(() => {
            return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        }, []);

    return (
        <>
            <div className='Gym-main-header'>
                <div className="breadcrumb">
                    <span>Gym &gt; Bibwewadi &gt; Glod’s Gym Magarpatta City</span>
                </div>

                <h1 className="gympage-name">Glod’s Gym Magarpatta City</h1>
                <div className="gym-location-rating">
                    <span>Bibwewadi</span>
                    <span>⭐ {4.3} (234 ratings)</span>
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
                            <div className="gym-heading"><strong>About Glod’s Gym</strong></div>
                            <div className="gym-description">
                                {expandedSection === "about"
                                    ? fullText
                                    : `${fullText.substring(0, 100)}...`}
                            </div>
                            <button onClick={() => toggleSection("about")} className="read-more-btn">
                                {expandedSection === "about" ? "Read less" : "Read more"}
                            </button>
                        </div>

                        <div className="gym-section">
                            <div className="gym-heading"><strong>Amenities</strong></div>
                            <div className="gym-amenities">
                                {amenities.map(i => (
                                    <div key={i} className="amenities_tag">
                                        <img src={checkoutIcon} alt="amenities‑tag" className="amt-img" />
                                        <span>{i}</span>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="gym-carry-point">
                            <div className="gym-section gym-carry">
                                <div className="gym-heading"><strong>Timing</strong></div>
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
                                <div className="gym-heading"><strong>Coaches</strong></div>
                                <div className="coaches-list">
                                    {coaches.map((coach, index) => (
                                        <div className="coaches-card" key={index}>
                                            <img src={coach.image} alt={coach.name} className="coach-image" />
                                            <p className="coach-name">{coach.name}</p>
                                            <p className="coach-title">{coach.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="gym-term_policy">
                            <div className="gym-section terms">Terms & Conditions</div>
                            <div className="gym-section policy">Cancellation Policy</div>
                        </div>
                    </div>

                    <div className="gym-right">

                        <div className="gym-right-section">
                            <div className="gym-heading"><strong>Location</strong></div>
                            <p>PSA Ground Next To Shreeji Lawns Ganga Dham
                                Road Bibwewadi Pune 411037</p>
                            <div className="gym-map">
                                <CustomMap latitude={93.40166} longitude={62.90311} />
                            </div>
                        </div>

                        <div className="gym-right-section">
                            <div className="gym-heading"><strong>Choose Passes:</strong></div>
                            <div className="section-group">
                                <div className="select-box">
                                    <label>Passes*</label>
                                    <select
                                        className="dropdown"
                                        value={selectedPass}
                                        onChange={handleSelect}
                                    >
                                        <option value="" disabled>Select Passes</option>
                                        {options.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
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
                            <div className="gym-heading"><strong>Price details</strong></div>
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
                        {reviews.slice(start, start + visibleCount).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <div className="carousel-buttons">
                        <button onClick={prev}>←</button>
                        <button onClick={next}>→</button>
                    </div>
                </div>

                {/* Banners sections */}
                <div className='gym-banner-container'>
                    <h2 className='gym-banner-heading'>Ongoing Events</h2>
                    <div className="gym-banner-wrapper">
                        {banners.map((item, i) => (
                            <div key={i} className="gym-banner">
                                <img src={item} alt="Gym" className="gym-banner-img" />
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}