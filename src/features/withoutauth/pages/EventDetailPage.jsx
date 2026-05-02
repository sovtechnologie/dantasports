import React, { useEffect, useMemo, useState } from "react";
import "../Stylesheets/EventDetailPage.css";
import Cookies from "js-cookie";
import CustomMap from "../components/CustomMap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import RunImage from "../assets/EventImage1.svg";
import { EventCalandar } from "../components/EventCalandar";
import TicketSelector from "../components/TicketSelector";
import CheckoutPricing from "../components/CheckoutPricing";
import { useFetchSingleEvent } from "../../../hooks/EventList/useFetchSingleEvent";
import { useBanner } from "../../../hooks/useBanner";
import { useFetchSingleEventPrice } from "../../../hooks/EventList/useFetchEventPrice";
import { useBookEvent } from "../../../hooks/EventList/useBookEvent";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "swiper/css";
import "swiper/css/pagination";
import { Link, useParams } from "react-router-dom";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { Container } from "react-bootstrap";
import TermsConditionsModal from "../components/TermsConditionsModal.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import OngoingEvents from "../components/OngoingEvents.jsx";
import Spinner from "../../../components/Spinner.jsx";

/* ── Data mapper ── */
const mapEventData = (d) => {
  const loc = d?.locations?.[0] || {};
  return {
    name: d?.event_title || "Unknown Event",
    type: d?.event_type,
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
    tickets: d?.ticket_need_for || "10 years & above",
    activity: d?.enter_layout || "Outdoor",
    kidsFriendly: d?.kids_friendly || "Yes",
    petFriendly: d?.pet_friendly || "No",
    difficulty: d?.difficulty_level || "Easy",
    termsAndCondition: d?.terms_and_condition,
    cancelPolicy: d?.cancellation_policy,
    event_video: d?.event_video || "",
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

const DIFF_LABEL = { 0: "Moderate", 1: "Easy", 2: "Difficult" };

export default function EventDetailPage() {
  const { id } = useParams();
  const isLoggedIn = Boolean(Cookies.get("token"));

  const [aboutExpanded, setAboutExpanded]   = useState(false);
  const [instrExpanded, setInstrExpanded]   = useState(false);
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

  const { data: EventDetails, isLoading } = useFetchSingleEvent(id, mapPosition.lat, mapPosition.lng);
  const event = Array.isArray(EventDetails?.result) && EventDetails.result.length > 0
    ? mapEventData(EventDetails.result[0])
    : null;

  const celebrities = EventDetails?.result?.[0]?.event_celebrities || [];
  const attendees   = EventDetails?.result?.[0]?.event_attendee   || [];

  const { data: eventPrice } = useFetchSingleEventPrice(id);
  const EventPrice = useMemo(() => eventPrice?.result || [], [eventPrice]);

  const { data: bannerData } = useBanner(3);
  const banners = bannerData?.result || [];

  const { mutate: CreateBookingPayment, isLoading: paymentLoading } = useCreateBookingPayment();
  const { mutate: BookEvent, isLoading: bookingLoading } = useBookEvent();

  /* Sync map position */
  useEffect(() => {
    if (!event) return;
    setEventAddress(event.address || "");
    if (mapPosition.lat === 0 && mapPosition.lng === 0 && event.latitude && event.longitude) {
      setMapPosition({ lat: event.latitude, lng: event.longitude });
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
    const conv     = smaller + gstAmt;
    setConvenienceFee(conv);
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

  const handleBookEvent = () => {
    if (!isLoggedIn) { alert("Please log in to proceed."); return; }
    BookEvent(
      { locationId: 1, bookingDate: selectedDate, eventId: id, tickets },
      {
        onSuccess: (data) => {
          const bookingId = data?.result;
          CreateBookingPayment(
            { bookingId, amount: finalAmount, type: event?.type, couponId: couponInfo?.couponId || null, discountAmount: couponInfo?.discountAmount || 0, convenienceFees: convenienceFee },
            {
              onSuccess: (pd) => {
                if (pd?.result) {
                  window.open(pd.result, "_blank", "noopener,noreferrer");
                  setSelectedArea(""); setSelectedDate(null); setFinalAmount(null);
                  setTotalPrice(0); setPrice(0); setTickets([]);
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
    <div style={{ padding: 40, textAlign: "center", color: "#dc2626" }}>Event not found</div>
  );

  const diffLabel = DIFF_LABEL[event.difficulty] || event.difficulty || "Easy";
  const dateRange = event.startDate && event.endDate
    ? `${new Date(event.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} – ${new Date(event.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`
    : "";

  return (
    <div className="ed-page">

      {/* ── Hero ── */}
      <div className="ed-hero">
        <div className="ed-hero-inner">
          {/* Breadcrumb */}
          <nav className="ed-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/events">Events</Link><span>›</span>
            <span className="ed-bc-current">{event.name}</span>
          </nav>

          {/* Badges */}
          <div className="ed-hero-badges">
            {diffLabel && <span className="ed-badge ed-badge--orange">{diffLabel}</span>}
            {event.activity && <span className="ed-badge">{event.activity}</span>}
            {event.kidsFriendly === "Yes" && <span className="ed-badge ed-badge--green">Kids Friendly</span>}
          </div>

          {/* Name */}
          <h1 className="ed-hero-name">{event.name}</h1>

          {/* Meta */}
          <div className="ed-hero-meta">
            <div className="ed-hero-meta-item">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="rgba(255,255,255,.8)"/>
                <circle cx="6.5" cy="4.5" r="1.3" fill="rgba(255,255,255,.5)"/>
              </svg>
              {event.location}
            </div>
            {dateRange && (
              <div className="ed-hero-meta-item">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="1.5" y="2" width="10" height="9.5" rx="1.5" stroke="rgba(255,255,255,.8)" strokeWidth="1.3"/>
                  <path d="M1.5 5h10M4.5 1v2M8.5 1v2" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {dateRange}
              </div>
            )}
            {event.timing && (
              <div className="ed-hero-meta-item">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,255,255,.8)" strokeWidth="1.3"/>
                  <path d="M6.5 4v2.5l1.5 1" stroke="rgba(255,255,255,.8)" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                {event.timing}
              </div>
            )}
            <div className="ed-hero-rating">
              <span className="ed-star">★</span>
              <span>{event.rating.toFixed(1)}</span>
              <span className="ed-reviews">({event.reviewcount} reviews)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="ed-hero-actions">
            <button className="ed-action-btn" onClick={handleShare} aria-label="Share">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4.4 6.2l5.2-3M4.4 7.8l5.2 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Share
            </button>
            {event.event_video && (
              <button className="ed-action-btn" onClick={() => window.open(event.event_video, "_blank")} aria-label="Watch video">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="2.5" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5.5 5l4 2-4 2V5z" fill="currentColor"/>
                </svg>
                Watch Video
              </button>
            )}
          </div>
        </div>

        {/* Wave */}
        <div className="ed-hero-wave">
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f7f9fb"/>
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="ed-body">
        <div className="ed-layout">

          {/* ══ LEFT ══ */}
          <div className="ed-left">

            {/* Carousel */}
            <div className="ed-carousel">
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
                {event.images.map((img, i) => (
                  <SwiperSlide key={i} className="event-swiperslide">
                    <img src={img} alt={`${event.name} — photo ${i + 1}`} className="event-swiperslide-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* About */}
            {event.about && (
              <div className="ed-card" style={{ animationDelay: ".1s" }}>
                <h2 className="ed-card-title">About the Event</h2>
                <p className="ed-text">
                  {aboutExpanded ? event.about : `${event.about.substring(0, 220)}${event.about.length > 220 ? "…" : ""}`}
                </p>
                {event.about.length > 220 && (
                  <button className="ed-read-more" onClick={() => setAboutExpanded(p => !p)}>
                    {aboutExpanded ? "Read less ↑" : "Read more ↓"}
                  </button>
                )}
              </div>
            )}

            {/* Event Guide */}
            <div className="ed-card" style={{ animationDelay: ".15s" }}>
              <h2 className="ed-card-title">Event Guide</h2>
              <div className="ed-guide-grid">
                {[
                  { label: "Tickets For",   value: event.tickets },
                  { label: "Activity",      value: event.activity },
                  { label: "Kids Friendly", value: event.kidsFriendly },
                  { label: "Pet Friendly",  value: event.petFriendly, no: event.petFriendly === "No" },
                  { label: "Difficulty",    value: diffLabel },
                  { label: "Timing",        value: event.timing },
                ].filter(i => i.value).map((item, i) => (
                  <div className="ed-guide-item" key={i}>
                    <p className="ed-guide-label">{item.label}</p>
                    <p className={`ed-guide-value${item.no ? " no" : ""}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions + Things to Carry */}
            <div className="ed-two-col">
              {event.instruction && (
                <div className="ed-card" style={{ animationDelay: ".18s" }}>
                  <h2 className="ed-card-title">Instructions</h2>
                  <p className="ed-text">
                    {instrExpanded ? event.instruction : `${event.instruction.substring(0, 180)}${event.instruction.length > 180 ? "…" : ""}`}
                  </p>
                  {event.instruction.length > 180 && (
                    <button className="ed-read-more" onClick={() => setInstrExpanded(p => !p)}>
                      {instrExpanded ? "Read less ↑" : "Read more ↓"}
                    </button>
                  )}
                </div>
              )}

              {event.carrything && (
                <div className="ed-card" style={{ animationDelay: ".2s" }}>
                  <h2 className="ed-card-title">Things to Carry</h2>
                  <ol className="ed-carry-list">
                    {event.carrything.split("\n").filter(Boolean).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Participants + Organiser */}
            {(celebrities.length > 0 || attendees.length > 0) && (
              <div className="ed-two-col">
                {celebrities.length > 0 && (
                  <div className="ed-card" style={{ animationDelay: ".22s" }}>
                    <h2 className="ed-card-title">Participants</h2>
                    <div className="ed-participants-row">
                      {celebrities.map(p => (
                        <div className="ed-participant" key={p.id}>
                          <img src={p.image} alt={p.name} className="ed-participant-avatar"
                            onError={e => { e.target.style.display = "none"; }} />
                          <p className="ed-participant-name">{p.name}</p>
                          <p className="ed-participant-title">{p.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {attendees.length > 0 && (
                  <div className="ed-card" style={{ animationDelay: ".24s" }}>
                    <h2 className="ed-card-title">Organiser Contact</h2>
                    <div className="ed-contact-scroll">
                      {attendees.map(c => (
                        <div className="ed-contact-item" key={c.id}>
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
            <div className="ed-policy-row" style={{ animationDelay: ".26s" }}>
              <button className="ed-policy-card" type="button" data-bs-toggle="modal" data-bs-target="#TermsModal">
                <span className="ed-policy-label">Terms &amp; Conditions</span>
                <span className="ed-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              <button className="ed-policy-card" type="button" data-bs-toggle="modal" data-bs-target="#CancelModal">
                <span className="ed-policy-label">Cancellation Policy</span>
                <span className="ed-policy-arrow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </div>

            {/* Reviews */}
            {event.reviews.length > 0 && (
              <div className="ed-reviews-section">
                <h2 className="ed-reviews-title">Reviews</h2>
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
          <div className="ed-right">
            <div className="ed-booking-panel">
              {/* Header */}
              <div className="ed-panel-header">
                <div>
                  <p className="ed-panel-title">Book Tickets</p>
                  {dateRange && <p className="ed-panel-dates">{dateRange}</p>}
                </div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="21" rx="3" stroke="rgba(255,255,255,.6)" strokeWidth="1.5"/>
                  <path d="M2 11h24M9 2v6M19 2v6" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="ed-panel-body">
                {/* Location */}
                <div className="ed-location-block">
                  <p className="ed-location-title">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1C4.57 1 3 2.57 3 4.5c0 2.8 3.5 7 3.5 7S10 7.3 10 4.5C10 2.57 8.43 1 6.5 1z" fill="#1163C7" opacity=".8"/>
                      <circle cx="6.5" cy="4.5" r="1.3" fill="white"/>
                    </svg>
                    Location
                  </p>
                  <p className="ed-location-text">{event.address}</p>
                  <div className="ed-map-wrap">
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
                      className="ed-meetup-select"
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

                {/* Pricing */}
                <CheckoutPricing
                  priceLabel="Tickets Price"
                  totalPrice={totalPrice}
                  convenienceFee={totalPrice ? convenienceFee : 0}
                  bookingData={bookingDataValues}
                  count={totalPassCount}
                  setCouponInfo={setCouponInfo}
                  price={price}
                  type={2}
                  venueId={id}
                  setFinalAmount={setFinalAmount}
                />

                {/* Book button */}
                <button
                  className="ed-book-btn"
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
      <div className="modal fade" id="TermsModal" tabIndex="-1" aria-hidden="true">
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

      <div className="modal fade" id="CancelModal" tabIndex="-1" aria-hidden="true">
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
