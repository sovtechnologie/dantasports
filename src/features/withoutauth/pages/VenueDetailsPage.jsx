import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../Stylesheets/VenueDetail.css";
import venueImage from "../assets/Venue-image.png";
import cricketIcon from "../assets/VenueDetailIcon/CricketIcon.png";
import footballIcon from "../assets/VenueDetailIcon/Footballicon.png";
import pickleballIcon from "../assets/VenueDetailIcon/BatmintonIcon.png";
import reviews from "../StaticData/ReviewRatingData.js";
import ReviewCard from '../components/ReviewCard.jsx';
import Banner from '../assets/venue-banner.png';
import ShareIcon from '../assets/VenueDetailIcon/shareIcon.png';
import LikeIcon from '../assets/VenueDetailIcon/LikeIcon.png';
import PriceChart from '../components/PriceChart.jsx';
import checkitIcon from "../assets/Checkitcon.png";
import { useFetchSingleVenue } from '../../../hooks/VenueList/useFetchSingleVenue.js';
import { formatTime } from '../../../utils/formatTime.js';
import CustomMap from '../components/CustomMap.jsx';

const banners = [Banner, Banner, Banner];

const mapVenueData = (apiData) => {
    return {
        name: apiData?.venue_name || "Unknown Venue",
        location: apiData?.area || "Unknown Area",
        rating: 4, // Assuming static, unless provided
        reviews: 6, // Assuming static, unless provided
        timing: `${formatTime(apiData?.start_time || '06:00:00')} - ${formatTime(apiData?.end_time || '22:00:00')}`,
        price: parseFloat(apiData?.pricing) || 1100,
        address: `${apiData?.full_address || ''}, ${apiData?.area || ''}, ${apiData?.city || ''}, ${apiData?.state || ''} - ${apiData?.pincode || ''}`.trim().replace(/^,|,$/g, '')
            || "Not Available",
        images: [
            apiData?.cover_image ? apiData.cover_image : venueImage,
        ],
        sports: [
            { name: 'Cricket', icon: cricketIcon },
            { name: 'Football', icon: footballIcon },
            { name: 'Pickle Ball', icon: pickleballIcon }
        ],
        amenities: ['Parking', 'Restroom', 'Changing Room', 'First Aid'],
        latitude: apiData?.latitude || 0,
        longitude: apiData?.longitude || 0,
    };
};


// const venue = {
//     name: 'Pushpa Sports Arena',
//     location: 'Bibwewadi',
//     rating: 4,
//     reviews: 6,
//     timing: '6AM - 12AM',
//     price: 1100,
//     address:
//         'PSA Ground Next To Shreeji Lawns Ganga Dham Road Bibwewadi Pune 411037',
//     images: [
//         venueImage,
//         venueImage,
//         venueImage,
//         venueImage,
//     ],
//     sports: [
//         { name: 'Cricket', icon: cricketIcon },
//         { name: 'Football', icon: footballIcon },
//         { name: 'Pickle Ball', icon: pickleballIcon },
//     ],
//     amenities: ['Parking', 'Restroom', 'Changing Room', 'First Aid'],
// };

