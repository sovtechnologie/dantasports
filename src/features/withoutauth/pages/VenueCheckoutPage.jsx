import React, { useState } from 'react';
import "../Stylesheets/VenueCheckoutPage.css";
import { useParams } from 'react-router-dom';
import venueImage from "../assets/Venue-image.png";
import cricketIcon from "../assets/VenueDetailIcon/CricketIcon.png";
import footballIcon from "../assets/VenueDetailIcon/Footballicon.png";
import pickleballIcon from "../assets/VenueDetailIcon/BatmintonIcon.png";
import reviews from "../StaticData/ReviewRatingData.js";
import ReviewCard from '../components/ReviewCard.jsx';
import Banner from '../assets/venue-banner.png';
import Calendar from '../components/Calendar.jsx';
import TimeSelector from '../components/TimeSelector.jsx';
import ConfirmSlotCard from "../components/ConfirmSlotCard.jsx";
import BookingPopupCard from '../components/BookingPopupCard.jsx';
import BookingData from "../StaticData/BookingData.js";

const banners = [Banner, Banner, Banner];
const Events = [Banner, Banner]

const venue = {
    name: 'Pushpa Sports Arena',
    location: 'Bibwewadi',
    rating: 4,
    reviews: 6,
    timing: '6AM - 12AM',
    price: 1100,
    address:
        'PSA Ground Next To Shreeji Lawns Ganga Dham Road Bibwewadi Pune 411037',
    images: [
        venueImage,
        venueImage,
        venueImage,
        venueImage,
    ],
    sports: [
        { name: 'Cricket', icon: cricketIcon },
        { name: 'Football', icon: footballIcon },
        { name: 'Pickle Ball', icon: pickleballIcon },
    ],
    amenities: ['Parking', 'Restroom', 'Changing Room', 'First Aid'],
};

function VenueCheckoutPage() {
    const { id } = useParams();
    const [imageIndex, setImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);


    const handleProceedClick = () => {
        setIsModalOpen(true);
    };

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


    const [start, setStart] = useState(0);

    const prev = () => setStart((prev) => Math.max(prev - 1, 0));
    const next = () =>
        setStart((prev) =>
            Math.min(prev + 1, reviews.length - visibleCount)
        );

    const visibleCount = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;


    const [selectedSport, setSelectedSport] = useState('Football');

    const [selectedPitch, setSelectedPitch] = useState('10 x 10');



    return (
        <>

            <div className='venue-main-header'>
                <div className="breadcrumb">
                    <span>Venues &gt; Dhankawadi &gt; {venue.name}</span>
                </div>

                <h1 className="venue-name">{venue.name}</h1>
                <div className="location-rating">
                    <span>{venue.location}</span>
                    <span>⭐ {venue.rating} ({venue.totalRatings} ratings)</span>
                </div>
            </div>

            <div className="venue-details-container">
                <div className="venue-wrapper">
                    <div className="venue-left">
                        <div className="carousel">
                            <img src={venue.images[imageIndex]} alt="venue" className="carousel-img" />
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
                                        >
                                            <img src={sport.icon} alt={sport.name} />
                                            <p>{sport.name}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>


                        </div>


                    </div>
                    <div className="venue-right">

                        {/* Calendar */}
                       
                        <Calendar />

                        {/* Sports Selector */}
                        <div className="vb-section">
                            <label>Select Sports:</label>
                            <div className="vb-sport-options">
                                {['Football', 'Cricket'].map((sport) => (
                                    <button
                                        key={sport}
                                        className={`vb-sport-btn ${selectedSport === sport ? 'active' : ''}`}
                                        onClick={() => setSelectedSport(sport)}
                                    >
                                        {sport}
                                    </button>
                                ))}
                            </div>
                        </div>

                     

                        <TimeSelector />

                        {/* Pitch Selection */}
                        <div className="vb-section vb-pitch-options">
                            <label>Pitch:</label>
                            {['5 x 5', '7 x 7', '10 x 10'].map((pitch) => (
                                <button
                                    key={pitch}
                                    className={`vb-pitch-btn ${selectedPitch === pitch ? 'active' : ''}`}
                                    onClick={() => setSelectedPitch(pitch)}
                                >
                                    {pitch}
                                </button>
                            ))}
                        </div>

                        <button className="vb-proceed-btn" onClick={handleProceedClick}>PROCEED</button>

                        {isModalOpen && (
                            <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                                <div className="modal-content" onClick={(e) => e.stopPropagation()} >
                                    <ConfirmSlotCard
                                        duration="60 Min"
                                        shift="Morning"
                                        time="08:00 A.M – 09:00 A.M"
                                        date="Wed, 23rd May"
                                        pitch="5x5, Football"
                                        onClose={() => setIsModalOpen(false)}
                                        onProceed={() => {
                                            alert("Slot Confirmed!");
                                            setShowPopup(true)
                                            setIsModalOpen(false);

                                        }}
                                    />
                                </div>
                            </div>
                        )}
                        <BookingPopupCard
                            show={showPopup}
                            onClose={() => setShowPopup(false)}
                            bookingData={BookingData}
                            events={Events}
                        />
                       
                    </div>

                    <div className="amenities-wrapper">
                        <div className="amenities-box">
                            <p className="section-title">Amenities</p>
                            <div className="amenity-tags">
                                {venue.amenities.map((item) => (
                                    <span className="amenity-tag" key={item}>
                                        <span className="dots" /> {item}
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

export default VenueCheckoutPage




//    /* Duration & Time */
//                         /* <div className="vb-section vb-duration-time">
//                             <div className="vb-duration">
//                                 <label>Duration:</label>
//                                 <div className="vb-duration-box">0hr</div>
//                             </div>
//                             <div className="vb-time">
//                                 <label>Time:</label>
//                                 <div className="vb-time-box">{selectedTime}</div>
//                             </div>
//                         </div> */

//                         /* Time Slots */
//                         /* <div className="vb-section">
//                             <div className="vb-time-periods">
//                                 {['Morning', 'Afternoon', 'Evening'].map((period, idx) => (
//                                     <button
//                                         key={period}
//                                         className={`vb-period-btn ${idx === 0 ? 'active' : ''}`}
//                                     >
//                                         {period}
//                                     </button>
//                                 ))}
//                             </div>
//                             <div className="vb-time-slots">
//                                 {['11:30 AM', '12:30 PM', '1:30 PM', '2:30 PM'].map((time) => (
//                                     <button
//                                         key={time}
//                                         className={`vb-slot-btn ${selectedTime === time ? 'active' : ''}`}
//                                         onClick={() => setSelectedTime(time)}
//                                     >
//                                         {time}
//                                     </button>
//                                 ))}
//                             </div>
//                             <div className="vb-availability-bar">
//                                 <div className="green"></div>
//                                 <div className="green"></div>
//                                 <div className="red"></div>
//                                 <div className="green"></div>
//                             </div>
//                         </div> */
//                          /* <div className="vb-calendar">
//                             <button>&lt;</button>
//                             <span>September</span>
//                             <button>&gt;</button>
//                         </div>
//                         <div className="vb-dates">
//                             {dates.map((date) => (
//                                 <div
//                                     key={date}
//                                     className={`vb-date-item ${selectedDate === date ? 'active' : ''}`}
//                                     onClick={() => setSelectedDate(date)}
//                                 >
//                                     {date}
//                                 </div>
//                             ))}
//                         </div> */