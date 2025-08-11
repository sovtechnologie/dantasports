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
import Certificate1 from "../assets/certificate-name.png";
import certificatlogo from "../assets/Certificatelogo.svg"
import ReviewCard from "../components/ReviewCard";
import EnquiryModal from "../components/EnquiryModal";
import { useParams } from "react-router-dom";
import CoachImage from "../assets/CoachesImage.svg"
import footballIcon from "../assets/sport-list/Football-Icon.png"
import { useFetchCoachDetails } from "../../../hooks/CoachList/useFetchCoachDetail";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "date-fns";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { useCreateQuery } from "../../../hooks/CoachList/useCreateQuery";







const mapCoachData = (apiData) => {
    return {
        name: apiData?.name || "Unknown Venue",
        location: apiData?.locations[0]?.area || "Unknown Area",
        about: apiData?.about || "",
        type: apiData?.type,
        rating: parseFloat(apiData?.average_rating) || 0,
        reviewcount: apiData?.review_count || 0,
        address: `${apiData?.locations[0]?.full_address || ''}`.trim().replace(/^,|,$/g, '')
            || "Not Available",
        multilocation: apiData?.locations,
        training_type: apiData?.training_type,
        classes: apiData?.classes,
        fees_and_packages: apiData?.fees_and_packages,
        certficiates: apiData?.certficiates,
        images: Array.isArray(apiData?.gallery_images)
            ? apiData?.gallery_images.map((img) => img.image)
            : [RunImage, RunImage, RunImage],
        coaches: Array.isArray(apiData?.gym_coaches)
            ? apiData?.gym_coaches.map((coach) => ({
                name: coach.name,
                title: coach.type,
                image: coach.image || CoachImage
            })) : '',
        sports: Array.isArray(apiData?.linked_sports)
            ? apiData.linked_sports.map((sport) => ({
                sportId: sport.id,
                name: sport.sports_name,
                icon: sport.sports_images
            }))
            : [{ name: 'Cricket', icon: footballIcon },
            { name: 'Football', icon: footballIcon },
            { name: 'Pickle Ball', icon: footballIcon }],
        amenities: Array.isArray(apiData?.amenities)
            ? apiData.amenities.map((a) => a.name)
            : ["Not Available"],
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

export default function CoachDetailPage() {
    const { id } = useParams();
    const [expandedSection, setExpandedSection] = useState(null);
    const [start, setStart] = useState(0);
    const [showModal, setShowModal] = useState(false)


    const toggleSection = (sectionName) => {
        setExpandedSection(prev => (prev === sectionName ? null : sectionName));
    };


    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, coach?.reviews?.length - visibleCount)
        );

    const visibleCount = useMemo(() => {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }, []);

    const { data: CoachDetails, isLoading: CoachDetailsLoading } = useFetchCoachDetails(id);
    const coach = Array.isArray(CoachDetails?.result) && CoachDetails?.result.length > 0
        ? mapCoachData(CoachDetails?.result[0])
        : '';
    console.log("Coaches Details", coach);



    return (
        <>
            <div className='Coach-main-header'>
                <div className="breadcrumb">
                    <span>Coach &gt; {coach?.location} &gt; {coach?.name}</span>
                </div>

                <h1 className="coachpage-name">{coach?.name}</h1>
                <div className="coach-location-rating">
                    <span>{coach?.location}</span>
                    <span>⭐ {coach?.rating} ({coach?.reviewcount} ratings)</span>
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
                                // navigation={true}
                                modules={[Autoplay, Pagination,]}
                                className="mySwiper"
                            >
                                {coach?.images?.map((img, index) => (
                                    <SwiperSlide key={index} className="coach-swiperslide">
                                        <img src={img} alt={`coach-image-${index}`} className="coach-swiperslide-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="coach-section">
                            <div className="coach-heading">About {coach?.name}</div>
                            <div className="coach-description">
                                {expandedSection === "about"
                                    ? coach?.about
                                    : `${coach?.about?.substring(0, 100)}...`}
                            </div>
                            <button onClick={() => toggleSection("about")} className="read-more-btn">
                                {expandedSection === "about" ? "Read less" : "Read more"}
                            </button>
                        </div>

                        <div className="coach-carry-point">
                            <div className="coach-section coach-carry">
                                <div className="coach-heading">About the Sessions</div>
                                <div className="session-list">
                                    <div className="session-conatiner">
                                        <img src={calandarlogo} alt="calandarlogo" />
                                        <p>Monday, Tuesday, Wednesday, Thursday, Friday, Sunday</p>
                                    </div>
                                    <div className="session-conatiner">
                                        <img src={adultlogo} alt="adultlogo" />
                                        <p>{coach?.training_type}</p>
                                    </div>
                                    <div className="session-conatiner">
                                        <img src={sessionlogo} alt="sessionlogo" />
                                        <p>{coach?.classes}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="coach-section coach-pickPoints">
                                <div className="coach-heading">Fee & Packages</div>
                                {/* <div className="carry-list"> */}
                                <p style={{ whiteSpace: "pre-wrap" }}>
                                    {expandedSection === "FreePackges"
                                        ? coach?.fees_and_packages
                                        : `${coach?.fees_and_packages?.substring(0, 200)}...`}
                                </p>
                                <button onClick={() => toggleSection("FreePackges")} className="read-more-btn">
                                    {expandedSection === "FreePackges" ? "Read less" : "Read more"}
                                </button>

                                {/* </div> */}
                            </div>

                        </div>

                        {coach?.type === 2 && (
                            <div className="coach-carry-point">
                                <div className="coach-section coach-pickPoints">
                                    <div className="coach-heading">Coaches</div>
                                    <div className="coaches-list">
                                        {coach?.coaches?.map((coach, index) => (
                                            <div className="coaches-card" key={index}>
                                                <img src={coach.image} alt={coach.name} className="coach-image" />
                                                <p className="coach-name">{coach.name}</p>
                                                <p className="coach-title">{coach.title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="coach-section coach-pickPoints">
                                    <div className="coach-heading">Sports</div>
                                    <div className="sports-list">
                                        {coach?.sports?.map((sport, index) => (
                                            <div className="sportes-card" key={index}>
                                                <img src={sport.icon} alt={sport.name} className="sports-img" />
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
                            <div className="coach-heading">Location</div>
                            <div className="gym-right-section-p"> <p>{coach?.address}</p></div>
                            <div className="coach-map">
                                <CustomMap latitude={93.40166} longitude={62.90311} />
                            </div>

                        </div>

                        <div className="coach-right-section">
                            <div className="coach-heading">Other Serviceable Location</div>
                            {coach?.multilocation?.map((loc, index) => (
                                <a href={loc.link} target="_blank" rel="noopener noreferrer" key={index} className="location-item">
                                    <div className="icon"><img src={locationlogo} alt="location" className="locationlogo" /></div>
                                    <div className="location-text">
                                        <div className="address">{loc.area}</div>
                                        <div className="subtext">Click to view on map</div>
                                    </div>
                                    <div className="arrow">&#8250;</div>
                                </a>
                            ))}
                        </div>


                        <div className="coach-right-section">
                            <div className="coach-heading">Awards & Recognitions</div>
                            {coach?.certficiates?.map(cert => (
                                <div className="award-wrapper" key={cert.id}>
                                    {/* <img
                                        src={cert.certificate_url ? `https://${cert.certificate_url}` : certificatlogo}
                                        alt={cert.certificate_name}
                                        className="certificatelogo"
                                    /> */}
                                    <img src={Certificate1} alt="location" className="certificate"/>
                                    <div className="award-des">
                                        <ul>
                                            <li>{cert.certificate_name}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
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
                        {coach?.reviews?.slice(start, start + visibleCount).map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                    <div className="carousel-buttons">
                        <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                        <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                    </div>
                </div>
            </div>


        </>
    )
}