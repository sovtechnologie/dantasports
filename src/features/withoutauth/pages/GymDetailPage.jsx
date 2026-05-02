import React, { useEffect, useState } from "react";
import "../Stylesheets/GymDetailPage.css";
import Cookies from "js-cookie";
import CustomMap from "../components/CustomMap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import GymImage from "../assets/mygym.svg";
import checkoutIcon from "../../../assets/svg-icons/checkout.svg";
import CoachImage from "../assets/CoachesImage.svg";
import "swiper/css";
import "swiper/css/pagination";
import { useParams, Link } from "react-router-dom";
import { useFetchGymDetail } from "../../../hooks/GymList/useFetchGymDetails";
import { useBookGym } from "../../../hooks/GymList/useBookGym";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchGymPrice } from "../../../hooks/GymList/useFetchGymPrice";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TermsConditionsModal from "../components/TermsConditionsModal.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import BusinessHours from "../components/BusinessHours.jsx";
import OngoingEvents from "../components/OngoingEvents.jsx";
import CheckoutPricing from "../components/CheckoutPricing";
import Spinner from "../../../components/Spinner.jsx";

/* ── Data mapper ── */
const mapGymData = (d) => ({
  name: d?.gym_name || "Unknown Gym",
  location: d?.area || "Unknown Area",
  about: d?.about_gym || "",
  rating: parseFloat(d?.average_rating) || 0,
  reviewcount: d?.review_count || 0,
  address: (d?.full_address || "").trim().replace(/^,|,$/g, "") || "Not Available",
  gym_timings: Array.isArray(d?.gym_timings) ? d.gym_timings : [],
  coaches: Array.isArray(d?.gym_coaches) ? d.gym_coaches : [],
  images: Array.isArray(d?.event_gallery) && d.event_gallery.length
    ? d.event_gallery.map(img => img.image_url).filter(Boolean)
    : [GymImage],
  latitude: d?.lat || 0,
  longitude: d?.lng || 0,
  amenities: Array.isArray(d?.amenities) ? d.amenities.map(a => a.name) : [],
  termsAndCondition: d?.term_and_conditions,
  cancelPolicy: d?.cancellation_policy,
  reviews: Array.isArray(d?.reviews)
    ? d.reviews.map(r => ({
        id: r.id, image: r.image,
        userName: r.user_name || "Anonymous",
        rating: r.rating || 0,
        comment: r.comment || "No comment",
      }))
    : [],
});

const DAY_ORDER = ["friday","saturday","sunday","monday","tuesday","wednesday","thusday"];

const fmtTime = (t) => {
  if (!t) return "";
  const [h, m] = t.split(":");
  let hr = parseInt(h, 10);
  const ap = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return `${hr}:${m} ${ap}`;
};

