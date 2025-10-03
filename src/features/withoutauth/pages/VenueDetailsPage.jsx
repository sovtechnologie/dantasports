import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "../Stylesheets/VenueDetail.css";
import venueImage from "../assets/Venue-image.png";
import ReviewCard from "../components/ReviewCard.jsx";
import ShareIcon from "../assets/VenueDetailIcon/shareIcon.png";
import LikeIcon from "../assets/VenueDetailIcon/LikeIcon.png";
import PriceChart from "../components/PriceChart.jsx";
import { useFetchSingleVenue } from "../../../hooks/VenueList/useFetchSingleVenue.js";
import { usePaymentDetails } from "../../../hooks/Payments/usePaymentDetails.js";
import { useCreatePayment } from "../../../hooks/Payments/useCreatePayment.js";
import { formatTime } from "../../../utils/formatTime.js";
import CustomMap from "../components/CustomMap.jsx";
import { useBanner } from "../../../hooks/useBanner.js";
import { Share } from "../../../utils/share.js";
import HeartFilled from "../assets/VenueCardLogo/heartfilled.png";
import { useSelector } from "react-redux";
import { useLikeVenue } from "../../../hooks/favouriteVenue/useLikeVenue.js";
import { useUnlikeVenue } from "../../../hooks/favouriteVenue/useUnlikeVenue.js";
import { useQueryClient } from "@tanstack/react-query";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Calendar from "../components/Calendar.jsx";
import TimeSelector from "../components/TimeSelector.jsx";
import { useSportDetails } from "../../../hooks/favouriteSport/useSportDetails.js";
import CheckoutPricing from "../components/CheckoutPricing.jsx";
import Spinner from "../../../components/Spinner.jsx";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement.js";
import checkoutIcon from "../assets/checkOutIcon.png";


