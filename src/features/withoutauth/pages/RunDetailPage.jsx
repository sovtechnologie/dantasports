import React, { useEffect, useState } from "react";
import "../Stylesheets/RunDetailPage.css";
import "../Stylesheets/EventDetails.css";
import "../Stylesheets/CoachDetailPage.css";
import Cookies from "js-cookie";
import ReviewCard from "../components/ReviewCard";
import Gallery from "../components/Gallery";
import CustomMap from "../components/CustomMap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import RunImage from "../assets/RunImage.svg";
import { EventCalandar } from "../components/EventCalandar";
import TicketSelector from "../components/TicketSelector";
import CheckoutPricing from "../components/CheckoutPricing";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import sub from "../../withoutauth/assets/icons/sub.svg";
import add from "../../withoutauth/assets/icons/add.svg";
import ShareIcon from "../assets/VenueDetailIcon/share.svg";
import LikeIcon from "../assets/VenueDetailIcon/linke.svg";
import youtube from "../assets/VenueDetailIcon/youtube.svg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchSingleEvent } from "../../../hooks/EventList/useFetchSingleEvent";
import { useFetchSingleEventPrice } from "../../../hooks/EventList/useFetchEventPrice";
import { useBanner } from "../../../hooks/useBanner";
import { useParams } from "react-router-dom";
import { formatTime } from "../../../utils/formatTime";
import { formatDate } from "../../../utils/formatDate";
import { useCreateBookingPayment } from "../../../hooks/Payments/useCreateBookingPayement";
import { useBookEvent } from "../../../hooks/EventList/useBookEvent";
import { Container } from "react-bootstrap";
import GalleryComponent from "../components/GalleryComponent ";
import arrow from "../assets/icons/arrow.svg";
import CancellationPolicy from "../components/CancellationPolicy.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import TermsAndConditions from "../../../pages/TermsAndConditions.jsx";
import TermsConditionsModal from "../components/TermsConditionsModal.jsx";
import EventReviewSlider from "../components/EventReviewSlider.jsx";
import OngoingEvents from "../components/OngoingEvents.jsx";

const initialTickets = [
  { id: 1, label: "5Km Run", price: 999 },
  { id: 2, label: "10Km Run", price: 999 },
  { id: 3, label: "15Km Run", price: 999 },
  { id: 4, label: "20Km Run", price: 999 },
];

const mapEventData = (apiData) => {
  return {
    type: apiData?.event_type,
    name: apiData?.event_title || "Unknown Venue",
    location: apiData?.locations[0]?.area || "Unknown Area",
    meetupPoints: apiData?.locations || "",
    about: apiData?.about_event || "No description available for this venue.",
    rating: parseFloat(apiData?.average_rating) || 0,
    startDate: apiData?.start_date,
    endDate: apiData?.end_date,
    reviewcount: apiData?.review_count || 0,
    timing: `${formatTime(apiData?.start_time || "")} - ${formatTime(apiData?.end_time || "")}`,
    address:
      `${apiData?.locations[0]?.full_address || ""}`
        .trim()
        .replace(/^,|,$/g, "") || "Not Available",
    images: Array.isArray(apiData?.event_gallery)
      ? apiData.event_gallery.map((img) => img.image_url)
      : [RunImage, RunImage, RunImage, RunImage],
    gallery: Array.isArray(apiData?.event_gallery)
      ? apiData?.event_gallery
      : [RunImage, RunImage, RunImage, RunImage],
    sports: Array.isArray(apiData?.sports)
      ? apiData.sports.map((sport) => ({
        sportId: sport.id,
        name: sport.name,
        icon: sport.image,
        categoryId: sport.category_id,
      }))
      : "",
    latitude: apiData?.locations[0]?.lat || 0,
    longitude: apiData?.locations[0]?.lng || 0,
    carrything: apiData?.things_to_carry,
    instruction: apiData?.instruction,
    tickets: apiData?.ticket_need_for || "10 years & above",
    activity: apiData?.enter_layout || "Outdoor",
    kidsFriendly: apiData?.kids_friendly || "Yes",
    petFriendly: apiData?.pet_friendly || "No",
    difficulty: "easy",
    favourite: apiData?.favourite,
    favourite_venue_id: apiData?.favourite_venue_id,
    rule_and_regulations: apiData?.rule_and_regulations,
    termsAndCondition: apiData?.terms_and_condition,
    cancelPolicy: apiData?.cancellation_policy,
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
      : [{ comment: "Not Available" }], // Default to first 5 reviews if not available
  };
};

