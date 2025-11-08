import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Stylesheets/VenueDetail.css";
import venueImage from "../assets/Venue-image.png";
import ReviewCard from "../components/ReviewCard.jsx";
import ShareIcon from "../assets/VenueDetailIcon/share.svg";
import LikeIcon from "../assets/VenueDetailIcon/linke.svg";
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
import { Container } from "react-bootstrap";
import RulesRegulations from "../components/RulesRegulations.jsx";
import arrow from "../assets/icons/arrow.svg";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import PriceDetails from "../components/PriceDetails.jsx";
import OngoingEvents from "../components/OngoingEvents.jsx";

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
        image: review.image,
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
  } = useSportDetails(selectedSport, id);
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

  useEffect(() => {
    // setBookingId(null);
    setTotalPrice(0);
    setFinalAmount(0);
  }, [selectedDate, selectedSport, selectedTime]);

  const handleSportClick = (sportId) => {
    setSelectedSportId(sportId);
  };

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
        { id, userId },
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


      <section style={{ background: "#F1F3F2" }} className="pb-lg-5 pb-3">
        <section className="details_page_header">
          <div className="container">
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
                  {Math.floor(venue.rating)}  ({venue.reviewcount} ratings)
                </span>
                <span className="ps-2 text_blue"><a href="#">Rate Turf</a></span>
              </div>
            </div>
          </div>
        </section>
        <Container>
          <div className="venue-details-container">
            <div className="row g-3">
              <div className="venue-left col-lg-8">
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
                    // arrow={{
                    //   dots:false,
                    // }}
                    // navigation={true}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                  >
                    <div className="venue-icon-topwrapper">
                          <button className="venue-icon-btns" onClick={Share}>
                            <img src={ShareIcon} alt="share" className="" />
                          </button>
                          <button
                            className="venue-icon-btns"
                          // onClick={() => handleClickLike(venue)}
                          >
                            <img
                              src={venue.favourite ? HeartFilled : LikeIcon}
                              alt="like"
                              className="like-icon"
                              onClick={() => handleClickLike(venue)}
                            />
                          </button>
                        </div>
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
                    <div className="sports-header">
                      <h2>About Venue</h2>
                    </div>
                    <div className="event-description">{venue.about}</div>
                  </div>
                </div>
                <div className="section">
                  <div className="sports-wrapper">
                    <div className="sports-header">
                      <h2>Amenities</h2>
                    </div>
                    <div className="amenities-tags">
                      {venue.amenities.map((item) => (
                        <span className="amenities-tag" key={item}>
                          <img
                            src={checkoutIcon}
                            alt="check"
                            className="amt-img"
                          />
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
                    {/* <div className="sports-grid satish">
                      {venue?.sports?.map((sport) => (
                        <button
                          className={`sport-card ${selectedSportId === sport.sportId ? "selected-sport" : ""}`}
                          key={sport.name}
                          type="button"
                          onClick={() => handleSportClick(sport?.sportId)}
                        >
                          <img src={sport.icon} alt={sport.name} />
                          <p>{sport.name}</p>
                        </button>
                      ))}
                    </div> */}

                    <div className="sports-grid satish">
                      {venue?.sports?.map((sport) => (
                        <button
                          className={`sport-card ${selectedSportId === sport.sportId ? "selected-sport" : ""}`}
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

                  {selectedSportId && (
                    <PriceChart
                      venueId={id}
                      sportId={selectedSportId}
                    />
                  )}

                </div>
                <div class="row g-3 mt-3">
                  <div className="col-12 col-lg-6">
                    <div className="card modal_title">
                      {/* <!-- Button trigger modal --> */}
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div className="rule">
                          <p className="m-0">Rules and regulations</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="border-0 bg-white"
                            data-bs-toggle="modal"
                            data-bs-target="#RulesRegulations"
                          >
                            <img src={arrow} alt="" />
                          </button>
                        </div>
                      </div>

                      {/* <!-- Modal --> */}
                      <div
                        class="modal fade"
                        id="RulesRegulations"
                        tabindex="-1"
                        aria-labelledby="RulesRegulations"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                          <div class="modal-content custom_modal">
                            <div class="modal-header border-0">
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <RulesRegulations content={venue.rules} />{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card modal_title">
                      {/* <!-- Button trigger modal --> */}
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div className="rule">
                          <p className="m-0">Cancellation Policy</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="border-0 bg-white"
                            data-bs-toggle="modal"
                            data-bs-target="#CancellationPolicy"
                          >
                            <img src={arrow} alt="" />
                          </button>
                        </div>
                      </div>

                      {/* <!-- Modal --> */}
                      <div
                        class="modal fade"
                        id="CancellationPolicy"
                        tabindex="-1"
                        aria-labelledby="CancellationPolicy"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                          <div class="modal-content custom_modal">
                            <div class="modal-header border-0">
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <CancellationPolicy
                                policyText={venue.booking_policy}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="venue-right col-lg-4">
                <div className="venue-location">
                  <h3 className="details_page_titles">Location:</h3>

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
                  {/* <label>Select Sports:</label> */}
                  <h3 className="details_page_titles">Select Sports:</h3>
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

                <div className="venue-right-section mt-3 mb-3">
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
                      venueId={id}
                      setFinalAmount={setFinalAmount}
                    />
                  )}
                </div>
                {/* <PriceDetails/> */}

                <button className="vb-proceed-btn" onClick={handleProceedClick}>
                  {paymentLoading ? "Processing..." : "PROCEED"}
                </button>
              </div>

              {venue?.reviews?.length > 0 && (
                <div className="rating-wrapper">
                  <EventReviewSlider event={{ review: venue?.reviews }} />
                </div>
              )}

              <div className="banner-wrapper">
                <OngoingEvents banners={banners} />
                {/* <div className="event-banner-container">
                   
                  {/* <h2 className="event-banner-heading">Ongoing Events</h2> */}
                {/* <div className="event-banner-carousel">
              {/* <div className="banner-wrapper">
                <div className="event-banner-container">
                  <h2 className="event-banner-heading">Ongoing Events</h2>
                  <div className="event-banner-carousel">
                    <div className="event-banner-track">
                      {banners.concat(banners).map(
                        (
                          item,
                          i 
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
                  </div> */}
                {/* </div>  */}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default VenueDetailsPage;
