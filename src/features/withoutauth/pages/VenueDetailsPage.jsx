import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Stylesheets/VenueDetailsPage.css";
import venueImage from "../assets/Venue-image.png";
import PriceChart from "../components/PriceChart.jsx";
import { useFetchSingleVenue } from "../../../hooks/VenueList/useFetchSingleVenue.js";
import { usePaymentDetails } from "../../../hooks/Payments/usePaymentDetails.js";
import { formatTime } from "../../../utils/formatTime.js";
import CustomMap from "../components/CustomMap.jsx";
import { useBanner } from "../../../hooks/useBanner.js";
import { Share } from "../../../utils/share.js";
import HeartFilled from "../../../assets/svg-icons/heart-filled.svg";
import { useSelector } from "react-redux";
import { useLikeVenue } from "../../../hooks/favouriteVenue/useLikeVenue.js";
import { useUnlikeVenue } from "../../../hooks/favouriteVenue/useUnlikeVenue.js";
import { useQueryClient } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Calendar from "../components/Calendar.jsx";
import TimeSelector from "../components/TimeSelector.jsx";
import { useSportDetails } from "../../../hooks/favouriteSport/useSportDetails.js";
import CheckoutPricing from "../components/CheckoutPricing.jsx";
import Spinner from "../../../components/Spinner.jsx";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement.js";
import checkoutIcon from "../../../assets/svg-icons/checkout.svg";
import { Container } from "react-bootstrap";
import RulesRegulations from "../components/RulesRegulations.jsx";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import OngoingEvents from "../components/OngoingEvents.jsx";

export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const mapVenueData = (apiData) => ({
  name: apiData?.venue_name || "Unknown Venue",
  location: apiData?.area || "Unknown Area",
  about: apiData?.about_venue || "No description available for this venue.",
  rating: parseFloat(apiData?.average_rating) || 0,
  reviewcount: apiData?.review_count || 0,
  timing: `${formatTime(apiData?.start_time || "06:00:00")} - ${formatTime(apiData?.end_time || "22:00:00")}`,
  price: parseFloat(apiData?.pricing) || 0,
  address: `${apiData?.full_address || ""}, ${apiData?.area || ""}, ${apiData?.city || ""}, ${apiData?.state || ""} - ${apiData?.pincode || ""}`.trim().replace(/^,|,$/g, "") || "Not Available",
  images: Array.isArray(apiData?.venue_gallery) && apiData.venue_gallery.length
    ? apiData.venue_gallery.map((img) => img.venue_image).filter(Boolean)
    : [venueImage],
  sports: Array.isArray(apiData?.sports)
    ? apiData.sports.map((sport) => ({ sportId: sport.id, name: sport.name, icon: sport.image }))
    : [],
  amenities: Array.isArray(apiData?.amenities) ? apiData.amenities.map((a) => a.name) : [],
  latitude: apiData?.latitude || 0,
  longitude: apiData?.longitude || 0,
  rules: apiData?.rules_and_regulations,
  booking_policy: apiData?.booking_policy,
  favourite: apiData?.favourite,
  favourite_venue_id: apiData?.favourite_venue_id,
  reviews: Array.isArray(apiData?.reviews)
    ? apiData.reviews.map((r) => ({
        id: r.id, image: r.image,
        userName: r.user_name || "Anonymous",
        rating: r.rating || 0,
        comment: r.comment || "No comment provided",
        date: formatDate(r.createdAt) || new Date().toISOString().split("T")[0],
      }))
    : [],
});

