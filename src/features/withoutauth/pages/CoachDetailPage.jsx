import "../Stylesheets/CoachDetailPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import RunImage    from "../assets/RunImage.svg";
import CoachImage  from "../assets/CoachesImage.svg";
import calandarlogo from "../assets/calandarImage.svg";
import adultlogo   from "../assets/adultlogo.svg";
import sessionlogo from "../assets/Sessionlogo.svg";
import locationlogo from "../assets/LocationLogo.svg";
import Certificate1 from "../assets/certificate-name.png";
import footballIcon from "../../../assets/svg-icons/football.svg";

import CustomMap      from "../components/CustomMap";
import EnquiryModal   from "../components/EnquiryModal";
import EventReviewSlider from "../components/EventReviewSlider";
import Spinner        from "../../../components/Spinner";

import { useFetchCoachDetails } from "../../../hooks/CoachList/useFetchCoachDetail";
import { useCreateQuery }       from "../../../hooks/CoachList/useCreateQuery";

/* ── Data mapper ── */
const mapCoachData = (d) => {
  const loc = d?.locations?.[0] || {};
  const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  const availableDays = DAYS.filter(k => d?.[k] === 1)
    .map(k => k.charAt(0).toUpperCase() + k.slice(1))
    .join(", ") || "Not Available";

  return {
    id: d?.id,
    name: d?.name || "Unknown Coach",
    location: loc.area || "Unknown Area",
    latitude: loc.lat || 0,
    longitude: loc.lng || 0,
    about: d?.about || "",
    type: d?.type,
    rating: parseFloat(d?.average_rating) || 0,
    reviewcount: d?.review_count || 0,
    address: (loc.full_address || "").trim().replace(/^,|,$/g, "") || "Not Available",
    multilocation: Array.isArray(d?.locations) ? d.locations : [],
    training_type: d?.training_type,
    classes: d?.classes,
    fees_and_packages: d?.fees_and_packages,
    available_days: availableDays,
    certificates: Array.isArray(d?.certificates)
      ? d.certificates
          .filter((c, i, s) => i === s.findIndex(t => t.id === c.id))
          .map(c => ({ id: c.id, name: c.certificate_name, url: c.certificate_url }))
      : [],
    images: Array.isArray(d?.gallery_images) && d.gallery_images.length
      ? d.gallery_images.map(img => img.image).filter(Boolean)
      : [RunImage],
    coaches: Array.isArray(d?.gym_coaches)
      ? d.gym_coaches.map(c => ({ name: c.name, title: c.type, image: c.image || CoachImage }))
      : [],
    sports: Array.isArray(d?.linked_sports)
      ? d.linked_sports.map(s => ({ id: s.id, name: s.sports_name, icon: s.sports_images }))
      : [{ id: 1, name: "Football", icon: footballIcon }],
    reviews: Array.isArray(d?.reviews)
      ? d.reviews.map(r => ({
          id: r.id, image: r.image,
          userName: r.user_name || "Anonymous",
          rating: r.rating || 0,
          comment: r.comment || "No comment",
        }))
      : [],
  };
};

