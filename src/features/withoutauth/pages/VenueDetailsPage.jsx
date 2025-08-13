import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../Stylesheets/VenueDetail.css";
import venueImage from "../assets/Venue-image.png";
import cricketIcon from "../assets/VenueDetailIcon/CricketIcon.png";
import footballIcon from "../assets/VenueDetailIcon/Footballicon.png";
import pickleballIcon from "../assets/VenueDetailIcon/BatmintonIcon.png";
import ReviewCard from '../components/ReviewCard.jsx';
import ShareIcon from '../assets/VenueDetailIcon/shareIcon.png';
import LikeIcon from '../assets/VenueDetailIcon/LikeIcon.png';
import PriceChart from '../components/PriceChart.jsx';
import checkitIcon from "../assets/Checkitcon.png";
import { useFetchSingleVenue } from '../../../hooks/VenueList/useFetchSingleVenue.js';
import { formatTime } from '../../../utils/formatTime.js';
import CustomMap from '../components/CustomMap.jsx';
import { useBanner } from '../../../hooks/useBanner.js';
import { Share } from '../../../utils/share.js';
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";
import { useSelector } from 'react-redux';
import { useLikeVenue } from '../../../hooks/favouriteVenue/useLikeVenue.js';
import { useUnlikeVenue } from '../../../hooks/favouriteVenue/useUnlikeVenue.js';
import { useQueryClient } from '@tanstack/react-query';
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Calendar from '../components/Calendar.jsx';
import TimeSelector from '../components/TimeSelector.jsx';
import { useSportDetails } from '../../../hooks/favouriteSport/useSportDetails.js';
import { CheckoutModal } from '../../auth/components/Modal/CheckOutModal.jsx';
import ConfirmSlotCard from '../components/ConfirmSlotCard.jsx';
import CheckoutPricing from '../components/CheckoutPricing.jsx';



export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};


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
            : ["Not Available"],
        latitude: apiData?.latitude || 0,
        longitude: apiData?.longitude || 0,
        favourite: apiData?.favourite,
        favourite_venue_id: apiData?.favourite_venue_id,
        reviews: Array.isArray(apiData?.reviews)
            ? apiData.reviews.map((review) => ({
                id: review.id,
                userName: review.user_name || "Anonymous",
                rating: review.rating || 0,
                comment: review.comment || "No comment provided",
                date: formatDate(review.createdAt) || new Date().toISOString().split('T')[0],
            }))
            : [], // Default to first 5 reviews if not available
    };
};



function VenueDetailsPage() {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const userId = useSelector((state) => state?.auth?.id);
    const likeVenue = useLikeVenue();
    const unlikeVenue = useUnlikeVenue();
    const [selectedSportId, setSelectedSportId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [selectedPitch, setSelectedPitch] = useState('');
    const [selectedSport, setSelectedSport] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [bookingId, setBookingId] = useState(null);
    const [errors, setErrors] = useState({
        sport: '',
        date: '',
        time: '',
        court: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const pageNo = 3; // Pass dynamic page number as needed
    const { data, loading, error } = useFetchSingleVenue(id, userId);
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


    // Replace with actual data fetching logic

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
    };

    const handleClickLike = (venue) => {
        if (!venue.favourite) {
            likeVenue.mutate({ id, userId }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(["fetchSingleVenue", id, userId]);
                },
                onError: () => {
                    console.error("Failed to like the button")
                },
            })
        } else {
            unlikeVenue.mutate({ favouriteVenueId: venue.favourite_venue_id }, {
                onSuccess: async () => {
                    await queryClient.invalidateQueries(["fetchSingleVenue", id, userId]);
                },
                onError: () => {
                    console.error("Failed to unlike the button ")
                }
            })
        }
    }

   

    const [start, setStart] = useState(0);


    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, venue?.reviews?.length + 1 - visibleCount)
        );

    const visibleCount = useMemo(() => {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }, []);



    console.log("my review", venue.reviews);




    if (loading) return <div>Loading venue details...</div>;
    if (error) return <div>Error loading venue details</div>;
    if (!venue || Object.keys(venue).length === 0) {
        return <div>No venue data available</div>;
    }
    if (Bannerloading) return <div>Loading banners...</div>;
    if (BannerError) return <div>Error loading banners</div>;

    return (
        <>

            <div className='venue-main-header'>
                <div className="breadcrumb">
                    <span>Venues &gt; {venue.location} &gt; {venue.name}</span>
                </div>

                <h1 className="venue-name">{venue.name}</h1>
                <div className="location-rating">
                    <span>{venue.location}</span>
                    <span>⭐ {venue.rating} ({venue.reviewcount} ratings)</span>
                </div>
            </div>

            <div className="venue-details-container">
                <div className="venue-wrapper">
                    <div className="venue-left">
                        <div className="carousel">
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
                                        <div className="venue-icon-topwrapper">
                                            <button className="venue-icon-btns" onClick={Share} ><img src={ShareIcon} alt='share' className="" /></button>
                                            <button className="venue-icon-btns" onClick={() => handleClickLike(venue)}><img src={venue.favourite ? HeartFilled : LikeIcon} alt='like' className="like-icon" /></button>
                                        </div>
                                        <img src={img} alt={`event-image-${index}`} className="venue-swiperslide-img" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        <div className='section'>
                            <div className='sports-wrapper'>
                                <div className="sports-header">
                                    About
                                </div>
                                <p>{venue.about}</p>
                            </div>
                        </div>
                        <div className="section">
                            <div className='sports-wrapper'>
                                <div className="sports-header">
                                    Amenities
                                </div>
                                <div className="amenities-tags">
                                    {venue.amenities.map((item) => (
                                        <span className="amenities-tag" key={item}>
                                            <span className="check-icon">
                                                <img src={checkitIcon} alt="check" />
                                            </span>
                                            <span className="check-label">{item}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="section">
                            <div className="sports-wrapper">
                                <div className="sports-header">
                                    Sports Available
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

                            <PriceChart
                                venueId={id}
                                sportId={selectedSportId || venue?.sports[0]?.sportId} />
                        </div>



                    </div>
                    <div className="venue-right">






                        <div className="venue-location">
                            <div className="sports-header">Location:</div>

                            <div className="gym-right-section-p"><p>{venue.address}</p></div>
                            <div className="venue-map">
                                <CustomMap latitude={venue.latitude} longitude={venue.longitude} />
                            </div>
                        </div>
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

                        <div className="venue-right-section">
                            <div className="venue-heading">Price details</div>
                            <CheckoutPricing totalPrice={1000} convenienceFee={100} type={1} />
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

                    {venue?.reviews?.length > 0 && (
                        <div className='rating-wrapper'>
                            <div className="ratings-carousel">
                                <h2 className="review-heading">Ratings & Reviews</h2>
                                <div className="review-carousel-container">
                                    {venue.reviews.slice(start, start + visibleCount).map((review) => (
                                        <ReviewCard key={review.id} review={review} />
                                    ))}
                                </div>
                                <div className="carousel-buttons">
                                    <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                                    <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                                </div>

                            </div>
                        </div>
                    )}




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

export default VenueDetailsPage

