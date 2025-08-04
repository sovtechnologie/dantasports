import "../Stylesheets/CoachDetailPage.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import RunImage from "../assets/RunImage.svg";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useMemo, useState } from "react";
import calandarlogo from "../assets/calandarImage.svg";
import adultlogo from "../assets/adultlogo.svg";
import sessionlogo from "../assets/Sessionlogo.svg"
import CustomMap from "../components/CustomMap";
import locationlogo from "../assets/LocationLogo.svg";
import certificatlogo from "../assets/Certificatelogo.svg"
import ReviewCard from "../components/ReviewCard";
import EnquiryModal from "../components/EnquiryModal";
import { useParams } from "react-router-dom";
import CoachImage from "../assets/CoachesImage.svg"
import footballIcon from "../assets/sport-list/Football-Icon.png"

const imagelist = [RunImage, RunImage];

const fullText = `Hi I am Ashish & I have 6 years of experience in fitness & nutritional coaching. Worked in corporate sector for 18 years. Now fully into MPT from Dr. D.Y. Patil College and BPT from Tilak Maharashtra Vidyapeeth, with internships across 10 hospitals in Pune. Certified in Matrix Rhythm Therapy..........`;

const FreePackges = `Personal Coaching & Lifestyle Best Practices
Time Frame Price Price/Session
1 Month (12 sessions) 14,400 1,200
2 Month (24 Sessions) 28,800 1,200
3 Months (36 sessions) 40,000 933
6 Months (72 sessions) 50,000 343
12 Months (ullimited session) 1,00,000 22 
`
const locations = [
    {
        address: "5P4F+HR4, Adoor Bypass Road, Adoor, Kerala",
        link: "https://maps.google.com?q=5P4F+HR4",
    },
    {
        address: "5P4F+HR4, Adoor Bypass Road, Adoor, Kerala",
        link: "https://maps.google.com?q=5P4F+HR4",
    },
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

const coaches = [
    { name: "Yogesh Kumar", title: "Head Trainer", image: CoachImage },
    { name: "Yogesh Kumar", title: "Head Trainer", image: CoachImage },
    { name: "Yogesh Kumar", title: "Head Trainer", image: CoachImage },
];
const sports = [
    { name: "Football", icon: footballIcon },
    { name: "Football", icon: footballIcon },
    { name: "Football", icon: footballIcon },
    { name: "Football", icon: footballIcon },
    
];

export default function CoachDetailPage() {
    const [expandedSection, setExpandedSection] = useState(null);
    const [start, setStart] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams();

    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };


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
            <div className='Coach-main-header'>
                <div className="breadcrumb">
                    <span>Coach &gt; Bibwewadi &gt; Kalsubai Monsoon Trek</span>
                </div>

                <h1 className="coach-name">Kalsubai Monsoon Trek</h1>
                <div className="coach-location-rating">
                    <span>Bibwewadi</span>
                    <span>⭐ {4.3} (234 ratings)</span>
                </div>
            </div>


            <div className="coach-details-container">
                <div className="coach-wrapper">

                    <div className="coach-left">

                        <div className="coach-image-carosal">
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
                                navigation={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                className="mySwiper"
                            >
                                {imagelist.map((img, index) => (
                                    <SwiperSlide key={index} className="coach-swiperslide">
                                        <img src={img} alt={`coach-image-${index}`} className="coach-swiperslide-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="coach-section">
                            <div className="coach-heading"><strong>About  Ashish Maurice</strong></div>
                            <div className="coach-description">
                                {expandedSection === "about"
                                    ? fullText
                                    : `${fullText.substring(0, 100)}...`}
                            </div>
                            <button onClick={() => toggleSection("about")} className="read-more-btn">
                                {expandedSection === "about" ? "Read less" : "Read more"}
                            </button>
                        </div>

                        <div className="coach-carry-point">
                            <div className="coach-section coach-carry">
                                <div className="coach-heading"><strong>About the Sessions</strong></div>
                                <div className="session-list">
                                    <div className="session-conatiner">
                                        <img src={calandarlogo} alt="calandarlogo" />
                                        <p>Monday, Tuesday, Wednesday, Thursday, Friday, Sunday</p>
                                    </div>
                                    <div className="session-conatiner">
                                        <img src={adultlogo} alt="adultlogo" />
                                        <p>Adults</p>
                                    </div>
                                    <div className="session-conatiner">
                                        <img src={sessionlogo} alt="sessionlogo" />
                                        <p>1-on-1 Classes, Online Classes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="coach-section coach-pickPoints">
                                <div className="coach-heading"><strong>Fee & Packages</strong></div>
                                {/* <div className="carry-list"> */}
                                <div className="coach-description" style={{ whiteSpace: "pre-wrap" }}>
                                    {expandedSection === "FreePackges"
                                        ? FreePackges
                                        : `${FreePackges.substring(0, 200)}...`}
                                </div>
                                <button onClick={() => toggleSection("FreePackges")} className="read-more-btn">
                                    {expandedSection === "FreePackges" ? "Read less" : "Read more"}
                                </button>

                                {/* </div> */}
                            </div>

                        </div>

                        {id === 'Academy' && (
                            <div className="coach-carry-point">
                                <div className="coach-section coach-pickPoints">
                                    <div className="coach-heading"><strong>Coaches</strong></div>
                                    <div className="coaches-list">
                                        {coaches.map((coach, index) => (
                                            <div className="coach-card" key={index}>
                                                <img src={coach.image} alt={coach.name} className="coach-image" />
                                                <p className="coach-name">{coach.name}</p>
                                                <p className="coach-title">{coach.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="coach-section coach-pickPoints">
                                    <div className="coach-heading"><strong>Sports</strong></div>
                                    <div className="sports-list">
                                        {sports.map((sport, index) => (
                                            <div className="sport-card" key={index}>
                                                <img src={sport.icon} alt={sport.name} className="sport-icon" />
                                                <p className="sport-name">{sport.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        )}

                    </div>

                    <div className="coach-right">

                        <div className="coach-right-section">
                            <div className="coach-heading"><strong>Location</strong></div>
                            <p>PSA Ground Next To Shreeji Lawns Ganga Dham
                                Road Bibwewadi Pune 411037</p>
                            <div className="coach-map">
                                <CustomMap latitude={93.40166} longitude={62.90311} />
                            </div>

                        </div>

                        <div className="coach-right-section">
                            <div className="coach-heading"><strong>other Serviceable Location</strong></div>
                            {locations.map((loc, index) => (
                                <a href={loc.link} target="_blank" rel="noopener noreferrer" key={index} className="location-item">
                                    <div className="icon"><img src={locationlogo} alt="location" className="locationlogo" /></div>
                                    <div className="location-text">
                                        <div className="address">{loc.address}</div>
                                        <div className="subtext">Click to view on map</div>
                                    </div>
                                    <div className="arrow">&#8250;</div>
                                </a>
                            ))}
                        </div>


                        <div className="coach-right-section">
                            <div className="coach-heading"><strong>Awards & Recognitions</strong></div>
                            <div className="award-wrapper">
                                <img src={certificatlogo} alt="certificatelogo" className="certificatelogo" />
                                <div className="award-des">
                                    <ul>
                                        <li>Certified Nutrition & Fitness Coach</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="coach-right-section-button">
                            <button className="coach-btn" onClick={() => setShowModal(true)} >Enquired now</button>
                            {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
                        </div>

                    </div>

                </div>

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
            </div>


        </>
    )
}