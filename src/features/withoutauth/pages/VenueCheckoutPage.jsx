import React, { useEffect, useState } from "react";
import "../Stylesheets/VenueCheckoutPage.css";
import { useParams, useLocation, Link } from "react-router-dom";
import venueImage from "../assets/Venue-image.png";
import cricketIcon from "../../../assets/svg-icons/cricket.svg";
import footballIcon from "../../../assets/svg-icons/football.svg";
import pickleballIcon from "../../../assets/svg-icons/badminton.svg";
import checkoutIcon from "../../../assets/svg-icons/checkout.svg";
import PriceChart from "../components/PriceChart.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import Calendar from "../components/Calendar.jsx";
import TimeSelector from "../components/TimeSelector.jsx";
import ConfirmSlotCard from "../components/ConfirmSlotCard.jsx";
import { useFetchSingleVenue } from "../../../hooks/VenueList/useFetchSingleVenue.js";
import { formatTime } from "../../../utils/formatTime.js";
import { useBanner } from "../../../hooks/useBanner.js";
import { useSportDetails } from "../../../hooks/favouriteSport/useSportDetails.js";
import { formatDate } from "../../../utils/formatDate.js";
import { CheckoutModal } from "../../auth/components/Modal/CheckOutModal.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import OngoingEvents from "../components/OngoingEvents.jsx";
import Spinner from "../../../components/Spinner.jsx";
import "swiper/css";
import "swiper/css/pagination";

/* ── Data mapper ── */
const mapVenueData = (d) => ({
  name: d?.venue_name || "Unknown Venue",
  location: d?.area || "Unknown Area",
  about: d?.about_venue || "",
  rating: parseFloat(d?.average_rating) || 0,
  reviewcount: d?.review_count || 0,
  timing: `${formatTime(d?.start_time || "06:00:00")} – ${formatTime(d?.end_time || "22:00:00")}`,
  price: parseFloat(d?.pricing) || 0,
  address: `${d?.full_address || ""}, ${d?.area || ""}, ${d?.city || ""}, ${d?.state || ""} - ${d?.pincode || ""}`.trim().replace(/^,|,$/g, "") || "Not Available",
  images: Array.isArray(d?.venue_gallery) && d.venue_gallery.length
    ? d.venue_gallery.map(img => img.venue_image).filter(Boolean)
    : [venueImage],
  sports: Array.isArray(d?.sports)
    ? d.sports.map(s => ({ sportId: s.id, name: s.name, icon: s.image }))
    : [
        { name: "Cricket", icon: cricketIcon },
        { name: "Football", icon: footballIcon },
        { name: "Pickle Ball", icon: pickleballIcon },
      ],
  amenities: Array.isArray(d?.amenities) ? d.amenities.map(a => a.name) : [],
  latitude: d?.latitude || 0,
  longitude: d?.longitude || 0,
  reviews: Array.isArray(d?.reviews)
    ? d.reviews.map(r => ({
        id: r.id,
        userName: r.user_name || "Anonymous",
        rating: r.rating || 0,
        comment: r.comment || "No comment",
        date: formatDate(r.createdAt) || new Date().toISOString().split("T")[0],
      }))
    : [],
});