export default function GymDetailPage() {
  const { id } = useParams();
  const isLoggedIn = Boolean(Cookies.get("token"));

  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [selectedPass, setSelectedPass]   = useState(null);
  const [quantity, setQuantity]           = useState(0);
  const [passess, setPassess]             = useState({ passId: null, quantity: 0 });
  const [price, setPrice]                 = useState(0);
  const [totalPrice, setTotalPrice]       = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(0);
  const [couponInfo, setCouponInfo]       = useState({ couponId: null, discountAmount: 0 });
  const [finalAmount, setFinalAmount]     = useState(null);
  const [bookingDataValues, setBookingDataValues] = useState();

  const { data: GymDetails, isLoading } = useFetchGymDetail(id);
  const gym = Array.isArray(GymDetails?.result) && GymDetails.result.length > 0
    ? mapGymData(GymDetails.result[0])
    : null;

  const { data: gymPrice } = useFetchGymPrice(id);
  const GymPrice = gymPrice?.result || [];

  const { data: bannerData } = useBanner(3);
  const banners = bannerData?.result || [];

  const { mutate: CreateBookingPayment, isLoading: paymentLoading } = useCreateBookingPayment();
  const { mutate: BookGym, isLoading: bookingLoading } = useBookGym();

  const totalAmount = selectedPass ? selectedPass.price * quantity : 0;

  useEffect(() => { setPrice(totalAmount); }, [totalAmount]);

  useEffect(() => {
    if (!price || price === 0) {
      setFinalAmount(0); setTotalPrice(0); setConvenienceFee(0); return;
    }
    const basePrice = Number(totalAmount);
    const convPct   = Number(GymPrice?.[0]?.convenience_fees || 0);
    const gstPct    = Number(GymPrice?.[0]?.gst || 0);
    const upto      = Number(GymPrice[0]?.upto ?? 0);
    const baseFare  = (basePrice * convPct) / 100;
    const smaller   = baseFare < upto ? baseFare : upto;
    const gstAmt    = (smaller * gstPct) / 100;
    const conv      = smaller + gstAmt;
    setConvenienceFee(conv);
    setTotalPrice(basePrice + smaller + gstAmt);
    setBookingDataValues({ price, base_fare_amount: baseFare, base_fare_gst: gstAmt, total_price: basePrice + smaller + gstAmt, gst: gstPct, convenience_fee: convPct });
  }, [price, GymPrice, totalAmount]);

  const handleSelect = (e) => {
    const val = e.target.value;
    const item = GymPrice[0]?.gym_price_slot?.find(i => i.passes_name === val);
    if (item) {
      setSelectedPass({ name: item.passes_name, price: item.price });
      setQuantity(0);
      setPassess({ passId: item.id, quantity: 0 });
    }
  };

  const decrement = () => setQuantity(q => {
    const n = Math.max(0, q - 1);
    setPassess(p => ({ ...p, quantity: n }));
    return n;
  });
  const increment = () => setQuantity(q => {
    const n = q + 1;
    setPassess(p => ({ ...p, quantity: n }));
    return n;
  });

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: gym?.name, text: `Check out: ${gym?.name}`, url }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(url); } catch {}
    }
  };

  const handleProceed = () => {
    if (!isLoggedIn) { alert("Please log in to proceed."); return; }
    BookGym(
      { isInsuranceSelected: true, gymId: id, passess: [passess] },
      {
        onSuccess: (data) => {
          const bookingId = data?.result;
          CreateBookingPayment(
            { bookingId, amount: finalAmount, type: 3, couponId: couponInfo?.couponId || null, discountAmount: couponInfo?.discountAmount || 0, convenienceFees: convenienceFee },
            {
              onSuccess: (pd) => {
                if (pd?.result) {
                  window.open(pd.result, "_blank", "noopener,noreferrer");
                  setPassess({ passId: null, quantity: 0 });
                  setSelectedPass(null); setQuantity(0); setFinalAmount(0); setPrice(0);
                }
              },
              onError: (e) => alert("Payment failed: " + (e.message || "")),
            }
          );
        },
        onError: (e) => alert("Booking failed: " + (e.message || "")),
      }
    );
  };

  /* Build timing rows */
  const mappedTimings = DAY_ORDER.map(dayKey => {
    const label = dayKey.charAt(0).toUpperCase() + dayKey.slice(1);
    const ranges = (gym?.gym_timings || [])
      .filter(t => t[dayKey] === 1)
      .map(t => `${fmtTime(t.start_time.split(".")[0])} – ${fmtTime(t.end_time.split(".")[0])}`);
    return { day: label, range: ranges.length ? ranges.join(", ") : "Closed" };
  });

  if (isLoading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={44} color="#1163c7" />
    </div>
  );
  if (!gym) return (
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>Gym not found</div>
  );

  return (
    <div className="gd-page">

      {/* ── Hero ── */}
      <div className="gd-hero">
        <div className="gd-hero-inner">
          <nav className="gd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/gym">Gym</Link><span>›</span>
            <span className="gd-bc-current">{gym.name}</span>
          </nav>

          <div className="gd-hero-badges">
            <span className="gd-badge">Fitness</span>
            {gym.amenities.length > 0 && (
              <span className="gd-badge gd-badge--green">{gym.amenities.length} Amenities</span>
            )}
          </div>

          <h1 className="gd-hero-name">{gym.name}</h1>

          <div className="gd-hero-meta">
            <div className="gd-hero-meta-item">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="rgba(255,255,255,.8)"/>
                <circle cx="6.5" cy="4.5" r="1.3" fill="rgba(255,255,255,.5)"/>
              </svg>
              {gym.location}
            </div>
            <div className="gd-hero-rating">
              <span className="gd-star">★</span>
              <span>{gym.rating.toFixed(1)}</span>
              <span className="gd-reviews">({gym.reviewcount} reviews)</span>
            </div>
          </div>

          <div className="gd-hero-actions">
            <button className="gd-action-btn" onClick={handleShare} aria-label="Share">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4.4 6.2l5.2-3M4.4 7.8l5.2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Share
            </button>
          </div>
        </div>

        <div className="gd-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="gd-body">
        <div className="gd-layout">

          {/* ══ LEFT ══ */}
          <div className="gd-left">

            {/* Carousel */}
            <div className="gd-carousel">
              <Swiper
                spaceBetween={0} centeredSlides={false}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                <div className="venue-icon-topwrapper">
                  <button className="venue-icon-btns" onClick={handleShare} aria-label="Share">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="12" cy="3" r="1.8" stroke="#1163C7" strokeWidth="1.4"/>
                      <circle cx="12" cy="13" r="1.8" stroke="#1163C7" strokeWidth="1.4"/>
                      <circle cx="4" cy="8" r="1.8" stroke="#1163C7" strokeWidth="1.4"/>
                      <path d="M5.7 7l4.6-3M5.7 9l4.6 3" stroke="#1163C7" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
                {gym.images.map((img, i) => (
                  <SwiperSlide key={i} className="gym-swiperslide">
                    <img src={img} alt={`${gym.name} — photo ${i + 1}`} className="gym-swiperslide-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* About */}
            {gym.about && (
              <div className="gd-card" style={{ animationDelay: ".1s" }}>
                <h2 className="gd-card-title">About the Gym</h2>
                <p className="gd-text">
                  {aboutExpanded ? gym.about : `${gym.about.substring(0, 220)}${gym.about.length > 220 ? "…" : ""}`}
                </p>
                {gym.about.length > 220 && (
                  <button className="gd-read-more" onClick={() => setAboutExpanded(p => !p)}>
                    {aboutExpanded ? "Read less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>
            )}

            {/* Amenities */}
            {gym.amenities.length > 0 && (
              <div className="gd-card" style={{ animationDelay: ".13s" }}>
                <h2 className="gd-card-title">Amenities</h2>
                <div className="gd-amenities-grid">
                  {gym.amenities.map((a, i) => (
                    <div className="gd-amenity-chip" key={i}>
                      <img src={checkoutIcon} alt="" aria-hidden="true" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timing + Coaches */}
            <div className="gd-two-col" style={{ animationDelay: ".16s" }}>
              <div className="gd-card">
                <h2 className="gd-card-title">Timings</h2>
                <BusinessHours hours={mappedTimings} />
              </div>

              {gym.coaches.length > 0 && (
                <div className="gd-card">
                  <h2 className="gd-card-title">Coaches</h2>
                  <div className="gd-coaches-grid">
                    {gym.coaches.map((coach, i) => (
                      <div className="gd-coach-card" key={i}>
                        <img
                          src={coach.image || CoachImage}
                          alt={coach.name}
                          className="gd-coach-avatar"
                          onError={e => { e.target.src = CoachImage; }}
                        />
                        <p className="gd-coach-name">{coach.name}</p>
                        <p className="gd-coach-type">{coach.type}</p>
                        {coach.exp && <p className="gd-coach-exp">{coach.exp} yrs exp</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Policies */}
            <div className="gd-policy-row" style={{ animationDelay: ".2s" }}>
              <button className="gd-policy-card" type="button" data-bs-toggle="modal" data-bs-target="#GymTermsModal">
                <span className="gd-policy-label">Terms &amp; Conditions</span>
                <span className="gd-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <button className="gd-policy-card" type="button" data-bs-toggle="modal" data-bs-target="#GymCancelModal">
                <span className="gd-policy-label">Cancellation Policy</span>
                <span className="gd-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Reviews */}
            {gym.reviews.length > 0 && (
              <div className="gd-reviews-section">
                <h2 className="gd-reviews-title">Reviews</h2>
                <EventReviewSlider event={{ review: gym.reviews }} />
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
          <div className="gd-right">
            <div className="gd-booking-panel">
              <div className="gd-panel-header">
                <div>
                  <p className="gd-panel-title">Book a Pass</p>
                </div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="21" rx="3" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"/>
                  <path d="M2 11h24M9 2v6M19 2v6" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="gd-panel-body">
                {/* Location */}
                <div className="gd-location-block">
                  <p className="gd-location-title">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="#1163C7" opacity=".8"/>
                      <circle cx="6.5" cy="4.5" r="1.3" fill="white"/>
                    </svg>
                    Location
                  </p>
                  <p className="gd-location-text">{gym.address}</p>
                  <div className="gd-map-wrap">
                    <CustomMap latitude={gym.latitude} longitude={gym.longitude} />
                  </div>
                </div>

                {/* Pass selector */}
                <div className="gd-pass-block">
                  <label className="gd-field-label">Select Pass</label>
                  <select className="gd-select" value={selectedPass?.name || ""} onChange={handleSelect}>
                    <option value="" disabled>Choose a pass…</option>
                    {GymPrice[0]?.gym_price_slot?.map((item, i) => (
                      <option key={i} value={item.passes_name}>
                        ₹{item.price} / {item.passes_name}
                      </option>
                    ))}
                  </select>

                  {/* Quantity */}
                  <div className="gd-qty-row">
                    <span className="gd-qty-label">Quantity</span>
                    <div className="gd-qty-control">
                      <button className="gd-qty-btn" type="button" onClick={decrement} aria-label="Decrease">
                        <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
                          <path d="M1 1h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <span className="gd-qty-value">{quantity}</span>
                      <button className="gd-qty-btn" type="button" onClick={increment} aria-label="Increase">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <CheckoutPricing
                  priceLabel="Passes Price"
                  totalPrice={totalPrice || 0}
                  convenienceFee={totalAmount ? convenienceFee : 0}
                  bookingData={bookingDataValues}
                  price={price}
                  count={quantity}
                  setCouponInfo={setCouponInfo}
                  type={3}
                  venueId={id}
                  setFinalAmount={setFinalAmount}
                />

                {/* Book button */}
                <button
                  className="gd-book-btn"
                  onClick={handleProceed}
                  disabled={bookingLoading || paymentLoading}
                >
                  {bookingLoading || paymentLoading ? "Processing…" : "Proceed to Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <div className="modal fade" id="GymTermsModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ fontFamily: "Lato,sans-serif", fontWeight: 700, color: "#172A39" }}>
                Terms &amp; Conditions
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <TermsConditionsModal termsText={gym.termsAndCondition} />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="GymCancelModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ fontFamily: "Lato,sans-serif", fontWeight: 700, color: "#172A39" }}>
                Cancellation Policy
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <CancellationPolicy policyText={gym.cancelPolicy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
