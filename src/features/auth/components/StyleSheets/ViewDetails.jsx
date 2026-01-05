// import React from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import "../StyleSheets/ViewDetails.css"
// import { Container } from "react-bootstrap";
// import list from "../../../withoutauth/assets/VenueCardLogo/list.svg";
// import map from "../../../withoutauth/assets/VenueCardLogo/map.svg";

// function ViewDetails(props) {
//   return (
//     <>
//        <section className="view_details_section">
//         <Container>
//             <Modal
//       {...props}
//       size="lg"
//         dialogClassName="view_details_section"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter" className="w-100">
//          <div className="header_txt mt-3">
//              <h2 className="text-center">Booking Details</h2> 
//              {/* <p className="m-0 text-center"><em>Booking ID: #123Turf02</em></p> */}
//          </div>
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div className="d-flex mb-4">
//              <img src={list} alt="" />
//              {/* <h4 className="ms-3 mb-0">Transaction Details: </h4> */}
//         </div>
//          {/* <div className="lsiting">
//             <p className="m-0"><span className="me-3">Sports Title :</span>Polar Night Event</p>
//          </div> */}
//          <div className="lsiting">
//           <p className="m-0"><span className="me-3">Booking ID:</span>#123Turf02</p>
//          </div>
//          <div className="lsiting">
//             <p className="m-0"><span className="me-3">Date | time</span>24/Nov/2025 <span className="time ">9:00 Am</span><em className="me-1 ms-1">TO</em><span className="time">10:00 Am</span></p>
//          </div>
//          <div className="lsiting">
//             <p className="m-0"><span className="me-2">Turf Name:</span>Abcd</p>
//          </div>
//           <div className="lsiting">
//             <p className="m-0"><span className="me-2">Pitch / Court:</span>5x5</p>
//          </div>
//            <div className="lsiting d-flex justify-content-between">
//             <p className="m-0"><span className="me-3">Location :</span>Sarojini Nagar, Lucknow, UP</p>
//             <div>
//                 <img src={map} alt="" />
//             </div>
//          </div>
//           <div className="lsiting">
//             <p className="mb-2"><span className="me-2">Customer details:</span></p>
//           </div>
//           <div className="outerbox">

//             <ul className="p-0 m-0">
//               <li><span className="me-3">Customer Name:</span>satish sahu</li>
//                <li><span className="me-3">Mail Id:</span>satish@gmail.com</li>
//                 <li><span className="me-3">Contract Number</span>8429813814</li>
//             </ul>
//          </div>
//           <div className="lsiting">
//             <p className="mb-2"><span className="me-2">Bill summary:</span></p>
//           </div>
//            <div className="outerbox">
//             <ul className="p-0 m-0">
//               <li><span className="me-3">Booking amount:</span>1000</li>
//                <li><span className="me-3">Convenience fee:</span>10.0</li>
//                 <li><span className="me-3">discount coupons :</span>5%</li>
//                 <li><span className="me-3">Total amount paid :</span>1250.0</li>
//             </ul>
//          </div>
//            <div className="lsiting">
//             <p className="mb-2"><span className="me-2">Payment details</span></p>
//           </div>
//             <div className="outerbox">
//             <ul className="p-0 m-0">
//               <li><span className="me-3">Payment method:</span>UPI</li>
//                <li><span className="me-3">Payment time:</span>10.00 AM</li>
//                 <li><span className="me-3">discount coupons :</span>3%</li>
//                 <li><span className="me-3">Total amount paid :</span>1250.0</li>
//             </ul>
//          </div>
//            <div className="lsiting">
//             <div className="booked">
//               <p className=" border-bottom-1  text-success">Booked</p>
//                <div className="d-flex justify-content-between">
//                  <p>Booking Time: 10:00 AM</p>
//                  <p> Booking Date: 26/Nov/2025</p>
//                </div>
//               <p className=" text-danger">Refund processed</p>
//               <div className="d-flex justify-content-between">
//                 <p>Refund Date: 27/Nov/2025</p>
//                 <p>Refund Time: 12:00 Am</p>