export default function VenueCheckoutPage() {
  const { id } = useParams();
  const location = useLocation();
  const sportIdFromLink = location.state?.sportId;

  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [selectedSportId, setSelectedSportId] = useState(null);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [showPopup, setShowPopup]           = useState(false);
  const [selectedSport, setSelectedSport]   = useState("");
  const [selectedDate, setSelectedDate]     = useState(new Date());
  const [selectedTime, setSelectedTime]     = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [selectedPitch, setSelectedPitch]   = useState("");
  const [bookingId, setBookingId]           = useState(null);
  const [errors, setErrors]                 = useState({ sport: "", date: "", time: "", court: "" });

  const { data, loading, error } = useFetchSingleVenue(id);
  const venue = Array.isArray(data?.result) && data.result.length > 0
    ? mapVenueData(data.result[0])
    : null;

  const { data: sportDetails, error: sportDetailsError } = useSportDetails(selectedSport);
  const sportDetailsData = sportDetails?.result?.[0] || null;

  const { data: bannerData } = useBanner(3);
  const banners = bannerData?.result || [];

  useEffect(() => {
    if (sportIdFromLink) setSelectedSport(sportIdFromLink);
  }, [sportIdFromLink]);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  const handleProceedClick = () => {
    const newErrors = { sport: "", date: "", time: "", court: "" };
    let hasError = false;
    if (!selectedDate) { newErrors.date = "Please select a date."; hasError = true; }
    else if (!selectedSport) { newErrors.sport = "Please select a sport."; hasError = true; }
    else if (!selectedTime) { newErrors.time = "Please select a time slot."; hasError = true; }
    else {
      const courts = sportDetailsData?.courts;
      if (!courts || courts.length === 0) { newErrors.court = "No courts available."; hasError = true; }
      else if (!courts.some(c => c.id === selectedPitch)) { newErrors.court = "Please select a valid court."; hasError = true; }
    }
    setErrors(newErrors);
    if (hasError) { setTimeout(() => setErrors({ sport: "", date: "", time: "", court: "" }), 3000); return; }
    setIsModalOpen(true);
  };

  const myBookingPayload = {
    sportId: selectedSport,
    venueId: id,
    selectedDate,
    selectedDuration: selectedDuration * 60,
    selectedTime,
    selectedPitch,
  };

  const resetBooking = () => {
    setSelectedSport(""); setSelectedDuration(1);
    setSelectedTime(null); setSelectedPitch("");
  };

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={44} color="#1163c7" />
    </div>
  );
  if (error || sportDetailsError) return (
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>Error loading venue details</div>
  );
  if (!venue) return null;

  return (
    <div className="vc-page">

      {/* ── Hero ── */}
      <div className="vc-hero">
        <div className="vc-hero-inner">
          <nav className="vc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/venue">Venues</Link><span>›</span>
            <span className="vc-bc-current">{venue.name}</span>
          </nav>

          <h1 className="vc-hero-name">{venue.name}</h1>

          <div className="vc-hero-meta">
            <div className="vc-hero-meta-item">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="rgba(255,255,255,.8)"/>
                <circle cx="6.5" cy="4.5" r="1.3" fill="rgba(255,255,255,.5)"/>
              </svg>
              {venue.location}
            </div>
            {venue.timing && (
              <div className="vc-hero-meta-item">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,.8)" strokeWidth="1.3"/>
                  <path d="M6.5 4v2.5l1.5 1" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {venue.timing}
              </div>
            )}
            <div className="vc-hero-rating">
              <span className="vc-star">★</span>
              <span>{venue.rating.toFixed(1)}</span>
              <span className="vc-reviews">({venue.reviewcount} reviews)</span>
            </div>
          </div>
        </div>

        <div className="vc-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="vc-body" id="bookingnow">
        <div className="vc-layout">

          {/* ══ LEFT ══ */}
          <div className="vc-left">

            {/* Carousel */}
            <div className="vc-carousel">
              <Swiper
                spaceBetween={0} centeredSlides={false}
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
              </Swiper>
            </div>

            {/* Sports */}
            <div className="vc-card" style={{ animationDelay: ".1s" }}>
              <h2 className="vc-card-title">
                Sports Available
                <span className="vc-card-subtitle">(Click to view price chart)</span>
              </h2>
              <div className="vc-sports-grid">
                {venue.sports.map(sport => (
                  <button
                    className="vc-sport-card"
                    key={sport.name}
                    type="button"
                    onClick={() => { setSelectedSportId(sport.sportId); setIsPriceModalOpen(true); }}
                  >
                    <img src={sport.icon} alt={sport.name} />
                    <p>{sport.name}</p>
                  </button>
                ))}
              </div>
              {isPriceModalOpen && (
                <PriceChart onClose={() => setIsPriceModalOpen(false)} venueId={id} sportId={selectedSportId} />
              )}
            </div>

            {/* About */}
            {venue.about && (
              <div className="vc-card" style={{ animationDelay: ".13s" }}>
                <h2 className="vc-card-title">About</h2>
                <p className="vc-text">{venue.about}</p>
              </div>
            )}

            {/* Amenities */}
            {venue.amenities.length > 0 && (
              <div className="vc-card" style={{ animationDelay: ".16s" }}>
                <h2 className="vc-card-title">Amenities</h2>
                <div className="vc-amenities-grid">
                  {venue.amenities.map((a, i) => (
                    <div className="vc-amenity-chip" key={i}>
                      <img src={checkoutIcon} alt="" aria-hidden="true" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {venue.reviews.length > 0 && (
              <div className="vc-reviews-section">
                <h2 className="vc-reviews-title">Ratings &amp; Reviews</h2>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {venue.reviews.slice(0, 6).map(review => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </div>
            )}

            {/* Banners */}
            {banners.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <OngoingEvents banners={banners} />
              </div>
            )}
          </div>

          {/* ══ RIGHT — Booking Panel ══ */}
          <div className="vc-right">
            <div className="vc-booking-panel">
              <div className="vc-panel-header">
                <p className="vc-panel-title">Book a Slot</p>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="21" rx="3" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"/>
                  <path d="M2 11h24M9 2v6M19 2v6" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="vc-panel-body">
                {/* Calendar */}
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                {errors.date && <p className="vc-error">{errors.date}</p>}

                {/* Sport selector */}
                <div>
                  <label className="vc-field-label">Select Sport</label>
                  <div className="vc-sport-options">
                    {venue.sports.map(sport => (
                      <button
                        key={sport.sportId}
                        type="button"
                        className={`vc-sport-btn${selectedSport === sport.sportId ? " active" : ""}`}
                        onClick={() => { setSelectedSport(sport.sportId); setSelectedDuration(1); setSelectedTime(null); }}
                      >
                        {sport.name}
                      </button>
                    ))}
                  </div>
                  {errors.sport && <p className="vc-error">{errors.sport}</p>}
                </div>

                {/* Time selector */}
                <TimeSelector
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  setSelectedTime={setSelectedTime}
                  selectedDuration={selectedDuration}
                  setSelectedDuration={setSelectedDuration}
                  sportId={selectedSport}
                />
                {errors.time && <p className="vc-error">{errors.time}</p>}

                {/* Court selector */}
                <div>
                  <label className="vc-field-label">Court</label>
                  {selectedTime ? (
                    sportDetailsData?.courts?.length > 0 ? (
                      <div className="vc-pitch-options">
                        {sportDetailsData.courts.map(court => (
                          <button
                            key={court.id}
                            type="button"
                            className={`vc-pitch-btn${selectedPitch === court.id ? " active" : ""}`}
                            onClick={() => setSelectedPitch(court.id)}
                          >
                            {court.court_name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="vc-placeholder">No courts available for this sport/date.</p>
                    )
                  ) : (
                    <p className="vc-placeholder">Select a time slot to see available courts</p>
                  )}
                  {errors.court && <p className="vc-error">{errors.court}</p>}
                </div>

                {/* Proceed */}
                <button className="vc-proceed-btn" onClick={handleProceedClick}>
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Confirm Slot Modal ── */}
      {isModalOpen && (
        <div
          className="vc-modal-overlay"
          onClick={e => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div className="vc-modal-content" onClick={e => e.stopPropagation()}>
            <ConfirmSlotCard
              payload={myBookingPayload}
              onClose={() => { setIsModalOpen(false); resetBooking(); }}
              onSuccess={bookId => {
                setBookingId(bookId);
                setShowPopup(true);
                setIsModalOpen(false);
                resetBooking();
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
  );
}
