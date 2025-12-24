import "../Stylesheets/GymDetailPage.css";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import GymImage from "../assets/mygym.svg";
import GymImage1 from "../assets/GymImage.svg";
import checkoutIcon from "../assets/checkOutIcon.png";
import CoachImage from "../assets/CoachesImage.svg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect, useMemo, useState } from "react";
import CustomMap from "../components/CustomMap";
import CheckoutPricing from "../components/CheckoutPricing";
import ReviewCard from "../components/ReviewCard";
import { useParams } from "react-router-dom";
import { useFetchGymDetail } from "../../../hooks/GymList/useFetchGymDetails";
import { useBookGym } from "../../../hooks/GymList/useBookGym";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchGymPrice } from "../../../hooks/GymList/useFetchGymPrice";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import { useCreateVenueBooking } from "../../../hooks/BookingVenue/useCreateVenueBooking";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";
import { Container } from "react-bootstrap";
import arrow from "../assets/icons/arrow.svg";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import TermsAndConditions from "../../../pages/TermsAndConditions.jsx";
import TermsConditionsModal from "../components/TermsConditionsModal.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import BusinessHours from "../components/BusinessHours.jsx";
import addCircle from "../../../assets/VenueImage/AddCircle.jpg";
import minusCircle from "../../../assets/VenueImage/MinusCircle.png";
import OngoingEvents from "../components/OngoingEvents.jsx";

import shareIcon from "../assets/VenueDetailIcon/share.svg";
import LikeIcon from "../assets/VenueDetailIcon/linke.svg";

const timings = [
  { label: "Morning (Mon – Sat)", range: "06:00 AM – 12:00 PM" },
  { label: "Evening (Mon – Sat)", range: "04:00 PM – 10:00 PM" },
  { label: "Sunday Close", range: "" },
];

const imagelist = [GymImage, GymImage1];

const mapGymData = (apiData) => {
  return {
    name: apiData?.gym_name || "Unknown Venue",
    location: apiData?.area || "Unknown Area",
    about: apiData?.about_gym || "No description available for this venue.",
    rating: parseFloat(apiData?.average_rating) || 0,
    reviewcount: apiData?.review_count || 0,
    address:
      `${apiData?.full_address || ""}`.trim().replace(/^,|,$/g, "") ||
      "Not Available",
    gym_timings: Array.isArray(apiData?.gym_timings)
      ? apiData?.gym_timings
      : [],
    coaches: Array.isArray(apiData?.gym_coaches) ? apiData?.gym_coaches : null,

    images: Array.isArray(apiData?.event_gallery)
      ? apiData.event_gallery.map((img) => img.image_url)
      : [GymImage, GymImage, GymImage, GymImage],
    latitude: apiData?.lat || 0,
    longitude: apiData?.lng || 0,
    amenities: Array.isArray(apiData?.amenities)
      ? apiData?.amenities?.map((a) => a.name)
      : ["Not Available"],
    favourite: apiData?.favourite,
    favourite_venue_id: apiData?.favourite_venue_id,
    termsAndCondition: apiData?.term_and_conditions,
    cancelPolicy: apiData?.cancellation_policy,
    reviews: Array.isArray(apiData?.reviews)
      ? apiData.reviews.map((review) => ({
        id: review.id,
        image: review.image,
        userName: review.user_name || "Anonymous",
        rating: review.rating || 0,
        comment: review.comment || "No comment provided",
      }))
      : [{ comment: "Not Available" }],
  };
};

