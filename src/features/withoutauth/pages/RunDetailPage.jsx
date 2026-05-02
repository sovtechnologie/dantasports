import React, { useEffect, useMemo, useState } from "react";
import "../Stylesheets/RunDetailPage.css";
import Cookies from "js-cookie";
import CustomMap from "../components/CustomMap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import RunImage from "../assets/RunImage.svg";
import { EventCalandar } from "../components/EventCalandar";
import TicketSelector from "../components/TicketSelector";
import CheckoutPricing from "../components/CheckoutPricing";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import TermsConditionsModal from "../components/TermsConditionsModal.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import OngoingEvents from "../components/OngoingEvents.jsx";
import Spinner from "../../../components/Spinner.jsx";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useFetchSingleEvent } from "../../../hooks/EventList/useFetchSingleEvent";
import { useFetchSingleEventPrice } from "../../../hooks/EventList/useFetchEventPrice";
import { useBanner } from "../../../hooks/useBanner";
import { Link, useParams } from "react-router-dom";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";
import { useBookEvent } from "../../../hooks/EventList/useBookEvent";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useLikeEvent } from "../../../hooks/favouriteEvent/useLikeEvent.js";
import { useUnlikeEvent } from "../../../hooks/favouriteEvent/useUnLikeEvent.js";
import HeartFilled from "../../../assets/svg-icons/heart-filled.svg";
import likeIcon from "../assets/icons/like.svg";

/* ── Data mapper ── */
const mapRunData = (d) => {
  const loc = d?.locations?.[0] || {};
  return {
    id: d?.id,
    type: d?.event_type,
    name: d?.event_title || "Unknown Run",
    location: loc.area || "Unknown Area",
    meetupPoints: Array.isArray(d?.locations) ? d.locations : [],
    about: d?.about_event || "",
    rating: parseFloat(d?.average_rating) || 0,
    startDate: d?.start_date,
    endDate: d?.end_date,
    reviewcount: d?.review_count || 0,
    timing: `${formatTime(d?.start_time || "")} – ${formatTime(d?.end_time || "")}`,
    address: (loc.full_address || "").trim().replace(/^,|,$/g, "") || "Not Available",
    images: Array.isArray(d?.event_gallery) && d.event_gallery.length
      ? d.event_gallery.map(img => img.image_url).filter(Boolean)
      : [RunImage],
    latitude: loc.lat || 0,
    longitude: loc.lng || 0,
    carrything: d?.things_to_carry || "",
    instruction: d?.instruction || "",
    rule_and_regulations: d?.rule_and_regulations || "",
    tickets: d?.ticket_need_for || "10 years & above",
    activity: d?.enter_layout || "Outdoor",
    kidsFriendly: d?.kids_friendly || "Yes",
    petFriendly: d?.pet_friendly || "No",
    difficulty: d?.difficulty_level || "Easy",
    favourite: d?.favourite,
    favourite_venue_id: d?.favourite_venue_id,
    event_video: d?.event_video || "",
    termsAndCondition: d?.terms_and_condition,
    cancelPolicy: d?.cancellation_policy,
    reviews: Array.isArray(d?.reviews)
      ? d.reviews.map(r => ({
          id: r.id, image: r.image,
          userName: r.user_name || "Anonymous",
          rating: r.rating || 0,
          comment: r.comment || "No comment",
          date: formatDate(r.createdAt) || new Date().toISOString().split("T")[0],
        }))
      : [],
  };
};