export default function EventDetailPage() {
  const { id } = useParams();
  const isLoggedIn = Boolean(Cookies.get("token"));
  const [expandedSection, setExpandedSection] = useState(null);
  const [convenienceFee, setConvenienceFee] = useState(0);
  const [selectedArea, setSelectedArea] = useState("");
  const [locationId, setLocationId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [finalAmount, setFinalAmount] = useState(null);
  const [bookingDataValues, setBookingDataValues] = useState();
  const [totalPrice, setTotalPrice] = useState(null);
  const [mapPosition, setMapPosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [eventAddress, setEventAddress] = useState("");


  console.log("totalPricetotalPrice", totalPrice);
  const [tickets, setTickets] = useState({ ticketsId: null, quantity: null });

  const {
    data: EventDetails,
    isLoading: eventLoading,
    error: eventError,
  } = useFetchSingleEvent(id);
  const event =
    Array.isArray(EventDetails?.result) && EventDetails.result.length > 0
      ? mapEventData(EventDetails.result[0])
      : "";
  const type = event?.type;

  const toggleSection = (sectionName) => {
    setExpandedSection((prev) => (prev === sectionName ? null : sectionName));
  };

  const [ticketCounts, setTicketCounts] = useState(
    Array(initialTickets.length).fill(0)
  );
  console.log("run ticket", tickets);

  const handleTicketChange = (updatedCounts) => {
    setTicketCounts(updatedCounts);
    console.log("Ticket Counts:", updatedCounts);
  };

  const { mutate: CreateBookingPayment, isLoading: paymentLoading } =
    useCreateBookingPayment();
  const {
    mutate: BookEvent,
    isLoading: bookingLoading,
    error: bookingError,
  } = useBookEvent();

  const [start, setStart] = useState(0);
  const prev = () => setStart((prev) => Math.max(prev - 1, 0));
  const next = () =>
    setStart((prev) =>
      Math.min(prev + 1, event?.reviews.length - visibleCount)
    );

  const visibleCount =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 3 : 3;

  const {
    data: eventPrice,
    isLoading: eventPriceLoading,
    error: eventPriceError,
  } = useFetchSingleEventPrice(id);
  const EventPrice = eventPrice?.result || [];
  const ConvenienceFee = Number(EventPrice[0]?.convension_fees ?? 0);

  console.log("in event details price", EventPrice);
  const {
    data: bannerData,
    isLoading: Bannerloading,
    error: BannerError,
  } = useBanner(3);

  const banners = bannerData?.result || [];

  const handleBookEvent = () => {
    if (!isLoggedIn) {
      alert("Please log in to proceed.");
      return;
    }

    const bookingPayload = {
      locationId: 1,
      bookingDate: selectedDate,
      eventId: id,
      tickets: tickets,
    };

    BookEvent(bookingPayload, {
      onSuccess: (data) => {
        const bookingId = data?.result;
        // If your API returns "insertId" or something else, change this accordingly
        console.log("My Booking Id", bookingId);

        // Call createPayment with that bookingId
        CreateBookingPayment(
          {
            bookingId,
            amount: finalAmount, // example amount
            type: type, // or "UPI" etc.
          },
          {
            onSuccess: (paymentData) => {
              console.log("Payment created:", paymentData);

              // If API returns paymentUrl, redirect
              if (paymentData?.result) {
                window.open(
                  paymentData.result,
                  "_blank",
                  "noopener,noreferrer"
                );

                // reset the field
                setSelectedArea("");
                setSelectedDate(null);
                setFinalAmount(null);
                setTotalPrice(0);
                setTickets([]);

              }
            },
            onError: (error) => {
              alert("Payment creation failed: " + (error.message || ""));
            },
          }
        );
      },
      onError: (error) => {
        alert("Booking failed: " + (error.message || ""));
      },
    });
  };

  useEffect(() => {
    if (!totalPrice || totalPrice === 0) {
      setFinalAmount(0);
      return;
    }

    const price = Number(totalPrice);

    const conveniencePercent = Number(EventPrice[0]?.convenience_fees);
    const gstPercent = Number(EventPrice[0]?.gst);
    const upto = Number(EventPrice[0]?.upto ?? 0);

    const base_fare_amount = (price * conveniencePercent) / 100;

    const smallerValue = base_fare_amount < upto ? base_fare_amount : upto;

    const base_fare_gst = (smallerValue * gstPercent) / 100;


    const total_price = price + smallerValue + base_fare_gst;

    setFinalAmount(total_price);


    setBookingDataValues({
      base_fare_amount,
      base_fare_gst,
      total_price,
      price,
      gst: gstPercent,
      convenience_fee: conveniencePercent,
    });

  }, [totalPrice, EventPrice]);

  const totalPassCount = ticketCounts.reduce((sum, value) => sum + value, 0);

  useEffect(() => {
    console.log("Event received:", event);

    setEventAddress((prev) => {
      if (!prev) {
        return event?.address || "";
      }
      return prev;
    });

    if (
      mapPosition.lat === 0 &&
      mapPosition.lng === 0 &&
      event?.latitude &&
      event?.longitude
    ) {
      console.log("Setting default map position from event:", {
        lat: event.latitude,
        lng: event.longitude
      });

      setMapPosition({
        lat: event.latitude,
        lng: event.longitude,
      });
    }
  }, [event]);



  return (
    <>
      <section style={{ background: "#f1f3f2" }} className="pb-lg-5 pb-3">
        <section className="details_page_header">
          <div className="container">
            <div className="breadcrumb">
              <span>
                Run &gt; {event.location} &gt; {event.name}
              </span>
            </div>

            <h1 className="event-name">{event.name}</h1>
            <div className="location-rating">
              <span>{event.location}</span>
              <span className="star" style={{ marginLeft: "20px" }}>
                ★
              </span>{" "}
              <span
                className="light-text"
                style={{ marginLeft: "5px", marginRight: "5px" }}
              >
                {Math.floor(event.rating)}
              </span>{" "}
              <span>({event?.reviewcount} ratings)</span>
              <span className="ps-2 text_blue">
                <a href="#">Rate Run</a>
              </span>
            </div>
          </div>
        </section>
        <Container>
          <div className="event-details-container">
            <div className="event-wrapper row">
              <div className="event-left col-lg-8 ">
                <div className="event-image-carosal">
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
                    {event?.images?.map((img, index) => (
                      <SwiperSlide key={index} className="event-swiperslide">
                        <img
                          src={img}
                          alt={`event-image-${index}`}
                          className="event-swiperslide-img"
                        />
                      </SwiperSlide>
                    ))}
                    <div className="venue-icon-topwrapper">
                      <button className="venue-icon-btns">
                        <img src={ShareIcon} alt="share" />
                      </button>
                      <button className="venue-icon-btns">
                        <img src={LikeIcon} alt="like" className="like-icon" />
                      </button>
                       <button className="venue-icon-btns" onClick={() => window.open(event.event_video)}>
                                            <img src={youtube} alt="share" />
                                          </button>
                    </div>
                  </Swiper>
                </div>

                <div className="event-section">
                  <div className="sports-header">
                    <h2>About the Event</h2>
                  </div>
                  <div className="event-description">
                    {expandedSection === "about"
                      ? event?.about
                      : `${event?.about?.substring(0, 230)}...`}
                  </div>
                  <button
                    onClick={() => toggleSection("about")}
                    className="read-more-btn"
                  >
                    {expandedSection === "about" ? "Read less" : "Read more"}
                  </button>
                </div>

                <div className="event-section">
                  <div className="sports-header">
                    <h2>Event Guide</h2>
                  </div>
                  <div className="event-guide-content">
                    <div className="guide-item">
                      <div className="guide-label">Tickets Needed For</div>
                      <div className="guide-value">{event?.tickets}</div>
                    </div>
                    <div className="guide-item">
                      <div className="guide-label">Activity</div>
                      <div className="guide-value">{event?.activity}</div>
                    </div>
                    <div className="guide-item">
                      <div className="guide-label">Kids Friendly?</div>
                      <div className="guide-value">{event?.kidsFriendly}</div>
                    </div>
                    <div className="guide-item">
                      <div className="guide-label">Pet Friendly?</div>
                      <div
                        className={`guide-value ${!event?.petFriendly ? "no" : ""}`}
                      >
                        {event?.petFriendly}
                      </div>
                    </div>
                    <div className="guide-item">
                      <div className="guide-label">Difficulty?</div>
                      <div className="guide-value">{event?.difficulty}</div>
                    </div>
                  </div>
                </div>

                <div className="event-section">
                  <div className="event-heading">
                    <strong>Instruction</strong>
                  </div>
                  <div
                    className="event-description"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {expandedSection === "instruction"
                      ? event?.instruction
                      : `${event?.instruction?.substring(0, 200)}...`}
                  </div>
                  <button
                    onClick={() => toggleSection("instruction")}
                    className="read-more-btn"
                  >
                    {expandedSection === "instruction"
                      ? "Read less"
                      : "Read more"}
                  </button>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="event-section mt-3">
                      <div className="event-heading">
                        <strong>Things to Carry</strong>
                      </div>
                      <div
                        className="event-description"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {expandedSection === "thingsToCarry"
                          ? (event?.carrything ?? "No items specified")
                          : `${event?.carrything?.substring(0, 150) ?? ""}...`}
                      </div>
                      <button
                        onClick={() => toggleSection("thingsToCarry")}
                        className="read-more-btn"
                      >
                        {expandedSection === "thingsToCarry"
                          ? "Read less"
                          : "Read more"}
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="event-section mt-3">
                      <div className="event-heading">
                        <strong>Rules & Regulations</strong>
                      </div>
                      <div
                        className="event-description"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {expandedSection === "rules"
                          ? (event?.rule_and_regulations ??
                            "No rules specified")
                          : `${event?.rule_and_regulations?.substring(0, 150) ?? ""}...`}
                      </div>
                      <button
                        onClick={() => toggleSection("rules")}
                        className="read-more-btn"
                      >
                        {expandedSection === "rules"
                          ? "Read less"
                          : "Read more"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                     <div className="col-6">
                    <div className="event-section">
                      <h2 className="event-heading mb-3">Participants / Organisers</h2>

                      <div className="d-flex flex-nowrap overflow-x-auto">

                        {EventDetails?.result[0]?.event_celebrities?.map((person) => (
                          <div key={person.id} className="text-center me-3">
                            <div className="coach_img">
                              <img src={person.image} alt={person.name} />
                            </div>
                            <div>
                              <p className="coach-name">{person.name}</p>
                              <p className="coach-title">{person.title}</p>
                            </div>
                          </div>
                        ))}

                        {/* IF EMPTY */}
                        {EventDetails?.result[0]?.event_celebrities?.length === 0 && (
                          <p>No participants available.</p>
                        )}
                      </div>
                    </div>
                     </div>
                     
                  <div className="col-6">
                    <div className="card info_container p-3 border-0 mt-3">
                        <h2 className="event-heading mb-3">Organiser Contact Info</h2>

                        <div className="contact-scroll">
                          {EventDetails?.result[0]?.event_attendee?.map((contact) => (
                            <div key={contact.id} className="me-4 d-inline-block">
                              <p>
                                <strong>Email:</strong>{" "}
                                <a href={`mailto:${contact.email}`} className="text-primary">
                                  {contact.email}
                                </a>
                              </p>

                              <p>
                                <strong>Phone:</strong>{" "}
                                <a href={`tel:${contact.support_contact}`} className="text-primary">
                                  {contact.support_contact}
                                </a>
                              </p>
                            </div>
                          ))}

                          {EventDetails?.result[0]?.event_attendee?.length === 0 && (
                            <p>No organiser contact info found.</p>
                          )}
                        </div>
                      </div>

                  </div>
                </div>

                <div class="row g-3 mt-3">
                  <div className="col-12 col-lg-6">
                    <div className="card modal_title p-lg-3 p-2 border-0 rounded-3">
                      {/* <!-- Button trigger modal --> */}
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div className="rule">
                          <p className="m-0">Terms & Conditions</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn"
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
                                  termsText={event?.termsAndCondition}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="card modal_title p-lg-3 p-2 border-0 rounded-3">
                      {/* <!-- Button trigger modal --> */}
                      <div className="d-flex justify-content-between align-items-center text-center">
                        <div className="rule">
                          <p className="m-0">
                            Cancellation And Reschedule Policy
                          </p>
                        </div>
                        <div>
                          <button
                            type="button"
                            class="btn"
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
                            <div class="modal-body">
                              <div className="modal-body">
                                <CancellationPolicy
                                  policyText={event?.cancelPolicy}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-right col-lg-4">
                <div className="event-right-section">
                  <div className="event-heading">
                    <h3 className="details_page_titles">Location</h3>
                  </div>
                  <p>{eventAddress}</p>

                  <div className="venue-map">
                    <CustomMap
                      latitude={mapPosition.lat}
                      longitude={mapPosition.lng}
                    />

                  </div>
                </div>

                <div className="event-right-section">
                  <div className="event-heading">
                    <h3 className="details_page_titles">Meetup Point</h3>
                  </div>
                  <div className="meetup-time-dropdown">
                    <select
                      value={selectedArea || ""}
                      className="meetup-select"
                      onChange={(e) => {
                        const area = e.target.value;
                        setSelectedArea(area);

                        console.log("Selected area:", area);

                        const selectedPoint = event.meetupPoints.find(
                          (p) => p.area === area
                        );

                        console.log("Selected meetup point object:", selectedPoint);

                        if (selectedPoint) {
                          setMapPosition({
                            lat: selectedPoint.lat,
                            lng: selectedPoint.lng,
                          });
                          setEventAddress(selectedPoint.full_address || `${selectedPoint.area}, ${selectedPoint.city}`);
                          console.log("Updated mapPosition:", {
                            lat: selectedPoint.lat,
                            lng: selectedPoint.lng
                          });
                        } else {
                          console.warn("No meetupPoint found for area:", area);
                        }
                      }}
                    >
                      {event?.meetupPoints?.map((item, index) => (
                        <option key={index} value={item.area}>
                          {item.area} , {item.city}
                        </option>
                      ))}
                    </select>


                  </div>
                </div>

                <div className="event-right-section">
                  <div className="event-heading">
                    <h3 className="details_page_titles m-0">Select Date:</h3>
                  </div>
                  <EventCalandar
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    startDateProp={event?.startDate}
                    endDateProp={event?.endDate}
                  />
                </div>

                <div className="event-right-section">
                  <div className="event-heading">
                    <h3 className="details_page_titles ">Choose Tickets:</h3>
                  </div>
                  <TicketSelector
                    tickets={EventPrice[0]?.tickets}
                    counts={ticketCounts}
                    onChange={handleTicketChange}
                    setTotalPrice={setTotalPrice}
                    setTickets={setTickets}
                    disabled={!selectedDate}
                  />
                  {!selectedDate && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "16px",
                        marginTop: "5px",
                      }}
                    >
                      Please select a date first to choose tickets
                    </p>
                  )}
                </div>

                <div className="event-right-section">
                  <CheckoutPricing
                    totalPrice={finalAmount}
                    convenienceFee={totalPrice ? ConvenienceFee : 0}
                    bookingData={bookingDataValues}
                    count={totalPassCount}
                    type={type}
                    venueId={id}
                    price={totalPrice}
                    setFinalAmount={setFinalAmount}
                  />
                </div>

                <div className="event-right-section-button">
                  <button
                    className="event-btn"
                    onClick={handleBookEvent}
                    disabled={bookingLoading || paymentLoading}
                  >
                    {" "}
                    {bookingLoading || paymentLoading
                      ? "Processing..."
                      : "Book Tickets"}
                  </button>
                </div>
              </div>
            </div>


            <Container className="p-0">
              <EventReviewSlider event={{ review: event?.reviews }} />
            </Container>
            {/* <Gallery gallery={event.gallery} />
             */}
            <GalleryComponent />

            <div className="event-banner-container">
              <OngoingEvents banners={banners} />

            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