export default function VenueDetailsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const userId = useSelector((s) => s?.auth?.id);
  const likeVenue   = useLikeVenue();
  const unlikeVenue = useUnlikeVenue();

  const [selectedSportId, setSelectedSportId] = useState(null);
  const [selectedDate, setSelectedDate]       = useState(new Date());
  const [selectedTime, setSelectedTime]       = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedPitch, setSelectedPitch]     = useState("");
  const [selectedSport, setSelectedSport]     = useState("");
  const [couponInfo, setCouponInfo]           = useState({ couponId: null, discountAmount: 0 });
  const [convenienceFee, setConvenienceFee]   = useState(0);
  const [price, setPrice]                     = useState(0);
  const [totalPrice, setTotalPrice]           = useState(0);
  const [finalAmount, setFinalAmount]         = useState(0);
  const [bookingId, setBookingId]             = useState(null);
  const [errors, setErrors]                   = useState({ sport: "", date: "", time: "", court: "" });

  const { data, loading, error } = useFetchSingleVenue(id, userId);
  const venue = Array.isArray(data?.result) && data.result.length > 0
    ? mapVenueData(data.result[0])
    : { name: "Loading…", location: "", rating: 0, reviewcount: 0, timing: "", price: 0, address: "", images: [venueImage], sports: [], amenities: [], reviews: [] };

  const { data: sportDetails } = useSportDetails(selectedSport, id);
  const sportDetailsData = sportDetails?.result?.[0] || null;

  const { data: bannerData } = useBanner(3);
  const banners = bannerData?.result || [];

  const { data: BookingPriceDetails, isLoading: BookingPriceLoading } = usePaymentDetails(bookingId);
  const response = BookingPriceDetails?.result?.[0];

  const { mutate: CreateBookingPayment, isLoading: paymentLoading } = useCreateBookingPayment();

  useEffect(() => {
    setPrice(0); setConvenienceFee(0); setTotalPrice(0); setFinalAmount(0);
  }, [selectedDate, selectedSport, selectedTime]);

  useEffect(() => {
    setTotalPrice(response?.total_price || 0);
    setPrice(response?.price || 0);
    setConvenienceFee(response?.convenience_fee_amount || 0);
  }, [response]);

  const handleClickLike = () => {
    if (!venue.favourite) {
      likeVenue.mutate({ venueId: id, userId }, {
        onSuccess: () => queryClient.invalidateQueries(["fetchSingleVenue", id, userId]),
      });
    } else {
      unlikeVenue.mutate({ favouriteVenueId: venue.favourite_venue_id }, {
        onSuccess: () => queryClient.invalidateQueries(["fetchSingleVenue", id, userId]),
      });
    }
  };

  const handleProceedClick = () => {
    const newErrors = { sport: "", date: "", time: "", court: "" };
    let hasError = false;
    if (!selectedDate)  { newErrors.date  = "Please select a date.";       hasError = true; }
    else if (!selectedSport) { newErrors.sport = "Please select a sport."; hasError = true; }
    else if (!selectedTime)  { newErrors.time  = "Please select a time.";  hasError = true; }
    else {
      const courts = sportDetailsData?.courts;
      if (!courts?.length) { newErrors.court = "No courts available."; hasError = true; }
      else if (!courts.some((c) => c.id === selectedPitch)) { newErrors.court = "Please select a court."; hasError = true; }
    }
    setErrors(newErrors);
    if (hasError) { setTimeout(() => setErrors({ sport: "", date: "", time: "", court: "" }), 3000); return; }
    if (!bookingId) return;
    CreateBookingPayment(
      { bookingId, amount: finalAmount, type: 1, couponId: couponInfo.couponId || null, discountAmount: couponInfo.discountAmount || 0, convenienceFees: convenienceFee || 0 },
      { onSuccess: () => { setSelectedSport(""); setSelectedDuration(0); setSelectedTime(null); setSelectedPitch(""); setFinalAmount(null); setTotalPrice(0); setConvenienceFee(0); } }
    );
  };

  const formatBookingHeader = (date, sportName, time, duration, courtName) => {
    if (!date || !sportName || !time) return "";
    const timeObj = time instanceof Date ? time : new Date(time);
    const h = timeObj.getHours().toString().padStart(2, "0");
    const m = timeObj.getMinutes().toString().padStart(2, "0");
    const start = new Date(`1970-01-01T${h}:${m}:00`);
    const end   = new Date(`1970-01-01T${h}:${m}:00`);
    end.setMinutes(end.getMinutes() + duration * 60);
    const day = new Date(date).getDate();
    const weekday = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    const startFmt = start.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const endFmt   = end.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    return `${day} ${weekday} · ${sportName} · ${startFmt}–${endFmt}${courtName ? ` · ${courtName}` : ""}`;
  };

  const selectedCourtName = sportDetailsData?.courts?.find((c) => c.id === selectedPitch)?.court_name;
  const selectedSportName = venue?.sports?.find((s) => s.sportId === selectedSport)?.name;

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={44} color="#1163c7" />
    </div>
  );
  if (error) return <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>Error loading venue details</div>;

  return (
    <div className="vd-page">

      {/* ── Hero ── */}
      <div className="vd-hero">
        <div className="vd-hero-inner">
          {/* Breadcrumb */}
          <nav className="vd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/venue">Venues</Link>
            <span>›</span>
            <span className="vd-bc-current">{venue.name}</span>
          </nav>

          {/* Name */}
          <h1 className="vd-hero-name">{venue.name}</h1>

          {/* Meta */}
          <div className="vd-hero-meta">
            <div className="vd-hero-location">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" fill="rgba(255,255,255,.8)"/>
                <circle cx="7" cy="5" r="1.5" fill="rgba(255,255,255,.5)"/>
              </svg>
              {venue.location}
            </div>

            <div className="vd-hero-rating">
              <span className="vd-star">★</span>
              <span>{venue.rating.toFixed(1)}</span>
              <span className="vd-reviews">({venue.reviewcount} reviews)</span>
            </div>

            {venue.timing && (
              <div className="vd-hero-timing">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,.7)" strokeWidth="1.4"/>
                  <path d="M7 4v3l2 1.5" stroke="rgba(255,255,255,.7)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                {venue.timing}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="vd-hero-actions">
            <button className="vd-action-btn" onClick={Share} aria-label="Share venue">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4.4 6.2l5.2-3M4.4 7.8l5.2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Share
            </button>
            <button
              className={`vd-action-btn${venue.favourite ? " vd-liked" : ""}`}
              onClick={handleClickLike}
              aria-label={venue.favourite ? "Unlike venue" : "Like venue"}
            >
              {venue.favourite ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="#ff3b30">
                  <path d="M7 12S1 8.5 1 4.5A3.5 3.5 0 017 2.5 3.5 3.5 0 0113 4.5C13 8.5 7 12 7 12z"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 12S1 8.5 1 4.5A3.5 3.5 0 017 2.5 3.5 3.5 0 0113 4.5C13 8.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
              )}
              {venue.favourite ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Wave */}
        <div className="vd-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="vd-body">
        <div className="vd-layout">

          {/* ══ LEFT ══ */}
          <div className="vd-left">

            {/* Image carousel */}
            <div className="vd-carousel">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {venue.images.map((img, i) => (
                  <SwiperSlide key={i} className="venue-swiperslide">
                    <img src={img} alt={`${venue.name} — photo ${i + 1}`} className="venue-swiperslide-img" />
                  </SwiperSlide>
                ))}
                <div className="venue-icon-topwrapper">
                  <button className="venue-icon-btns" onClick={Share} aria-label="Share">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="12" cy="3" r="1.8" stroke="#1163C7" strokeWidth="1.4"/>
                      <circle cx="12" cy="13" r="1.8" stroke="#1163C7" strokeWidth="1.4"/>
                      <circle cx="4" cy="8" r="1.8" stroke="#1163C7" strokeWidth="1.4"/>
                      <path d="M5.7 7l4.6-3M5.7 9l4.6 3" stroke="#1163C7" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className="venue-icon-btns" onClick={handleClickLike} aria-label="Save">
                    {venue.favourite ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="#ff3b30">
                        <path d="M8 14S1 9.5 1 5A4 4 0 018 2.5 4 4 0 0115 5C15 9.5 8 14 8 14z"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 14S1 9.5 1 5A4 4 0 018 2.5 4 4 0 0115 5C15 9.5 8 14 8 14z" stroke="#1163C7" strokeWidth="1.4"/>
                      </svg>
                    )}
                  </button>
                </div>
              </Swiper>
            </div>

            {/* About */}
            <div className="vd-card" style={{ animationDelay: ".1s" }}>
              <h2 className="vd-card-title">About this Venue</h2>
              <p className="vd-about-text">{venue.about}</p>
            </div>

            {/* Amenities */}
            {venue.amenities.length > 0 && (
              <div className="vd-card" style={{ animationDelay: ".15s" }}>
                <h2 className="vd-card-title">Amenities</h2>
                <div className="vd-amenities-grid">
                  {venue.amenities.map((item) => (
                    <div className="vd-amenity-chip" key={item}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" fill="#1163C7" opacity=".15"/>
                        <path d="M3.5 6l2 2 3-3" stroke="#1163C7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sports */}
            {venue.sports.length > 0 && (
              <div className="vd-card" style={{ animationDelay: ".2s" }}>
                <h2 className="vd-card-title">
                  Sports Available
                  <span className="vd-card-note">Click to view price chart</span>
                </h2>
                <div className="vd-sports-grid">
                  {venue.sports.map((sport) => (
                    <button
                      key={sport.sportId}
                      className={`vd-sport-btn${selectedSportId === sport.sportId ? " vd-sport-active" : ""}`}
                      onClick={() => setSelectedSportId(sport.sportId)}
                      type="button"
                    >
                      <img src={sport.icon} alt={sport.name} />
                      <span>{sport.name}</span>
                    </button>
                  ))}
                </div>
                {selectedSportId && (
                  <div style={{ marginTop: 16 }}>
                    <PriceChart venueId={id} sportId={selectedSportId} />
                  </div>
                )}
              </div>
            )}

            {/* Policies */}
            <div className="vd-policy-row" style={{ animationDelay: ".25s" }}>
              {/* Rules */}
              <button
                className="vd-policy-card"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#RulesRegulations"
              >
                <span className="vd-policy-label">Rules &amp; Regulations</span>
                <span className="vd-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              {/* Cancellation */}
              <button
                className="vd-policy-card"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#CancellationPolicy"
              >
                <span className="vd-policy-label">Cancellation Policy</span>
                <span className="vd-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Reviews */}
            {venue.reviews.length > 0 && (
              <div className="vd-reviews-section">
                <h2 className="vd-reviews-title">Reviews</h2>
                <EventReviewSlider event={{ review: venue.reviews }} />
              </div>
            )}

            {/* Banners */}
            {banners.length > 0 && (
              <div className="vd-banners-section">
                <OngoingEvents banners={banners} />
              </div>
            )}
          </div>

          {/* ══ RIGHT — Booking Panel ══ */}
          <div className="vd-right">
            <div className="vd-booking-panel">
              {/* Panel header */}
              <div className="vd-panel-header">
                <p className="vd-panel-title">Book this Venue</p>
                {venue.price > 0 && (
                  <p className="vd-panel-price">
                    ₹{venue.price.toFixed(0)} <span>/ hr</span>
                  </p>
                )}
              </div>

              <div className="vd-panel-body">
                {/* Location */}
                <div className="vd-location-block">
                  <p className="vd-location-title">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="#1163C7" opacity=".8"/>
                      <circle cx="6.5" cy="4.5" r="1.3" fill="white"/>
                    </svg>
                    Location
                  </p>
                  <p className="vd-location-text">{venue.address}</p>
                  <div className="vd-map-wrap">
                    <CustomMap latitude={venue.latitude} longitude={venue.longitude} />
                  </div>
                </div>

                {/* Calendar */}
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

                {/* Sport selector */}
                {venue.sports.length > 0 && (
                  <div className="vd-sport-selector">
                    <p className="vd-selector-label">Select Sport</p>
                    <div className="vd-sport-pills">
                      {venue.sports.map((sport) => (
                        <button
                          key={sport.sportId}
                          type="button"
                          className={`vd-sport-pill${selectedSport === sport.sportId ? " active" : ""}`}
                          onClick={() => { setSelectedSport(sport.sportId); setSelectedDuration(1); setSelectedTime(null); }}
                        >
                          {sport.name}
                        </button>
                      ))}
                    </div>
                    {errors.sport && <p className="vd-error">⚠ {errors.sport}</p>}
                  </div>
                )}

                {/* Time selector */}
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

                {/* Booking summary */}
                {formatBookingHeader(selectedDate, selectedSportName, selectedTime, selectedDuration, selectedCourtName) && (
                  <div className="vd-booking-summary">
                    {formatBookingHeader(selectedDate, selectedSportName, selectedTime, selectedDuration, selectedCourtName)}
                  </div>
                )}

                {/* Pricing */}
                {BookingPriceLoading ? (
                  <div style={{ display: "flex", justifyContent: "center", padding: "16px 0" }}>
                    <Spinner size={36} color="#1163c7" />
                  </div>
                ) : (
                  <CheckoutPricing
                    priceLabel="Court Price"
                    totalPrice={totalPrice || 0}
                    price={price}
                    setCouponInfo={setCouponInfo}
                    convenienceFee={convenienceFee}
                    bookingData={response}
                    count={1}
                    type={1}
                    venueId={id}
                    setFinalAmount={setFinalAmount}
                  />
                )}

                {/* Proceed */}
                <button
                  className="vd-proceed-btn"
                  onClick={handleProceedClick}
                  disabled={paymentLoading}
                >
                  {paymentLoading ? "Processing…" : "Proceed to Book"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <div className="modal fade" id="RulesRegulations" tabIndex="-1" aria-labelledby="RulesRegulations" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ fontFamily: "Lato,sans-serif", fontWeight: 700, color: "#172A39" }}>
                Rules &amp; Regulations
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <RulesRegulations content={venue.rules} />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="CancellationPolicy" tabIndex="-1" aria-labelledby="CancellationPolicy" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ fontFamily: "Lato,sans-serif", fontWeight: 700, color: "#172A39" }}>
                Cancellation Policy
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <CancellationPolicy policyText={venue.booking_policy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