export default function RunDetailPage() {
  const { id } = useParams();
  const isLoggedIn = Boolean(Cookies.get("token"));
  const queryClient = useQueryClient();
  const auth = useSelector(s => s.auth);
  const userId = auth?.id;

  const [aboutExpanded, setAboutExpanded]   = useState(false);
  const [instrExpanded, setInstrExpanded]   = useState(false);
  const [rulesExpanded, setRulesExpanded]   = useState(false);
  const [carryExpanded, setCarryExpanded]   = useState(false);
  const [selectedArea, setSelectedArea]     = useState("");
  const [mapPosition, setMapPosition]       = useState({ lat: 0, lng: 0 });
  const [, setEventAddress]                 = useState("");
  const [selectedDate, setSelectedDate]     = useState(null);
  const [price, setPrice]                   = useState(0);
  const [totalPrice, setTotalPrice]         = useState(null);
  const [convenienceFee, setConvenienceFee] = useState(0);
  const [couponInfo, setCouponInfo]         = useState({ couponId: null, discountAmount: 0 });
  const [finalAmount, setFinalAmount]       = useState(null);
  const [tickets, setTickets]               = useState({ ticketsId: null, quantity: null });
  const [ticketCounts, setTicketCounts]     = useState([]);
  const [bookingDataValues, setBookingDataValues] = useState();
  const [isFavourite, setIsFavourite]       = useState(false);

  const likeEvent   = useLikeEvent();
  const unlikeEvent = useUnlikeEvent();

  const { data: EventDetails, isLoading } = useFetchSingleEvent(id, mapPosition.lat, mapPosition.lng);
  const event = Array.isArray(EventDetails?.result) && EventDetails.result.length > 0
    ? mapRunData(EventDetails.result[0])
    : null;

  const celebrities = EventDetails?.result?.[0]?.event_celebrities || [];
  const attendees   = EventDetails?.result?.[0]?.event_attendee   || [];

  const { data: eventPrice } = useFetchSingleEventPrice(id);
  const EventPrice = useMemo(() => eventPrice?.result || [], [eventPrice]);

  const { data: bannerData } = useBanner(3);
  const banners = bannerData?.result || [];

  const { mutate: CreateBookingPayment, isLoading: paymentLoading } = useCreateBookingPayment();
  const { mutate: BookEvent, isLoading: bookingLoading } = useBookEvent();

  /* Sync map */
  useEffect(() => {
    if (!event) return;
    setEventAddress(event.address || "");
    if (mapPosition.lat === 0 && mapPosition.lng === 0 && event.latitude && event.longitude) {
      setMapPosition({ lat: event.latitude, lng: event.longitude });
    }
  }, [event]);

  /* Favourite sync */
  useEffect(() => {
    if (event && typeof event.favourite === "number") {
      setIsFavourite(event.favourite === 1);
    }
  }, [event]);

  /* Price calculation */
  useEffect(() => {
    if (!price || price === 0) { setFinalAmount(0); setConvenienceFee(0); setTotalPrice(0); return; }
    const priceTot = Number(price);
    const convPct  = Number(EventPrice[0]?.convenience_fees || 0);
    const gstPct   = Number(EventPrice[0]?.gst || 0);
    const upto     = Number(EventPrice[0]?.upto ?? 0);
    const baseFare = (priceTot * convPct) / 100;
    const smaller  = baseFare < upto ? baseFare : upto;
    const gstAmt   = (smaller * gstPct) / 100;
    setConvenienceFee(smaller + gstAmt);
    setTotalPrice(priceTot + smaller + gstAmt);
    setBookingDataValues({ base_fare_amount: baseFare, base_fare_gst: gstAmt, total_price: priceTot + smaller + gstAmt, price, gst: gstPct, convenience_fee: convPct });
  }, [price, EventPrice]);

  const totalPassCount = ticketCounts.reduce((s, v) => s + v, 0);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: event?.name, text: `Check out: ${event?.name}`, url }); } catch {}
    } else {
      try { await navigator.clipboard.writeText(url); } catch {}
    }
  };

  const toggleFavourite = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!userId) { alert("Please login first."); return; }
    const eventId = Number(event?.id);
    const favouriteId = event?.favourite_venue_id;
    if (!eventId || isNaN(eventId)) return;
    if (isFavourite) {
      if (!favouriteId) return;
      unlikeEvent.mutate({ favouriteEventId: favouriteId }, {
        onSuccess: () => { setIsFavourite(false); queryClient.invalidateQueries(["SingleEvent", id]); },
      });
    } else {
      likeEvent.mutate({ eventId, userId: Number(userId) }, {
        onSuccess: () => { setIsFavourite(true); queryClient.invalidateQueries(["SingleEvent", id]); },
      });
    }
  };

  const handleBookEvent = () => {
    if (!isLoggedIn) { alert("Please log in to proceed."); return; }
    const isPaidEvent = EventDetails?.result?.[0]?.is_paid_event;
    BookEvent(
      { locationId: 1, bookingDate: selectedDate, eventId: id, tickets, isPaidEvent },
      {
        onSuccess: (data) => {
          const bookingId = data?.result;
          if (isPaidEvent === 0) {
            alert("Event booked successfully");
            setSelectedArea(""); setSelectedDate(null); setFinalAmount(null); setTotalPrice(0); setPrice(0); setTickets([]);
            return;
          }
          CreateBookingPayment(
            { bookingId, amount: finalAmount, type: event?.type, couponId: couponInfo?.couponId || null, discountAmount: couponInfo?.discountAmount || 0, convenienceFees: convenienceFee },
            {
              onSuccess: (pd) => {
                if (pd?.result) {
                  window.open(pd.result, "_blank", "noopener,noreferrer");
                  setSelectedArea(""); setSelectedDate(null); setFinalAmount(null); setTotalPrice(0); setPrice(0); setTickets([]);
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

  if (isLoading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spinner size={44} color="#1163c7" />
    </div>
  );
  if (!event) return (
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>Run event not found</div>
  );

  const dateRange = event.startDate && event.endDate
    ? `${new Date(event.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} – ${new Date(event.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`
    : "";

  return (
    <div className="rd-page">

      {/* ── Hero ── */}
      <div className="rd-hero">
        <div className="rd-hero-inner">
          <nav className="rd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/run">Run</Link><span>›</span>
            <span className="rd-bc-current">{event.name}</span>
          </nav>

          <div className="rd-hero-badges">
            <span className="rd-badge">Run</span>
            {event.activity && <span className="rd-badge">{event.activity}</span>}
            {event.kidsFriendly === "Yes" && <span className="rd-badge rd-badge--green">Kids Friendly</span>}
          </div>

          <h1 className="rd-hero-name">{event.name}</h1>

          <div className="rd-hero-meta">
            <div className="rd-hero-meta-item">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="rgba(255,255,255,.8)"/>
                <circle cx="6.5" cy="4.5" r="1.3" fill="rgba(255,255,255,.5)"/>
              </svg>
              {event.location}
            </div>
            {dateRange && (
              <div className="rd-hero-meta-item">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1.5" y="2" width="10" height="9.5" rx="1.5" stroke="rgba(255,255,255,.8)" strokeWidth="1.3"/>
                  <path d="M1.5 5h10M4.5 1v2M8.5 1v2" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {dateRange}
              </div>
            )}
            {event.timing && (
              <div className="rd-hero-meta-item">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,.8)" strokeWidth="1.3"/>
                  <path d="M6.5 4v2.5l1.5 1" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {event.timing}
              </div>
            )}
            <div className="rd-hero-rating">
              <span className="rd-star">★</span>
              <span>{event.rating.toFixed(1)}</span>
              <span className="rd-reviews">({event.reviewcount} reviews)</span>
            </div>
          </div>

          <div className="rd-hero-actions">
            <button className="rd-action-btn" onClick={handleShare} aria-label="Share">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4.4 6.2l5.2-3M4.4 7.8l5.2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Share
            </button>
            <button
              className="rd-action-btn"
              onClick={toggleFavourite}
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <img
                src={isFavourite ? HeartFilled : likeIcon}
                alt=""
                style={{ width: 14, height: 14, filter: isFavourite ? "none" : "brightness(10)" }}
              />
              {isFavourite ? "Saved" : "Save"}
            </button>
            {event.event_video && (
              <button className="rd-action-btn" onClick={() => window.open(event.event_video, "_blank")} aria-label="Watch video">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5.5 5l4 2-4 2V5z" fill="currentColor"/>
                </svg>
                Watch Video
              </button>
            )}
          </div>
        </div>

        <div className="rd-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="rd-body">
        <div className="rd-layout">

          {/* ══ LEFT ══ */}
          <div className="rd-left">

            {/* Carousel */}
            <div className="rd-carousel">
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
                  <button className="venue-icon-btns" onClick={toggleFavourite} aria-label="Favourite">
                    <img src={isFavourite ? HeartFilled : likeIcon} alt="" style={{ width: 16, height: 16 }} />
                  </button>
                </div>
                {event.images.map((img, i) => (
                  <SwiperSlide key={i} className="event-swiperslide">
                    <img src={img} alt={`${event.name} — photo ${i + 1}`} className="event-swiperslide-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* About */}
            {event.about && (
              <div className="rd-card" style={{ animationDelay: ".1s" }}>
                <h2 className="rd-card-title">About the Run</h2>
                <p className="rd-text">
                  {aboutExpanded ? event.about : `${event.about.substring(0, 220)}${event.about.length > 220 ? "…" : ""}`}
                </p>
                {event.about.length > 220 && (
                  <button className="rd-read-more" onClick={() => setAboutExpanded(p => !p)}>
                    {aboutExpanded ? "Read less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>
            )}

            {/* Event Guide */}
            <div className="rd-card" style={{ animationDelay: ".13s" }}>
              <h2 className="rd-card-title">Run Guide</h2>
              <div className="rd-guide-grid">
                {[
                  { label: "Tickets For",   value: event.tickets },
                  { label: "Activity",      value: event.activity },
                  { label: "Kids Friendly", value: event.kidsFriendly },
                  { label: "Pet Friendly",  value: event.petFriendly, no: event.petFriendly === "No" },
                  { label: "Difficulty",    value: event.difficulty },
                  { label: "Timing",        value: event.timing },
                ].filter(i => i.value).map((item, i) => (
                  <div className="rd-guide-item" key={i}>
                    <p className="rd-guide-label">{item.label}</p>
                    <p className={`rd-guide-value${item.no ? " no" : ""}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions + Things to Carry */}
            <div className="rd-two-col">
              {event.instruction && (
                <div className="rd-card" style={{ animationDelay: ".16s" }}>
                  <h2 className="rd-card-title">Instructions</h2>
                  <p className="rd-text">
                    {instrExpanded ? event.instruction : `${event.instruction.substring(0, 180)}${event.instruction.length > 180 ? "…" : ""}`}
                  </p>
                  {event.instruction.length > 180 && (
                    <button className="rd-read-more" onClick={() => setInstrExpanded(p => !p)}>
                      {instrExpanded ? "Read less ↑" : "Read more ↓"}
                    </button>
                  )}
                </div>
              )}

              {event.carrything && (
                <div className="rd-card" style={{ animationDelay: ".18s" }}>
                  <h2 className="rd-card-title">Things to Carry</h2>
                  <p className="rd-text">
                    {carryExpanded ? event.carrything : `${event.carrything.substring(0, 180)}${event.carrything.length > 180 ? "…" : ""}`}
                  </p>
                  {event.carrything.length > 180 && (
                    <button className="rd-read-more" onClick={() => setCarryExpanded(p => !p)}>
                      {carryExpanded ? "Read less ↑" : "Read more ↓"}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Rules & Regulations */}
            {event.rule_and_regulations && (
              <div className="rd-card" style={{ animationDelay: ".2s" }}>
                <h2 className="rd-card-title">Rules &amp; Regulations</h2>
                <p className="rd-text">
                  {rulesExpanded ? event.rule_and_regulations : `${event.rule_and_regulations.substring(0, 220)}${event.rule_and_regulations.length > 220 ? "…" : ""}`}
                </p>
                {event.rule_and_regulations.length > 220 && (
                  <button className="rd-read-more" onClick={() => setRulesExpanded(p => !p)}>
                    {rulesExpanded ? "Read less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>
            )}

            {/* Participants + Organiser */}
            {(celebrities.length > 0 || attendees.length > 0) && (
              <div className="rd-two-col">
                {celebrities.length > 0 && (
                  <div className="rd-card" style={{ animationDelay: ".22s" }}>
                    <h2 className="rd-card-title">Participants</h2>
                    <div className="rd-participants-row">
                      {celebrities.map(p => (
                        <div className="rd-participant" key={p.id}>
                          <img src={p.image} alt={p.name} className="rd-participant-avatar"
                            onError={e => { e.target.style.display = "none"; }} />
                          <p className="rd-participant-name">{p.name}</p>
                          <p className="rd-participant-title">{p.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {attendees.length > 0 && (
                  <div className="rd-card" style={{ animationDelay: ".24s" }}>
                    <h2 className="rd-card-title">Organiser Contact</h2>
                    <div className="rd-contact-scroll">
                      {attendees.map(c => (
                        <div className="rd-contact-item" key={c.id}>
                          {c.email && <p style={{ margin: "0 0 4px" }}>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${c.email}`}>{c.email}</a>
                          </p>}
                          {c.support_contact && <p style={{ margin: 0 }}>
                            <strong>Phone:</strong>{" "}
                            <a href={`tel:${c.support_contact}`}>{c.support_contact}</a>
                          </p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Policies */}
            <div className="rd-policy-row" style={{ animationDelay: ".26s" }}>
              <button className="rd-policy-card" type="button" data-bs-toggle="modal" data-bs-target="#RunTermsModal">
                <span className="rd-policy-label">Terms &amp; Conditions</span>
                <span className="rd-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <button className="rd-policy-card" type="button" data-bs-toggle="modal" data-bs-target="#RunCancelModal">
                <span className="rd-policy-label">Cancellation Policy</span>
                <span className="rd-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Reviews */}
            {event.reviews.length > 0 && (
              <div className="rd-reviews-section">
                <h2 className="rd-reviews-title">Reviews</h2>
                <EventReviewSlider event={{ review: event.reviews }} />
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
          <div className="rd-right">
            <div className="rd-booking-panel">
              <div className="rd-panel-header">
                <div>
                  <p className="rd-panel-title">Book Tickets</p>
                  {dateRange && <p className="rd-panel-dates">{dateRange}</p>}
                </div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="21" rx="3" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"/>
                  <path d="M2 11h24M9 2v6M19 2v6" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="rd-panel-body">
                {/* Location */}
                <div className="rd-location-block">
                  <p className="rd-location-title">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="#1163C7" opacity=".8"/>
                      <circle cx="6.5" cy="4.5" r="1.3" fill="white"/>
                    </svg>
                    Location
                  </p>
                  <p className="rd-location-text">{event.address}</p>
                  <div className="rd-map-wrap">
                    <CustomMap latitude={mapPosition.lat} longitude={mapPosition.lng} />
                  </div>
                </div>

                {/* Meetup point */}
                {event.meetupPoints.length > 0 && (
                  <div>
                    <p style={{ fontFamily: "Lato,sans-serif", fontWeight: 600, fontSize: 13, color: "#0d1b2a", margin: "0 0 8px" }}>
                      Select Meetup Point
                    </p>
                    <select
                      className="rd-meetup-select"
                      value={selectedArea || ""}
                      onChange={e => {
                        const area = e.target.value;
                        setSelectedArea(area);
                        const pt = event.meetupPoints.find(p => p.area === area);
                        if (pt) {
                          setMapPosition({ lat: pt.lat, lng: pt.lng });
                          setEventAddress(pt.full_address || `${pt.area}, ${pt.city}`);
                        }
                      }}
                    >
                      {event.meetupPoints.map((item, i) => (
                        <option key={i} value={item.area}>{item.area}, {item.city}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Date */}
                <EventCalandar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  startDateProp={event.startDate}
                  endDateProp={event.endDate}
                  eventCalendar={EventDetails?.result?.[0]?.event_calendar}
                  eventDates={EventDetails?.result?.[0]?.event_dates || []}
                />

                {/* Tickets */}
                <TicketSelector
                  tickets={EventPrice[0]?.tickets}
                  counts={ticketCounts}
                  onChange={setTicketCounts}
                  setPrice={setPrice}
                  setTickets={setTickets}
                  disabled={!selectedDate}
                />
                {!selectedDate && (
                  <p style={{ color: "#dc2626", fontSize: 12, margin: "-8px 0 0" }}>
                    Please select a date first
                  </p>
                )}

                {/* Pricing */}
                <CheckoutPricing
                  priceLabel="Tickets Price"
                  totalPrice={totalPrice}
                  convenienceFee={totalPrice ? convenienceFee : 0}
                  bookingData={bookingDataValues}
                  count={totalPassCount}
                  setCouponInfo={setCouponInfo}
                  price={price}
                  type={event?.type}
                  venueId={id}
                  setFinalAmount={setFinalAmount}
                />

                {/* Book button */}
                <button
                  className="rd-book-btn"
                  onClick={handleBookEvent}
                  disabled={bookingLoading || paymentLoading}
                >
                  {bookingLoading || paymentLoading ? "Processing…" : "Book Tickets"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      <div className="modal fade" id="RunTermsModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ fontFamily: "Lato,sans-serif", fontWeight: 700, color: "#172A39" }}>
                Terms &amp; Conditions
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <TermsConditionsModal termsText={event.termsAndCondition} />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="RunCancelModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content custom_modal">
            <div className="modal-header border-0">
              <h5 className="modal-title" style={{ fontFamily: "Lato,sans-serif", fontWeight: 700, color: "#172A39" }}>
                Cancellation Policy
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <CancellationPolicy policyText={event.cancelPolicy} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