function VenueDetailsPage() {

    const { id } = useParams();

    const { data, loading, error } = useFetchSingleVenue(id);


    // const venue = { ... }
    const venue = Array.isArray(data?.result) && data.result.length > 0
        ? mapVenueData(data.result[0])
        : {
            name: 'Loading Venue...',
            location: '',
            rating: 0,
            reviews: 0,
            timing: '',
            price: 0,
            address: '',
            images: [venueImage],
            sports: [],
            amenities: []
        };





    // Replace with actual data fetching logic

    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [slideInterval, setSlideInterval] = useState(null);

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



    const handleSportClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [start, setStart] = useState(0);

    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, reviews.length - visibleCount)
        );

    const visibleCount = useMemo(() => {
        return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    }, []);






    if (loading) return <div>Loading venue details...</div>;
    if (error) return <div>Error loading venue details</div>;
    if (!venue || Object.keys(venue).length === 0) {
        return <div>No venue data available</div>;
    }


    return (
        <>

            <div className='venue-main-header'>
                <div className="breadcrumb">
                    <span>Venues &gt; {venue.location} &gt; {venue.name}</span>
                </div>

                <h1 className="venue-name">{venue.name}</h1>
                <div className="location-rating">
                    <span>{venue.location}</span>
                    <span>⭐ {venue.rating} ({venue.totalRatings} ratings)</span>
                </div>
            </div>
            {/* <div className="venue-detail">

                <img className="venue-banner" src={venue.image} alt={venue.name} />

                <div className="venue-content">
                    <div className="info-box">
                        <div className="info">
                            <p><strong>Timing:</strong> {venue.time}</p>
                            <p><strong>Price:</strong> ₹{venue.price} onwards</p>
                        </div>

                        <div className="location-box">
                            <p>{venue.address}</p>
                            <div className="map-placeholder">[ Google Map Here ]</div>
                        </div>

                        <div className="buttons">
                            <button className="btn-secondary">Corporate Booking</button>
                            <button className="btn-primary">Check Availability</button>
                        </div>
                    </div>

                    <div className="sports-box">
                        <h3>Sports Available</h3>
                        <div className="sports-list">
                            {venue.sports.map((sport, idx) => (
                                <div className="sport-tag" key={idx}>{sport}</div>
                            ))}
                        </div>

                        <h4>Amenities</h4>
                        <div className="amenities-list">
                            {venue.amenities.map((item, idx) => (
                                <span key={idx} className="amenity">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="venue-details-container">
                <div className="venue-wrapper">
                    <div className="venue-left">
                        <div className="carousel">
                            <img src={venue.images[imageIndex]} alt="venue" className="carousel-img" onError={(e) => (e.target.src = venueImage)} />
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
                            {/* <h4>Sports Available</h4>
                            <div className="tags">
                                {venue.sports.map((sport) => (
                                    <span className="tag" key={sport}>{sport}</span>
                                ))}
                            </div> */}
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
                                            onClick={handleSportClick}
                                        >
                                            <img src={sport.icon} alt={sport.name} />
                                            <p>{sport.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* PriceChart Model */}
                            {isModalOpen && (
                                <div className="modal-overlay" onClick={closeModal}>
                                    <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                                        <PriceChart onClose={closeModal} />

                                    </div>
                                </div>
                            )}
                        </div>


                    </div>
                    <div className="venue-right">

                        <div className="venue-actions">
                            <button className="venue-action-btn"><img src={ShareIcon} alt='share' className="venue-icon" style={{ marginLeft: "50px" }} />Share</button>
                            <button className="venue-action-btn"><img src={LikeIcon} alt='like' className="venue-icon" /> Add To favourite</button>
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
                            <button className="btn-secondary">Corporate Booking</button>
                            <button className="btn-primary">Check Availability</button>
                        </div>


                    </div>

                    <div className="amenities-wrappers">
                        <div className="amenities-box">
                            <p className="section-title">Amenities</p>
                            <div className="amenity-tags">
                                {venue.amenities.map((item) => (
                                    <span className="amenity-tag" key={item}>
                                        <span className="check-icon">
                                            <img src={checkitIcon} alt="check" />
                                        </span>
                                        <span className="check-label">{item}</span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="rules-box">
                            <p className="section-title">Rules and regulations</p>
                            <span className="arrow">&gt;</span>
                        </div>

                    </div>

                    <div className='rating-wrapper'>
                        <div className="ratings-carousel">
                            <h2 className="heading">Ratings & Reviews</h2>
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

                    <div className='banner-wrapper'>
                        <div className='banner'>
                            <h2 className='banner-heading'>Ongoing Events</h2>
                            <div className="image-banner-wrapper">
                                {banners.map((img, index) => (
                                    <div key={index} className="image-banner">
                                        <img src={img} alt="Event" />
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