export default function CoachDetailPage() {
  const { id } = useParams();
  const userId  = useSelector(s => s.auth.id);

  const [aboutExpanded, setAboutExpanded]   = useState(false);
  const [feesExpanded,  setFeesExpanded]    = useState(false);
  const [showModal,     setShowModal]       = useState(false);

  const { data: CoachDetails, isLoading } = useFetchCoachDetails(id);
  const coach = Array.isArray(CoachDetails?.result) && CoachDetails.result.length > 0
    ? mapCoachData(CoachDetails.result[0])
    : null;

  const createQueryMutation = useCreateQuery();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: coach?.name, text: `Check out this coach: ${coach?.name}`, url }); }
      catch {}
    } else {
      try { await navigator.clipboard.writeText(url); alert("Link copied!"); }
      catch { alert("Unable to copy link"); }
    }
  };

  const handleSubmitEnquiry = (message) => {
    createQueryMutation.mutate(
      { academyCoachesId: coach?.id, reciverId: userId, message, chatType: 2, title: "Enquiry", body: message },
      { onSuccess: () => setShowModal(false) }
    );
  };

  if (isLoading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={44} color="#1163c7" />
    </div>
  );

  if (!coach) return (
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>
      Coach not found
    </div>
  );

  const typeLabel = coach.type === 1 ? "Trainer" : coach.type === 2 ? "Academy" : "Coach";

  return (
    <div className="cd-page">

      {/* ── Hero ── */}
      <div className="cd-hero">
        <div className="cd-hero-inner">
          {/* Breadcrumb */}
          <nav className="cd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/coach">Coaches</Link>
            <span>›</span>
            <span className="cd-bc-current">{coach.name}</span>
          </nav>

          {/* Type badge */}
          <div className="cd-hero-badge">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" fill="rgba(255,255,255,.4)"/>
              <path d="M3 5l1.5 1.5L7 3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {typeLabel}
          </div>

          {/* Name */}
          <h1 className="cd-hero-name">{coach.name}</h1>

          {/* Meta */}
          <div className="cd-hero-meta">
            <div className="cd-hero-location">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="rgba(255,255,255,.8)"/>
                <circle cx="6.5" cy="4.5" r="1.3" fill="rgba(255,255,255,.5)"/>
              </svg>
              {coach.location}
            </div>

            <div className="cd-hero-rating">
              <span className="cd-star">★</span>
              <span>{coach.rating.toFixed(1)}</span>
              <span className="cd-reviews">({coach.reviewcount} reviews)</span>
            </div>

            {coach.training_type && (
              <div className="cd-hero-badge" style={{ margin: 0 }}>
                {coach.training_type}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="cd-hero-actions">
            <button className="cd-action-btn" onClick={handleShare} aria-label="Share">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4.4 6.2l5.2-3M4.4 7.8l5.2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Share
            </button>
            <button className="cd-action-btn" onClick={() => setShowModal(true)} aria-label="Enquire">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5l-3 2V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
              Enquire
            </button>
          </div>
        </div>

        {/* Wave */}
        <div className="cd-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="cd-body">
        <div className="cd-layout">

          {/* ══ LEFT ══ */}
          <div className="cd-left">

            {/* Carousel */}
            <div className="cd-carousel">
              <Swiper
                spaceBetween={0}
                centeredSlides={false}
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
                {coach.images.map((img, i) => (
                  <SwiperSlide key={i} className="coach-swiperslide">
                    <img src={img} alt={`${coach.name} — photo ${i + 1}`} className="coach-swiperslide-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* About */}
            {coach.about && (
              <div className="cd-card" style={{ animationDelay: ".1s" }}>
                <h2 className="cd-card-title">About {coach.name}</h2>
                <p className="cd-about-text">
                  {aboutExpanded ? coach.about : `${coach.about.substring(0, 200)}${coach.about.length > 200 ? "…" : ""}`}
                </p>
                {coach.about.length > 200 && (
                  <button className="cd-read-more" onClick={() => setAboutExpanded(p => !p)}>
                    {aboutExpanded ? "Read less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>
            )}

            {/* Sessions + Fees */}
            <div className="cd-two-col">
              {/* Sessions */}
              <div className="cd-card" style={{ animationDelay: ".15s" }}>
                <h2 className="cd-card-title">Sessions</h2>
                <div className="cd-session-grid">
                  {coach.available_days && (
                    <div className="cd-session-item">
                      <div className="cd-session-icon">
                        <img src={calandarlogo} alt="days" />
                      </div>
                      <div>
                        <p className="cd-session-label">Available Days</p>
                        <p className="cd-session-value">{coach.available_days}</p>
                      </div>
                    </div>
                  )}
                  {coach.training_type && (
                    <div className="cd-session-item">
                      <div className="cd-session-icon">
                        <img src={adultlogo} alt="type" />
                      </div>
                      <div>
                        <p className="cd-session-label">Training Type</p>
                        <p className="cd-session-value">{coach.training_type}</p>
                      </div>
                    </div>
                  )}
                  {coach.classes && (
                    <div className="cd-session-item">
                      <div className="cd-session-icon">
                        <img src={sessionlogo} alt="classes" />
                      </div>
                      <div>
                        <p className="cd-session-label">Classes</p>
                        <p className="cd-session-value">{coach.classes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Fees */}
              {coach.fees_and_packages && (
                <div className="cd-card" style={{ animationDelay: ".18s" }}>
                  <h2 className="cd-card-title">Fees &amp; Packages</h2>
                  <p className="cd-about-text" style={{ whiteSpace: "pre-wrap" }}>
                    {feesExpanded
                      ? coach.fees_and_packages
                      : `${coach.fees_and_packages.substring(0, 180)}${coach.fees_and_packages.length > 180 ? "…" : ""}`}
                  </p>
                  {coach.fees_and_packages.length > 180 && (
                    <button className="cd-read-more" onClick={() => setFeesExpanded(p => !p)}>
                      {feesExpanded ? "Read less ↑" : "Read more ↓"}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Academy coaches + sports */}
            {coach.type === 2 && (
              <>
                {coach.coaches.length > 0 && (
                  <div className="cd-card" style={{ animationDelay: ".2s" }}>
                    <h2 className="cd-card-title">Our Coaches</h2>
                    <div className="cd-coaches-grid">
                      {coach.coaches.map((c, i) => (
                        <div className="cd-coach-card" key={i}>
                          <img src={c.image} alt={c.name} className="cd-coach-avatar"
                            onError={e => { e.target.src = CoachImage; }} />
                          <p className="cd-coach-name">{c.name}</p>
                          <p className="cd-coach-role">{c.title === 1 ? "Trainer" : "Academy"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {coach.sports.length > 0 && (
                  <div className="cd-card" style={{ animationDelay: ".22s" }}>
                    <h2 className="cd-card-title">Sports Offered</h2>
                    <div className="cd-sports-grid">
                      {coach.sports.map((s) => (
                        <div className="cd-sport-chip" key={s.id}>
                          <img src={s.icon || footballIcon} alt={s.name}
                            onError={e => { e.target.src = footballIcon; }} />
                          <span>{s.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Reviews */}
            {coach.reviews.length > 0 && (
              <div className="cd-reviews-section">
                <h2 className="cd-reviews-title">Reviews</h2>
                <EventReviewSlider event={{ review: coach.reviews }} />
              </div>
            )}
          </div>

          {/* ══ RIGHT ══ */}
          <div className="cd-right">

            {/* Location */}
            <div className="cd-right-card">
              <p className="cd-right-title">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3.25 4 8 4 8s4-4.75 4-8c0-2.21-1.79-4-4-4z" fill="#1163C7" opacity=".8"/>
                  <circle cx="7" cy="5" r="1.5" fill="white"/>
                </svg>
                Location
              </p>
              <p className="cd-address-text">{coach.address}</p>
              <div className="cd-map-wrap">
                <CustomMap latitude={coach.latitude} longitude={coach.longitude} />
              </div>
            </div>

            {/* Other locations */}
            {coach.multilocation.length > 0 && (
              <div className="cd-right-card">
                <p className="cd-right-title">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="#1163C7" strokeWidth="1.4"/>
                    <path d="M7 4v3l2 1.5" stroke="#1163C7" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Other Locations
                </p>
                {coach.multilocation.map((loc, i) => (
                  <a
                    key={i}
                    href={`https://www.google.com/maps?q=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cd-location-item"
                  >
                    <div className="cd-location-icon">
                      <img src={locationlogo} alt="location" />
                    </div>
                    <div className="cd-location-body">
                      <p className="cd-location-area">{loc.area}</p>
                      <p className="cd-location-hint">View on map</p>
                    </div>
                    <span className="cd-location-arrow">›</span>
                  </a>
                ))}
              </div>
            )}

            {/* Certificates */}
            {coach.certificates.length > 0 && (
              <div className="cd-right-card">
                <p className="cd-right-title">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="2.5" width="11" height="9" rx="1.5" stroke="#1163C7" strokeWidth="1.4"/>
                    <path d="M4 6h6M4 8.5h4" stroke="#1163C7" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Awards &amp; Certifications
                </p>
                <div className="cd-certs-list">
                  {coach.certificates.map((cert) => (
                    <div className="cd-cert-item" key={cert.id}>
                      <div className="cd-cert-icon">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/>
                          <path d="M5 13l1.5 4L9 15l2.5 2L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className="cd-cert-name">{cert.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enquire button */}
            <button
              className="cd-enquire-btn"
              onClick={() => setShowModal(true)}
              disabled={createQueryMutation.isLoading}
            >
              {createQueryMutation.isLoading ? "Sending…" : "Enquire Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Enquiry modal */}
      {showModal && (
        <EnquiryModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitEnquiry}
        />
      )}
    </div>
  );
}
