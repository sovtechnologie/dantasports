import React, { useEffect, useState } from 'react';
import "../Stylesheets/VenueCheckoutPage.css";
import { useParams, useLocation } from 'react-router-dom';
import venueImage from "../assets/Venue-image.png";
import cricketIcon from "../assets/VenueDetailIcon/CricketIcon.png";
import footballIcon from "../assets/VenueDetailIcon/Footballicon.png";
import pickleballIcon from "../assets/VenueDetailIcon/BatmintonIcon.png";
import PriceChart from '../components/PriceChart.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import Calendar from '../components/Calendar.jsx';
import TimeSelector from '../components/TimeSelector.jsx';
import ConfirmSlotCard from "../components/ConfirmSlotCard.jsx";
import checkitIcon from "../assets/Checkitcon.png";
import { useFetchSingleVenue } from '../../../hooks/VenueList/useFetchSingleVenue.js';
import { formatTime } from '../../../utils/formatTime.js';
import { useBanner } from '../../../hooks/useBanner.js';
import { useSportDetails } from '../../../hooks/favouriteSport/useSportDetails.js';
import { formatDate } from "../../../utils/formatDate.js";
import { CheckoutModal } from "../../auth/components/Modal/CheckOutModal.jsx";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



const mapVenueData = (apiData) => {
    return {
        name: apiData?.venue_name || "Unknown Venue",
        location: apiData?.area || "Unknown Area",
        about: apiData?.about_venue || "No description available for this venue.",
        rating: parseFloat(apiData?.average_rating) || 0,
        reviewcount: apiData?.review_count || 0,
        timing: `${formatTime(apiData?.start_time || '06:00:00')} - ${formatTime(apiData?.end_time || '22:00:00')}`,
        price: parseFloat(apiData?.pricing) || 0,
        address: `${apiData?.full_address || ''}, ${apiData?.area || ''}, ${apiData?.city || ''}, ${apiData?.state || ''} - ${apiData?.pincode || ''}`.trim().replace(/^,|,$/g, '')
            || "Not Available",
        images: Array.isArray(apiData?.venue_gallery)
            ? apiData.venue_gallery.map((img) => img.venue_image)
            : [venueImage, venueImage, venueImage, venueImage],
        sports: Array.isArray(apiData?.sports)
            ? apiData.sports.map((sport) => ({
                sportId: sport.id,
                name: sport.name,
                icon: sport.image
            }))
            : [{ name: 'Cricket', icon: cricketIcon },
            { name: 'Football', icon: footballIcon },
            { name: 'Pickle Ball', icon: pickleballIcon }],
        amenities: Array.isArray(apiData?.amenities)
            ? apiData.amenities.map((a) => a.name)
            : ['Not Avaiable'],
        latitude: apiData?.latitude || 0,
        longitude: apiData?.longitude || 0,
        reviews: Array.isArray(apiData?.reviews)
            ? apiData.reviews.map((review) => ({
                id: review.id,
                userName: review.user_name || "Anonymous",
                rating: review.rating || 0,
                comment: review.comment || "No comment provided",
                date: formatDate(review.createdAt) || new Date().toISOString().split('T')[0],
            }))
            : ["Not Available"], // Default to first 5 reviews if not available
    };
};