export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const mapVenueData = (apiData) => {
  return {
    name: apiData?.venue_name || "Unknown Venue",
    location: apiData?.area || "Unknown Area",
    about: apiData?.about_venue || "No description available for this venue.",
    rating: parseFloat(apiData?.average_rating) || 0,
    reviewcount: apiData?.review_count || 0,
    timing: `${formatTime(apiData?.start_time || "06:00:00")} - ${formatTime(apiData?.end_time || "22:00:00")}`,
    price: parseFloat(apiData?.pricing) || 0,
    address:
      `${apiData?.full_address || ""}, ${apiData?.area || ""}, ${apiData?.city || ""}, ${apiData?.state || ""} - ${apiData?.pincode || ""}`
        .trim()
        .replace(/^,|,$/g, "") || "Not Available",
    images: Array.isArray(apiData?.venue_gallery)
      ? apiData.venue_gallery.map((img) => img.venue_image)
      : [venueImage, venueImage, venueImage, venueImage],
    sports: Array.isArray(apiData?.sports)
      ? apiData.sports.map((sport) => ({
        sportId: sport.id,
        name: sport.name,
        icon: sport.image,
      }))
      : [],
    amenities: Array.isArray(apiData?.amenities)
      ? apiData.amenities.map((a) => a.name)
      : ["Not Available"],
    latitude: apiData?.latitude || 0,
    rules: apiData?.rules_and_regulations,
    booking_policy: apiData?.booking_policy,
    longitude: apiData?.longitude || 0,
    favourite: apiData?.favourite,
    favourite_venue_id: apiData?.favourite_venue_id,
    reviews: Array.isArray(apiData?.reviews)
      ? apiData.reviews.map((review) => ({
        id: review.id,
        userName: review.user_name || "Anonymous",
        rating: review.rating || 0,
        comment: review.comment || "No comment provided",
        date:
          formatDate(review.createdAt) ||
          new Date().toISOString().split("T")[0],
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
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedPitch, setSelectedPitch] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [bookingId, setBookingId] = useState(null);
  const [errors, setErrors] = useState({
    sport: "",
    date: "",
    time: "",
    court: "",
  });
  const pageNo = 3; // Pass dynamic page number as needed
  const { data, loading, error } = useFetchSingleVenue(id, userId);
  const venue =
    Array.isArray(data?.result) && data.result.length > 0
      ? mapVenueData(data.result[0])
      : {
        name: "Loading Venue...",
        location: "",
        rating: 0,
        reviewcount: 0,
        timing: "",
        price: 0,
        address: "",
        images: [venueImage],
        sports: [],
        amenities: [],
        reviews: [],
      };



  const {
    data: sportDetails,
    isLoading: sportDetailsLoading,
    error: sportDetailsError,
  } = useSportDetails({ venueId: id, sportId: selectedSport });
  if (sportDetails && sportDetails.result) {
    console.log("Sport Details:", sportDetails.result[0]);
  }

  const sportDetailsData = sportDetails?.result ? sportDetails.result[0] : null;

  const {
    data: bannerData,
    isLoading: Bannerloading,
    error: BannerError,
  } = useBanner(pageNo);

  const banners = bannerData?.result || [];

  const handleSportClick = (sportId) => {
    setSelectedSportId(sportId);
  };

  // get payment price detail
  const {
    data: BookingPriceDetails,
    error: BookingPriceError,
    isLoading: BookingPriceLoading,
  } = usePaymentDetails(bookingId);
  const response = BookingPriceDetails?.result?.[0];
  let convenienceFee = 0;


  const handleClickLike = (venue) => {
    if (!venue.favourite) {
      likeVenue.mutate(
        { venueId:id, userId },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries([
              "fetchSingleVenue",
              id,
              userId,
            ]);
          },
          onError: () => {
            console.error("Failed to like the button");
          },
        }
      );
    } else {
      unlikeVenue.mutate(
        { favouriteVenueId: venue.favourite_venue_id },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries([
              "fetchSingleVenue",
              id,
              userId,
            ]);
          },
          onError: () => {
            console.error("Failed to unlike the button ");
          },
        }
      );
    }
  };

  const [start, setStart] = useState(0);
  const prev = () => setStart((prev) => Math.max(prev - 1, 0));
  const next = () =>
    setStart((prev) =>
      Math.min(prev + 1, venue?.reviews?.length + 1 - visibleCount)
    );

  const visibleCount = useMemo(() => {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  }, []);

  useEffect(() => {
    setTotalPrice(response?.total_price);
    convenienceFee = response?.convenience_fee;
  }, [response]);

  // create payments
  // const {
  //     mutate: createPayment,
  //     data: paymentResponse,
  //     isLoading: paymentLoading,
  //     isError: paymentError
  // } = useCreatePayment();

  const { mutate: CreateBookingPayment, isLoading: paymentLoading } =
    useCreateBookingPayment();

  //    Payement Processs function
  const handleProceedClick = () => {
    const newErrors = { sport: "", date: "", time: "", court: "" };
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
      } else if (!courts.some((c) => c.id === selectedPitch)) {
        newErrors.court = "Please select a valid court.";
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      // Clear error after 3 seconds
      setTimeout(() => {
        setErrors({ sport: "", date: "", time: "", court: "" });
      }, 3000);
      return;
    }

    // ✅ All validations passed
    if (!bookingId) return;
    CreateBookingPayment(
      { bookingId, amount: finalAmount, type: 1 },
      {
        onSuccess: () => {
          setSelectedSport("");
          setSelectedDuration(0);
          setSelectedTime(null);
          setSelectedPitch("");
          setFinalAmount(null);
          setTotalPrice(0);
        },
      }
    );
  };

  if (loading) return <div>Loading venue details...</div>;
  if (error) return <div>Error loading venue details</div>;
  if (!venue || Object.keys(venue).length === 0) {
    return <div>No venue data available</div>;
  }
  if (Bannerloading) return <div>Loading banners...</div>;
  if (BannerError) return <div>Error loading banners</div>;

  return (
    <>
      <div className="venue-main-header">
        <div className="breadcrumb">
          <span>
            Venues &gt; {venue.location} &gt; {venue.name}
          </span>
        </div>

        <h1 className="venue-name">{venue.name}</h1>
        <div className="location-rating">
          <span>{venue.location}</span>
          <span
            className="star"
            style={{ marginLeft: "20px", marginRight: "5px" }}
          >
            ★
          </span>
          <span className="light-text">
            {venue.rating} ({venue.reviewcount} ratings)
          </span>
        </div>
        <div className="venue-icon-topwrapper">
          <button className="venue-icon-btns" onClick={Share}>
            <img src={ShareIcon} alt="share" className="" />
          </button>
          <button
            className="venue-icon-btns"
            onClick={() => handleClickLike(venue)}
          >
            <img
              src={venue.favourite ? HeartFilled : LikeIcon}
              alt="like"
              className="like-icon"
            />
          </button>
        </div>
      </div>

      <div className="venue-details-container">
        <div className="venue-wrapper">
          <div className="venue-left">
            <div className="carousel">
              <Swiper
                slidesPerView={1} /*add for fix ui*/
                spaceBetween={0}
                // spaceBetween={30}
                centeredSlides={false}
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

                    <img
                      src={img}
                      alt={`event-image-${index}`}
                      className="venue-swiperslide-img"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="section">
              <div className="sports-wrapper">
                <div className="sports-header">About</div>
                <div className="event-description">{venue.about}</div>
              </div>
            </div>
            <div className="section">
              <div className="sports-wrapper">
                <div className="sports-header">Amenities</div>
                <div className="amenities-tags">
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

            <div className="section">
              <div className="sports-wrapper">
                <div className="sports-header">
                  Sports Available
                  <span className="note">
                    (Click on sports to view price chart)
                  </span>
                </div>
                <div className="sports-grid">
                  {venue?.sports?.map((sport) => (
                    <button
                      className="sport-card"
                      key={sport.name}
                      type="button"
                      onClick={() => handleSportClick(sport?.sportId)}
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
                sportId={selectedSportId || venue?.sports[0]?.sportId}
              />
            </div>
          </div>

          <div className="venue-right">
            <div className="venue-location">
              <div className="sports-header">Location:</div>

              <div className="gym-right-section-p">
                <p>{venue.address}</p>
              </div>
              <div className="venue-map">
                <CustomMap
                  latitude={venue.latitude}
                  longitude={venue.longitude}
                />
              </div>
            </div>
            {/* Calendar */}

            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />

            {/* Sports Selector */}
            <div className="vb-section">
              <label>Select Sports:</label>
              <div className="vb-sport-options">
                {venue.sports.map((sport) => (
                  <button
                    key={sport.sportId}
                    className={`vb-sport-btn ${selectedSport === sport.sportId ? "active" : ""}`}
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
              venueId={id}
              selectedPitch={selectedPitch}
              setSelectedPitch={setSelectedPitch}
              courtError={errors}
              bookingId={bookingId}
              setBookingId={setBookingId}
            />

            <div className="venue-right-section">
              <div className="venue-heading">Price details</div>
              {BookingPriceLoading ? (
                <div className="price-loader">
                  <Spinner size={38} color="#1163c7" />
                </div>
              ) : (
                <CheckoutPricing
                  totalPrice={totalPrice || 0}
                  convenienceFee={convenienceFee}
                  count={1}
                  type={1}
                  setFinalAmount={setFinalAmount}
                  venueId={id}
                />
              )}
            </div>

            <button className="vb-proceed-btn" onClick={handleProceedClick}>
              {paymentLoading ? "Processing..." : "PROCEED"}
            </button>
          </div>

          {venue?.reviews?.length > 0 && (
            <div className="rating-wrapper">
              <div className="ratings-carousel">
                <h2 className="review-heading">Ratings & Reviews</h2>
                <div className="review-carousel-container">
                  {venue.reviews
                    .slice(start, start + visibleCount)
                    .map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
                {/* <div className="carousel-buttons">
                                    <button onClick={prev}><img src={leftArrow} alt='left arrow' /></button>
                                    <button onClick={next}><img src={rightArrow} alt='right-arrow' /></button>
                                </div> */}
              </div>
            </div>
          )}

          <div className="banner-wrapper">
            <div className="event-banner-container">
              <h2 className="event-banner-heading">Ongoing Events</h2>
              <div className="event-banner-carousel">
                <div className="event-banner-track">
                  {banners.concat(banners).map(
                    (
                      item,
                      i // Duplicate for seamless looping
                    ) => (
                      <div key={i} className="event-banner">
                        <img
                          src={item.banner_image}
                          alt="Event"
                          className="event-banner-img"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VenueDetailsPage;