//               </div>
//               <div className="d-flex justify-content-between">
//                 <p>Refund credited in your account</p>
//                 <p>Refund with in 7 days</p>
//               </div>
//             </div>
//           </div>




//       </Modal.Body>

//     </Modal>
//         </Container>
//        </section>
//     </>
//   );
// }

// export default ViewDetails;

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../StyleSheets/ViewDetails.css";
import { Container, Spinner } from "react-bootstrap";
import list from "../../../withoutauth/assets/VenueCardLogo/list.svg";
import map from "../../../withoutauth/assets/VenueCardLogo/map.svg";
import { getBookedDetailsById } from "../../../../services/LoginApi/PaymentApi/endpointsApi";

function ViewDetails({ booking, ...props }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------------- FORMATTERS ----------------------------

  function formatTimeDuration(timeStr, durationMinutes) {
    if (!timeStr) return "";

    const [h, m, s] = timeStr.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, s || 0);

    const end = new Date(start.getTime() + durationMinutes * 60000);
    const opts = { hour: "2-digit", minute: "2-digit", hour12: true };

    return `${start.toLocaleTimeString("en-US", opts)} – ${end.toLocaleTimeString("en-US", opts)}`;
  }

  function formatTimeFromISO(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }


  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatRefundTime(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // ---------------------- API CALL ----------------------------

  useEffect(() => {
    if (props.show) {
      fetchDetails();
    }
  }, [props.show]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await getBookedDetailsById({
        bookingId: booking.id,
        type: booking.type,
      });


      setDetails({
        booking: res?.result.data?.[0] || null,
        refundStatus: res?.result.refundStatus || null,
      });

    } catch (err) {
      console.log("Error fetching booking details", err);
    } finally {
      setLoading(false);
    }
  };

  const data = details?.booking || booking || {};
  const refundStatus = details?.refundStatus || null;

  const paymentCode = refundStatus?.code || "";

  const isGymBooking = Number(data.type) === 3;
  const isEventOrRunBooking = Number(data.type) === 2;

  if (!booking) return null;

  // ---------------------- UI START ----------------------------

  return (
    <section className="view_details_section">
      <Container>
        <Modal {...props} size="lg" dialogClassName="view_details_section" centered>
          <Modal.Header closeButton>
            <Modal.Title className="w-100">
              <div className="header_txt mt-3">
                <h2 className="text-center">Booking Details</h2>
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2">Loading booking details...</p>
              </div>
            )}
            {!loading && (
              <>
                <div className="d-flex mb-4">
                  <img src={list} alt="icon" />
                </div>

                {/* ------------ BOOKING INFO ------------ */}

                {/* ------------ BOOKING INFO ------------ */}

                <div className="lsiting">
                  <p><span className="me-3">Booking ID:</span>#{data.booking_id}</p>
                </div>

                {/* ---------- GYM BOOKING UI ---------- */}
                {isGymBooking && (
                  <>
                    <div className="lsiting">
                      <p><span className="me-2">Gym Name:</span>{data.gym_name}</p>
                    </div>

                    <div className="lsiting">
                      <p><span className="me-2">Coupan:</span>{data.coupon_code}</p>
                    </div>

                    <div className="lsiting">
                      <p><span className="me-2">Use Passes</span>{data.use_passes}</p>
                    </div>
                    <div className="lsiting">
                      <p><span className="me-2">Total Passes</span>{data.quantity}</p>
                    </div>

                  </>
                )}

                {/* ---------- TURF / VENUE BOOKING UI ---------- */}
                {!isGymBooking && (
                  <>
                    <div className="lsiting">
                      <p>
                        <span className="me-3">Date | Time:</span>
                        {formatDate(data.date)}
                        <span className="time ms-2">
                          {formatTimeDuration(data.start_time, data.duration)}
                        </span>
                      </p>
                    </div>

                    <div className="lsiting">
                      <p><span className="me-2">{isEventOrRunBooking ? "Run/Event:" : "Turf Name:"}</span>{data.venue_name}</p>
                    </div>

                    <div className="lsiting">
                      <p><span className="me-2">Court:</span>{data.court_name || "N/A"}</p>
                    </div>

                    <div className="lsiting">
                      <p><span className="me-2">Sport Name:</span>{data.sports_name || "N/A"}</p>
                    </div>
                  </>
                )}

                <div className="lsiting d-flex justify-content-between">
                  <p><span className="me-3">Location :</span>{data.full_address || "N/A"}</p>
                  <img src={map} alt="map" />
                </div>

                {/* ------------ CUSTOMER DETAILS ------------ */}

                <div className="lsiting"><p className="mb-2"><strong>Customer Details:</strong></p></div>

                <div className="outerbox">
                  <ul className="p-0 m-0">
                    <li><span className="me-3">Name:</span>{data.full_name}</li>
                    <li><span className="me-3">Email:</span>{data.email}</li>
                    <li><span className="me-3">Contact:</span>{data.mobile_number}</li>
                  </ul>
                </div>



                <div className="lsiting"><p className="mb-2"><strong>Bill Summary:</strong></p></div>

                <div className="outerbox">
                  <ul className="p-0 m-0">
                    <li><span className="me-3">Booking amount:</span>{data.booking_amount}</li>
                    <li><span className="me-3">Convenience fee:</span>{data.convenience_fee}</li>
                    <li><span className="me-3">Discount:</span>{data.discount_amount}</li>
                    <li><span className="me-3">Total paid:</span>{data.paid_amount}</li>
                  </ul>
                </div>



                <div className="lsiting"><p className="mb-2"><strong>Payment Details:</strong></p></div>

                <div className="outerbox">
                  <ul className="p-0 m-0">
                    <li><span className="me-3">Method:</span>{data.paymentInstrument?.type || "N/A"}</li>
                    <li><span className="me-3">Payment Date:</span>{formatDate(data.payment_date)}</li>
                    <li><span className="me-3">Payment Time:</span> {formatTimeFromISO(data.payment_date)}</li>
                    {data.booking_status === 1 ? <li><span className="me-3">Transaction Id:</span> {data.merchent_transaction_id}</li> : ""}
                  </ul>
                </div>


                <div className="lsiting">
                  <div className="booked">

                    <p className="text-success">
                      {data.booking_status === 1 ? "Booked" : "Cancelled"}
                    </p>
                    {/* {data.booking_status === 1 ?
                      <div className="d-flex justify-content-between">
                        <p>Booking Time: {formatTimeFromISO(data.payment_date)}</p>

                        {/* <p>Booking Date: {formatDate(data.date)}</p> */}
                    {/* </div> : ""} */}


                    {paymentCode === "PAYMENT_PENDING" && (
                      <>
                        <p className="text-warning fw-bold">Payment Pending</p>

                        <div className="d-flex justify-content-between">
                          <p>Your payment is under process</p>
                          <p className="text-muted">Please wait</p>
                        </div>

                        <p className="text-muted small">
                          Amount will be updated once payment is confirmed.
                        </p>
                      </>
                    )}

                    {/* 🟢 PAYMENT / REFUND SUCCESS */}
                    {paymentCode === "PAYMENT_SUCCESS" && (
                      <>
                        <p className="text-danger fw-bold">Refund Successful</p>

                        <div className="d-flex justify-content-between">
                          <p>Refund Date: {formatDate(data.refund_date)}</p>
                          <p>Time: {formatTimeFromISO(data.refund_date)}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p>Refund Amount:</p>
                          <p className="fw-bold">{data.paid_amount}</p>
                        </div>

                        <div className="d-flex justify-content-between">
                          <p>Refund credited to your Source account</p>

                        </div>

                        {refundStatus?.data?.paymentInstrument?.utr && (
                          <p className="text-muted">
                            UTR: {refundStatus.data.paymentInstrument.utr}
                          </p>
                        )}
                      </>
                    )}


                  </div>
                </div>
              </>
            )}

          </Modal.Body>
        </Modal>
      </Container>
    </section >
  );
}

export default ViewDetails;