export default function GymDetailPage() {
  const { id } = useParams();
  const isLoggedIn = Boolean(Cookies.get("token"));
  const [expandedSection, setExpandedSection] = useState(null);
  const [price, setPrice] = useState(0);
  const [couponInfo, setCouponInfo] = useState({
    couponId: null,
    discountAmount: 0,
  });
  const [start, setStart] = useState(0);
  const [selectedPass, setSelectedPass] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [passess, setPassess] = useState([{ passId: null, quantity: null }]);
  const [finalAmount, setFinalAmount] = useState(null);
  console.log("finalAmountfinalAmountfinalAmountfinalAmountfinalAmount", finalAmount);
  const [bookingDataValues, setBookingDataValues] = useState();

  const { data: GymDetails, isLoading: GymDetailsLoading } =
    useFetchGymDetail(id);
  const gym =
    Array.isArray(GymDetails?.result) && GymDetails?.result.length > 0
      ? mapGymData(GymDetails?.result[0])
      : "";

  console.log("Gym Details", gym);

  const toggleSection = (sectionName) => {
    setExpandedSection((prev) => (prev === sectionName ? null : sectionName));
  };

  // const handleSelect = (e) => setSelectedPass(e.target.value);
  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    const selectedItem = GymPrice[0]?.gym_price_slot?.find(
      (item) => item.passes_name === selectedValue
    );
    if (selectedItem) {
      setSelectedPass({
        name: selectedItem.passes_name,
        price: selectedItem.price,
      });
      setQuantity(0);
      // also update passess with passId and quantity
      setPassess({
        passId: selectedItem.id, // assuming `id` exists in the object
        quantity: 0,
      });
    }
  };

  const decrement = () =>
    setQuantity((q) => {
      const newQty = Math.max(0, q - 1);
      setPassess((prev) => ({ ...prev, quantity: newQty }));
      return newQty;
    });

  const increment = () =>
    setQuantity((q) => {
      const newQty = q + 1;
      setPassess((prev) => ({ ...prev, quantity: newQty }));
      return newQty;
    });

  const totalAmount = selectedPass ? selectedPass.price * quantity : 0;

  useEffect(() => {
    setPrice(totalAmount);
  }, [totalAmount]);

  const prev = () => setStart((prev) => Math.max(prev - 1, 0));
  const next = () =>
    setStart((prev) => Math.min(prev + 1, gym?.reviews?.length - visibleCount));

  const visibleCount = useMemo(() => {
    return window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 3 : 3;
  }, []);

  const {
    data: gymPrice,
    isLoading: gymPriceLoading,
    error: gymPriceError,
  } = useFetchGymPrice(id);
  const GymPrice = gymPrice?.result || [];
  const ConvenienceFee = GymPrice[0]?.convension_fees;

  const {
    data: bannerData,
    isLoading: Bannerloading,
    error: BannerError,
  } = useBanner(3);

  const banners = bannerData?.result || [];

  const type = 3;
  const { mutate: CreateBookingPayment, isLoading: paymentLoading } =
    useCreateBookingPayment();
  const {
    mutate: BookGym,
    isLoading: bookingLoading,
    error: bookingError,
  } = useBookGym();

  const handleProceed = () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed.");
      return;
    }
    const bookingPayload = {
      isInsuranceSelected: true,
      gymId: id,
      passess: [passess],
    };

    BookGym(bookingPayload, {
      onSuccess: (data) => {
        const bookingId = data?.result;

        // Call createPayment with that bookingId
        CreateBookingPayment(
          {

            bookingId,
            amount: finalAmount,
            type: type,
            couponId: couponInfo?.couponId || null,
            discountAmount: couponInfo?.discountAmount || 0,
            convenienceFees: convenienceFee
          },
          {
            onSuccess: (paymentData) => {
              // If API returns paymentUrl, redirect
              if (paymentData?.result) {
                window.open(
                  paymentData.result,
                  "_blank",
                  "noopener,noreferrer"
                );

                // reset the fields
                setPassess([]);
                setSelectedPass(null);
                setQuantity(0);
                setFinalAmount(0);
                setPrice(0)
              }
            },
            onError: (error) => {
              alert("Payment creation failed: " + (error.message || ""));
            },
          }
        );
      },
      onError: (error) => alert("Booking failed. " + (error.message || "")),
    });
  };

  const dayOrder = [
    "friday",
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    // "thursday",
    "thusday"
  ];

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };


  const mappedTimings = dayOrder.map((dayKey) => {
    const dayName = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);

    // collect all slots for this day
    const ranges = (gym?.gym_timings || [])
      .filter(item => item[dayKey] === 1)
      .map(item =>
        `${formatTime(item.start_time.split(".")[0])} - ${formatTime(
          item.end_time.split(".")[0]
        )}`
      );

    return {
      day: dayName,
      range: ranges.length > 0 ? ranges.join(", ") : "Closed",
    };
  });



  // const half = Math.ceil(mappedTimings.length / 2);
  // const firstCol = mappedTimings.slice(0, half);
  // const secondCol = mappedTimings.slice(half);

  console.log("mappedTimingsmappedTimingsmappedTimings", mappedTimings);

  useEffect(() => {
    if (!price || price === 0) {
      setFinalAmount(0);
      setTotalPrice(0);
      return;
    }

    const basePrice = Number(totalAmount);


    const conveniencePercent = Number(GymPrice?.[0]?.convenience_fees);
    const gstPercent = Number(GymPrice?.[0]?.gst);
    const upto = Number(GymPrice[0]?.upto ?? 0);

    const base_fare_amount = (basePrice * conveniencePercent) / 100;
    const smallerValue = base_fare_amount < upto ? base_fare_amount : upto;

    const base_fare_gst = (smallerValue * gstPercent) / 100;

    const conv = smallerValue + base_fare_gst;
    setConvenienceFee(conv);

    const total_price = basePrice + smallerValue + base_fare_gst;

    setTotalPrice(total_price);

    setBookingDataValues({
      price,
      base_fare_amount,
      base_fare_gst,
      total_price,
      gst: gstPercent,
      convenience_fee: conveniencePercent,
    });

  }, [price, GymPrice]);


  const totalPassCount = quantity;



  return (
    <>
      <section style={{ background: "#f1f3f2" }} className="pb-lg-5 pb-3">
        <section className="details_page_header">
          <div className="container">
            <div className="Gym-main-header">
              <div className="breadcrumb">
                <span>
                  Gym &gt; {gym?.location} &gt; {gym?.name}
                </span>
              </div>

              <h1 className="gympage-name">{gym?.name}</h1>
              <div className="gym-location-rating">
                <span>{gym?.location}</span>
                <span
                  className="star"
                  style={{ marginLeft: "20px", marginRight: "5px" }}
                >
                  ★
                </span>
                <span className="light-text"> {Math.floor(gym.rating)}</span>
                <span style={{ marginLeft: "5px" }}>
                  ({gym?.reviewcount} ratings)
                </span>
                {/* <span className="ps-2 text_blue">
                  <a href="">Rate Gym</a>
                </span> */}
              </div>
            </div>
          </div>
        </section>
        <Container>


          <div className="gym-details-container">
            <div className="gym-wrapper row">
              <div className="gym-left col-lg-8">
                <div className="gym-image-carosal">
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
                    {imagelist.map((img, index) => (
                      <SwiperSlide key={index} className="gym-swiperslide">
                        <img
                          src={img}
                          alt={`gym-image-${index}`}
                          className="gym-swiperslide-img"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="venue-icon-topwrapper">
                    <button className="venue-icon-btns">
                      <img src={shareIcon} alt="share" />
                    </button>
                    <button className="venue-icon-btns">
                      <img src={LikeIcon} alt="share" />
                    </button>
                  </div>
                </div>

                <div className="gym-section">
                  <div className="gym-heading">About Glod’s Gym</div>
                  <div className="gym-description">
                    {expandedSection === "about"
                      ? gym?.about
                      : `${gym?.about?.substring(0, 100)}...`}
                  </div>
                </div>

                <div className="gym-section">
                  <div className="gym-heading">Amenities</div>
                  <div className="gym-amenities">
                    {gym?.amenities?.map((i) => (
                      <div key={i} className="amenities_tag">
                        <img
                          src={checkoutIcon}
                          alt="amenities‑tag"
                          className="amt-img"
                        />
                        <span>{i}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="container">
                  <div className="gym-carry-point row">
                    <div className="gym-section gym-carry col-lg-6">
                      <div className="gym-heading">Timing</div>
                      <BusinessHours hours={mappedTimings} />
                    </div>

                    <div className="gym-section gym-pickPoints cstmcoachwd col-lg-6">
                      <div className="gym-heading">Coaches</div>
                      <div className="coaches-list">
                        {Array.isArray(gym?.coaches) &&
                          gym.coaches.length > 0 ? (
                          gym.coaches.map((coach, index) => (
                            <div className="coaches-card" key={index}>
                              <img
                                src={coach.image || CoachImage}
                                alt={coach.name}
                                className="coach-image"
                              />
                              <p className="coach-name">{coach.name}</p>
                              <p className="coach-title">{coach.type}</p>
                              <p className="coach-exp">{coach.exp} Years</p>
                            </div>
                          ))
                        ) : (
                          <p>No coaches available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row g-3 mt-3">
                  <div className="col-12 col-lg-6">
                    <div className="card modal_title">
                      {/* <!-- Button trigger modal --> */}
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div className="rule">
                          <p className="m-0">Terms & Conditions</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn border-0 p-0"
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
                        <div class="modal-dialog modal-dialog-centered">
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
                              <div className="modal-body">
                                <TermsConditionsModal
                                  termsText={
                                    gym?.termsAndCondition ||
                                    "No terms available"
                                  }
                                />
                              </div>
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
                          <p className="m-0">
                            Cancellation Policy
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn border-0"
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
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content custom_modal">
                            <div class="modal-header border-0">
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <CancellationPolicy
                                policyText={
                                  gym?.cancelPolicy ||
                                  "No cancellation policy available"
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="gym-right col-lg-4">
                <div className="gym-right-section">
                  <div className="gym-heading">Location</div>
                  <div className="gym-right-section-p">
                    <p>{gym?.address}</p>
                  </div>
                  <div className="gym-map">
                    <CustomMap
                      latitude={gym?.latitude}
                      longitude={gym?.longitude}
                    />
                  </div>
                </div>

                <div className="gym-right-section">
                  <div className="gym-heading">Choose Passes:</div>
                  <div className="section-group">
                    <div className="select-box">
                      <label>Passes*</label>
                      <select
                        className="dropdown"
                        value={selectedPass?.name || ""}
                        onChange={handleSelect}
                      >
                        <option value="" disabled>
                          Select Passes
                        </option>
                        {GymPrice[0]?.gym_price_slot?.map((item, index) => (
                          <option key={index} value={item.passes_name}>
                            ₹{item.price}/{item.passes_name}
                          </option>
                        ))}
                      </select>
                      {/* Replace above with real dropdown component if needed */}
                    </div>
                    <div className="quantity-box">
                      <label>Quantity:</label>
                      <div className="qty-control">
                        <img
                          src={minusCircle}
                          alt="Decrease quantity"
                          className="qty-icon"
                          onClick={decrement}
                        />

                        <span className="qty">{quantity}</span>

                        <img
                          src={addCircle}
                          alt="Increase quantity"
                          className="qty-icon"
                          onClick={increment}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gym-right-section">
                  <CheckoutPricing
                    totalPrice={totalPrice || 0}
                    convenienceFee={totalAmount ? convenienceFee : 0}
                    bookingData={bookingDataValues}
                    price={price}
                    count={totalPassCount}
                    setCouponInfo={setCouponInfo}
                    type={3}
                    venueId={id}
                    setFinalAmount={setFinalAmount}
                  />
                </div>

                <div className="gym-right-section-button">
                  <button
                    className="gym-btn"
                    onClick={handleProceed}
                    disabled={bookingLoading || paymentLoading}
                  >
                    {bookingLoading || paymentLoading
                      ? "Processing..."
                      : "Proceed"}
                  </button>
                </div>
              </div>
            </div>

            {/* review section */}
            <div className="ratings-carousel">
              <EventReviewSlider event={{ review: gym?.reviews }} />
            </div>

            {/* Banners sections */}
            {/* <div className="event-banner-container">
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
                        </div> */}
            {/* Old banner section removed */}
            <OngoingEvents banners={banners} />
          </div>
        </Container>
      </section>
    </>
  );
}