function VenueCheckoutPage() {
    const { id } = useParams();
    const location = useLocation();
    const sportIdFromLink = location.state?.sportId;
    const pageNo = 3;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSportId, setSelectedSportId] = useState(null);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSport, setSelectedSport] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [selectedPitch, setSelectedPitch] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const [start, setStart] = useState(0);
    const [errors, setErrors] = useState({
        sport: '',
        date: '',
        time: '',
        court: '',
    });


    const { data, loading, error } = useFetchSingleVenue(id);
    const venue = Array.isArray(data?.result) && data.result.length > 0
        ? mapVenueData(data.result[0])
        : {
            name: 'Loading Venue...',
            location: '',
            rating: 0,
            reviewcount: 0,
            timing: '',
            price: 0,
            address: '',
            images: [venueImage],
            sports: [],
            amenities: [],
            reviews: [],
        };

    const { data: sportDetails, isLoading: sportDetailsLoading, error: sportDetailsError } = useSportDetails(selectedSport);
    if (sportDetails && sportDetails.result) {
        console.log("Sport Details:", sportDetails.result[0]);
    }

    const sportDetailsData = sportDetails?.result ? sportDetails.result[0] : null;

    const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(pageNo);

    const banners = bannerData?.result || [];




    const handleProceedClick = () => {
        const newErrors = { sport: '', date: '', time: '', court: '' };
        let hasError = false;

        // 1️⃣ Date check
        if (!selectedDate) {
            newErrors.date = "Please select a date.";
            hasError = true;

            // 2️⃣ Sport check
        } else if (!selectedSport) {
            newErrors.sport = "Please select a sport.";
            hasError = true;

            // 3️⃣ Time check
        } else if (!selectedTime) {
            newErrors.time = "Please select a time slot.";
            hasError = true;

        } else {
            // 4️⃣ Courts availability check
            const courts = sportDetailsData?.courts;
            if (!courts || courts.length === 0) {
                newErrors.court = "No courts available for this sport/date.";
                hasError = true;

                // 5️⃣ Specific pitch selection check
            } else if (!courts.some(c => c.id === selectedPitch)) {
                newErrors.court = "Please select a valid court.";
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (hasError) {
            // Clear error after 3 seconds
            setTimeout(() => {
                setErrors({ sport: '', date: '', time: '', court: '' });
            }, 3000);
            return;
        }

        // ✅ All validations passed
        setIsModalOpen(true);
    };




    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, venue?.reviews.length + 1 - visibleCount)
        );

    const visibleCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;

    const myBookingPayload = {
        sportId: selectedSport,
        venueId: id,
        selectedDate: selectedDate, // or format as needed
        selectedDuration: selectedDuration * 60,
        selectedTime,
        selectedPitch,
    };

    const handleSportClick = (sportId) => {
        console.log("Selected Sport ID:", sportId);
        setSelectedSportId(sportId);
        setIsPriceModalOpen(true);
    };
    const closeModal = () => {
        setIsPriceModalOpen(false);
    };

    useEffect(() => {
        if (sportIdFromLink) {
            setSelectedSport(sportIdFromLink);
        }
    }, [sportIdFromLink]);

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location]);


    if (loading) return <div>Loading venue details...</div>;
    if (error) return <div>Error loading venue details</div>;
    if (!venue || Object.keys(venue).length === 0) {
        return <div>No venue data available</div>;
    }
    if (Bannerloading) return <div>Loading banners...</div>;
    if (BannerError) return <div>Error loading banners</div>;

    // if (sportDetailsLoading) return <div>Loading sport details...</div>;
    if (sportDetailsError) return <div>Error loading sport details</div>;


    return (
        <>

            <div className='venue-main-header'>
                <div className="breadcrumb">
                    <span>Venues &gt; {venue.location} &gt; {venue.name}</span>
                </div>

                <h1 className="venue-name">{venue.name}</h1>
                <div className="location-rating">
                    <span>{venue.location}</span>
                    <span className="star">★{venue.rating} ({venue.reviewcount} ratings)</span>
                </div>
            </div>

            <div className="venue-details-container" id="bookingnow">
                <div className="venue-wrapper" >
                    <div className="venue-left">
                        <div className="carousel">
                            {/* <img src={venue.images[imageIndex]} alt="venue" className="carousel-image" onError={(e) => (e.target.src = venueImage)} />
                           
                            <div
                                className="carousel-hover left"
                                onMouseEnter={startPrevSlide}
                                onMouseLeave={stopSlide}
                            />
                            <div
                                className="carousel-hover right"
                                onMouseEnter={startNextSlide}
                                onMouseLeave={stopSlide}
                            />
                            <div className="carousel-dots">
                                {venue.images.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`dot ${idx === imageIndex ? 'active' : ''}`}
                                        onClick={() => goToSlide(idx)}
                                    />
                                ))}
                            </div> */}
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
                                {venue?.images?.map((img, index) => (
                                    <SwiperSlide key={index} className="venue-swiperslide">
                                        <img src={img} alt={`event-image-${index}`} className="venue-swiperslide-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="section">

                            <div className="sports-wrapper">
                                <div className="sports-header">
                                    <strong>Sports Available</strong>
                                    <span className="note">(Click on sports to view price chart)</span>
                                </div>
                                <div className="sports-grid">
                                    {venue.sports.map((sport) => (
                                        <button
                                            className="sport-card"
                                            key={sport.name}
                                            type="button"
                                            onClick={() => handleSportClick(sport.sportId)}
                                        >
                                            <img src={sport.icon} alt={sport.name} />
                                            <p>{sport.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* PriceChart Model */}
                            {isPriceModalOpen && (
                                <PriceChart
                                    onClose={closeModal}
                                    venueId={id}
                                    sportId={selectedSportId} />
                            )}
                        </div>

                        <div className='section'>
                            <div className='sports-wrapper'>
                                <div className="sports-header">
                                    <strong>About</strong>

                                </div >
                                <div className="event-description">{venue.about}</div>
                            </div>
                        </div>

                        <div className='section'>
                            <div className='sports-wrapper'>
                                <div className='sports-header'>
                                    <strong>Amenities</strong>
                                </div>
                                <div className="amenity-tags">
                                    {venue.amenities.map((item) => (
                                        <span className="amenities-tag" key={item}>
                                            {/* <span className="check-icon"> */}
                                            <img src={checkoutIcon} alt="check" className="amt-img" />
                                            {/* </span> */}
                                            <span className="check-label">{item}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="venue-right" >

                        {/* Calendar */}

                        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                        {/* Sports Selector */}
                        <div className="vb-section">
                            <label>Select Sports:</label>
                            <div className="vb-sport-options">
                                {venue.sports.map((sport) => (
                                    <button
                                        key={sport.sportId}
                                        className={`vb-sport-btn ${selectedSport === sport.sportId ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedSport(sport.sportId);
                                            setSelectedDuration(1);
                                            setSelectedTime(null);
                                        }}
                                    >
                                        {sport.name}
                                    </button>
                                ))}
                            </div>
                            {errors.sport && <p className="form-error">{errors.sport}</p>}
                        </div>



                        <TimeSelector
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            setSelectedTime={setSelectedTime}
                            selectedDuration={selectedDuration}
                            setSelectedDuration={setSelectedDuration}
                            sportId={selectedSport}

                        />
                        {errors.time && <p className="form-error">{errors.time}</p>}


                        {/* Pitch Selection */}


                        <div className="vb-section vb-pitch-options">
                            <label>Court:</label>

                            {selectedTime ? (
                                sportDetailsData?.courts?.length > 0 ? (
                                    sportDetailsData.courts.map(court => (
                                        <button
                                            key={court.id}
                                            type="button"
                                            className={`vb-pitch-btn ${selectedPitch === court.id ? 'active' : ''}`}
                                            onClick={() => setSelectedPitch(court.id)}
                                        >
                                            {court.court_name}
                                        </button>
                                    ))
                                ) : (
                                    <p>No courts available for this sport/date.</p>
                                )
                            ) : (
                                <p className="court-placeholder">Select a timeslots to see available courts</p>
                            )}

                            {errors.court && <p className="form-error">{errors.court}</p>}
                        </div>




                        <button className="vb-proceed-btn" onClick={handleProceedClick}>PROCEED</button>

                        {isModalOpen && (
                            <div className="modal-overlay" onClick={(e) => {
                                // Only close if overlay itself is clicked
                                if (e.target === e.currentTarget) {
                                    setIsModalOpen(false);
                                }
                            }}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                                    <ConfirmSlotCard
                                        payload={myBookingPayload} // ✅ Your payload here
                                        onClose={() => {
                                            setIsModalOpen(false)
                                            setSelectedSport('');
                                            setSelectedDuration(1);
                                            setSelectedTime(null);
                                            setSelectedPitch('');
                                        }
                                        }
                                        onSuccess={(id) => {
                                            // ✅ To verify
                                            setBookingId(id)
                                            setShowPopup(true);
                                            setIsModalOpen(false);
                                            setSelectedSport('');
                                            setSelectedDuration(1);
                                            setSelectedTime(null);
                                            setSelectedPitch('');
                                        }}
                                        setBookingId={setBookingId}
                                    />

                                </div>
                            </div>
                        )}
                        <CheckoutModal
                            isOpen={showPopup}
                            bookingId={bookingId}
                            onClose={() => setShowPopup(false)}
                        />

                    </div>

                    <div className='rating-wrapper'>
                        <div className="ratings-carousel">
                            <h2 className="heading">Ratings & Reviews</h2>
                            <div className="review-carousel-container">
                                {venue.reviews.slice(start, start + visibleCount).map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                            {/* <div className="carousel-buttons">
                                <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                                <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                            </div> */}
                        </div>
                    </div>

                    <div className='banner-wrapper'>

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

                </div>
            </div>
        </>
    )
};

export default VenueCheckoutPage



