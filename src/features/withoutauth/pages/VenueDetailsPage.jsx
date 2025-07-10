import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "../Stylesheets/VenueDetail.css";
import venueImage from "../assets/Venue-image.png";
import cricketIcon from "../assets/VenueDetailIcon/CricketIcon.png";
import footballIcon from "../assets/VenueDetailIcon/Footballicon.png";
import pickleballIcon from "../assets/VenueDetailIcon/BatmintonIcon.png";
import reviews from "../StaticData/ReviewRatingData.js";
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
            : [{ comment: "Not Available" }], // Default to first 5 reviews if not available
    };
};



function VenueDetailsPage() {

    const { id } = useParams();
    const queryClient = useQueryClient();
    const userId = useSelector((state) => state?.auth?.id);
    const likeVenue = useLikeVenue();
    const unlikeVenue = useUnlikeVenue();
    const [selectedSportId, setSelectedSportId] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [slideInterval, setSlideInterval] = useState(null);
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


    const { data: bannerData, isLoading: Bannerloading, error: BannerError } = useBanner(pageNo);

    const banners = bannerData?.result || [];





    // Replace with actual data fetching logic


    const startPrevSlide = () => {
        if (slideInterval) return;
        const interval = setInterval(prevSlide, 3000); // adjust speed as needed
        setSlideInterval(interval);
    };

    const startNextSlide = () => {
        if (slideInterval) return;
        const interval = setInterval(nextSlide, 3000); // adjust speed as needed
        setSlideInterval(interval);
    };

    const stopSlide = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
            setSlideInterval(null);
        }
    };

    const nextSlide = () => {
        setImageIndex((prev) => (prev + 1) % venue.images.length);
    };

    const prevSlide = () => {
        setImageIndex((prev) => (prev - 1 + venue.images.length) % venue.images.length);
    };

    const goToSlide = (index) => {
        setImageIndex(index);
    };



    const handleSportClick = (sportId) => {
        console.log("Selected Sport ID:", sportId);
        setSelectedSportId(sportId);
        setIsModalOpen(true);
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

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [start, setStart] = useState(0);


    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, reviews.length + 1 - visibleCount)
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
                            <img src={venue.images[imageIndex]} alt="venue" className="carousel-image" onError={(e) => (e.target.src = venueImage)} />
                            {/* <div className="carousel-controls"> */}
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
                            {/* </div> */}
                            <div className="carousel-dots">
                                {venue.images.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`dot ${idx === imageIndex ? 'active' : ''}`}
                                        onClick={() => goToSlide(idx)}
                                    />
                                ))}
                            </div>
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
                            {isModalOpen && (
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
                                </div>
                                <p>{venue.about}</p>
                            </div>
                        </div>
                        <div className="section">
                            <div className='sports-wrapper'>
                                <div className="sports-header">
                                    <strong>Amenities</strong>
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


                    </div>
                    <div className="venue-right">

                        <div className="btn-group" style={{ marginTop: "0px" }}>
                            <Link to={`/venueCheckout/${id}#bookingnow`} style={{ textDecoration: "none", color: "inherit" }}><button className="btn-primary" >Book Now</button></Link>
                        </div>

                        <div className="venue-actions">
                            <button className="venue-action-btn" onClick={Share} ><img src={ShareIcon} alt='share' className="venue-icon" style={{ marginLeft: "50px" }} />Share</button>
                            <button className="venue-action-btn" onClick={() => handleClickLike(venue)}><img src={venue.favourite ? HeartFilled : LikeIcon} alt='like' className="venue-icon" /> Favourite</button>
                        </div>

                        <div className="venue-timing-price">
                            <div>
                                <strong>Timing</strong>
                                <p>{venue.timing}</p>
                            </div>
                            <div>
                                <strong>Price</strong>
                                <p>₹{venue.price} onwards</p>
                            </div>
                        </div>

                        <div className="venue-location">
                            <div><strong>Location:</strong></div>
                            <p>{venue.address}</p>
                            <div className="venue-map">

                                <CustomMap latitude={venue.latitude} longitude={venue.longitude} />
                            </div>

                        </div>

                        <div className="btn-group">
                            <Link to="/CorporateBooking" style={{ textDecoration: "none", color: "inherit" }}> <button className="btn-secondary">Corporate Booking</button>
                            </Link>
                        </div>
                    </div>

                    <div className='rating-wrapper'>
                        <div className="ratings-carousel">
                            <h2 className="review-heading">Ratings & Reviews</h2>
                            <div className="review-carousel-container">
                                {venue.reviews.slice(start, start + visibleCount).map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                            </div>
                            <div className="carousel-buttons">
                                <button onClick={prev}>←</button>
                                <button onClick={next}>→</button>
                            </div>
                        </div>
                    </div>

                    <div className='banner-wrapper'>
                        <div className='banner'>
                            <h2 className='banner-heading'>Ongoing Events</h2>
                            <div className="image-banner-wrapper">
                                {banners.map((item, i) => (
                                    <div key={i} className="image-banner">
                                        <img src={item.banner_image} alt="Event" />
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
};

export default VenueDetailsPage

