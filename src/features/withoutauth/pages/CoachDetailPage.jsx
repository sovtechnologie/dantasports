import "../Stylesheets/CoachDetailPage.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import RunImage from "../assets/RunImage.svg";
import ShareIcon from "../assets/VenueDetailIcon/share.svg";
import LikeIcon from "../assets/VenueDetailIcon/linke.svg";
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
import { Container } from "react-bootstrap";
import EventReviewSlider from "../components/EventReviewSlider";







const mapCoachData = (apiData) => {
    const daysMap = [
        { key: "monday", label: "Monday" },
        { key: "tuesday", label: "Tuesday" },
        { key: "wednesday", label: "Wednesday" },
        { key: "thursday", label: "Thursday" },
        { key: "friday", label: "Friday" },
        { key: "saturday", label: "Saturday" },
        { key: "sunday", label: "Sunday" },
    ];

    const availableDays = daysMap
        .filter(day => apiData?.[day.key] === 1)
        .map(day => day.label)
        .join(", ") || "Not Available";
    return {
        id: apiData?.id,
        name: apiData?.name || "Unknown Venue",
        location: apiData?.locations[0]?.area || "Unknown Area",
        latitude: apiData?.locations[0]?.lat || 0,
        longitude: apiData?.locations[0]?.lng || 0,
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
        available_days: availableDays,
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
                image: review.image,
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
    const createQueryMutation = useCreateQuery();

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

    const handleEnquiry = (id) => {
        createQueryMutation.mutate(
            { academyCoachesId: id },
            {
                onSuccess: () => {
                    setShowModal(true);
                },
                onError: (error) => {
                    console.error("Failed to create query:", error);
                },
            }
        );
    }



    return (
        <>
            <section style={{ background: "#F1F3F2" }} className="pb-3 pb-lg-5">
                <section className="details_page_header">
                    <div className="container">
                        <div className='Coach-main-header'>
                        <div className="breadcrumb">
                            <span>Coach &gt; {coach?.location} &gt; {coach?.name}</span>
                        </div>

                        <h1 className="coachpage-name">{coach?.name}</h1>
                        <div className="location-rating">
                            <span>{coach?.location}</span>
                            <span className="star" style={{ marginLeft: "20px" }}>★</span> <span className="light-text" style={{ marginLeft: "5px" }}>{Math.floor(coach.rating)} ({coach?.reviewcount} ratings)</span>
                            <span className="ps-2 text_blue"><a href="">Coach Rate</a></span>

                        </div>
                    </div>
                    </div>
                </section>
                <Container>
                    <div className="coach-details-container">
                        <div className="coach-wrapper row">

                            <div className="coach-left col-lg-8">

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
                                        <div className="venue-icon-topwrapper">
                                            <button className="venue-icon-btns">
                                                <img src={ShareIcon} alt="share" />
                                            </button>

                                            <button className="venue-icon-btns">
                                                <img
                                                src={LikeIcon}
                                                alt="like"
                                                className="like-icon"
                                                />
                                            </button>
                                            </div>

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
                                                <p className="m-0">{coach.available_days}</p>
                                            </div>
                                            <div className="session-conatiner">
                                                <img src={adultlogo} alt="adultlogo" />
                                                <p className="m-0">{coach?.training_type}</p>
                                            </div>
                                            <div className="session-conatiner">
                                                <img src={sessionlogo} alt="sessionlogo" />
                                                <p className="m-0">{coach?.classes}</p>
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

                            <div className="coach-right col-lg-4">

                                <div className="coach-right-section">
                                    <div className="coach-heading">Location</div>
                                    <div className="gym-right-section-p"> <p>{coach?.address}</p></div>
                                    <div className="coach-map">
                                        <CustomMap latitude={coach?.latitude} longitude={coach?.longitude} />
                                    </div>

                                </div>

                                <div className="coach-right-section">
                                    <div className="coach-heading">Other Serviceable Location</div>
                                    {coach?.multilocation?.map((loc, index) => {
                                        const mapLink = `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;

                                        return (
                                            <a
                                                href={mapLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={index}
                                                className="location-item"
                                            >
                                                <div className="icon">
                                                    <img src={locationlogo} alt="location" className="locationlogo" />
                                                </div>
                                                <div className="location-text">
                                                    <div className="address">{loc.area}</div>
                                                    <div className="subtext-one">Click to view on map</div>
                                                </div>
                                                <div className="arrow">&#8250;</div>
                                            </a>
                                        );
                                    })}

                                </div>



                                <div className="coach-right-section">
                                    <div className="coach-heading">
                                        <h5 className="coach-heading mb-3">Awards & Recognitions</h5>
                                    </div>
                                    <div className="awards_cards">

                                        {coach?.certficiates?.map(cert => (
                                            <div className="award-wrapper" key={cert.id}>
                                                <img src={Certificate1} alt={cert.certificate_name} className="certificatelogo" />

                                                <div className="award-des">
                                                    <ul className="p-0">
                                                        <li>{cert.certificate_name}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="coach-right-section-button">
                                    <button className="coach-btn" onClick={() => handleEnquiry(coach?.id)} >{createQueryMutation.isLoading ? "Processing..." : "Enquire now"}</button>
                                    {showModal && <EnquiryModal onClose={() => setShowModal(false)} />}
                                </div>

                            </div>

                        </div>

                        <div className="ratings-carousel">
                            <EventReviewSlider event={{ review: coach?.reviews }} />
                        </div>
                    </div>
                </Container>
            </section>


        </>
    )
}