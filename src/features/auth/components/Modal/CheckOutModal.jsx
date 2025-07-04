import React, { useEffect, useState } from "react";
import "../StyleSheets/CheckOutModal.css";
import venueImage from "../../assets/image.png";
import editIcon from "../../assets/Edit Square.png";
import { usePaymentDetails } from "../../../../hooks/Payments/usePaymentDetails.js";
import { useCreatePayment } from "../../../../hooks/Payments/useCreatePayment.js";

const booking = {
    image: venueImage,
    name: 'Red Meadows',
    time: '09:00 am – 10:00 am',
    date: '04 Sep 2024',
    size: '5x5',
    sport: 'Football',
    onRemove: () => { },
    onEdit: () => { },
    contact: { name: 'Jane Cooper', phone: '+91 8085550833', email: 'janec@example.com' },
    price: { court: 1100, fee: 30 },
    total: 1130
};

// Helper functions
function formatTime(start, duration) {
    const [h, m] = start.split(":").map(Number);
    const startDT = new Date();
    startDT.setHours(h, m, 0, 0);
    const endDT = new Date(startDT.getTime() + duration * 60000);
    const opts = { hour: "2-digit", minute: "2-digit" };
    return `${startDT.toLocaleTimeString([], opts)} – ${endDT.toLocaleTimeString([], opts)}`;
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

const mapBookingResponse = (api) => ({
    image: api.cover_image,           // use cover_image
    name: api.venue_name,
    time: formatTime(api.start_time, api.duration),
    date: formatDate(api.date),
    size: api.court_name,
    sport: api.sports_name,
    onRemove: () => { /* your code */ },
    onEdit: () => { /* your code */ },
    contact: {
        name: api.full_name,
        phone: api.mobile_number,
        email: api.email,
    },
    price: {
        court: api.total_price - api.convenience_fee,
        fee: api.convenience_fee,
    },
    total: api.total_price,
});





export function CheckoutModal({ isOpen, onClose, bookingId }) {
    console.log("CheckoutModal render, isOpen:", isOpen, bookingId);



    // ⚠️ Always call hooks at top
    const [fitness, setFitness] = useState(false);
    const { data, error, isLoading } = usePaymentDetails(bookingId);
    const {
        mutate: createPayment,
        data: paymentResponse,
        isLoading: paymentLoading,
        isError: paymentError
    } = useCreatePayment();

    const handlePay = () => {
        if (!bookingId)
            return;
        createPayment(bookingId);
    }

    const paymentUrl = paymentResponse?.url;

    // ⚠️ Open payment URL in new tab once it's available
    useEffect(() => {
        if (paymentUrl) {
            window.open(paymentUrl, "_blank");
        }
    }, [paymentUrl]);

    if (!isOpen) return null;

    const details = data?.result?.[0];
    console.log("payment detais", details)
    // 2. Data loading or error states
    if (isLoading) return <div>Loading booking data…</div>;
    if (error) return <div>Error loading booking: {error.message}</div>;

    // 3. Extract the first result
    const response = data?.result?.[0];
    if (!response) return <div>No booking data available.</div>;

    // 4. Now map to booking safely
    const booking = mapBookingResponse(response);
    return (
        <div className="modal-backdrop">
            <div className="modal">
                {/* <div className="checkoutModalHeading">CheckOut</div> */}
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="modal-body">
                    <div className="right-panel">
                        <div className="booking-card">
                            <img className="booking-card__img" src={booking.image} alt={booking.name} />
                            <div className="booking-card__content">
                                <h3 className="booking-card__title">{booking.name}</h3>
                                <p className="booking-card__time">{booking.time}, {booking.date}</p>
                                <p className="booking-card__details">{booking.size}, {booking.sport}</p>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-card__header">
                                <h4>Contact info</h4>

                            </div>
                            <div className="contact-card__body">
                                <div className="info-row">
                                    <span className="label">Name:</span>
                                    <span className="value">{booking.contact.name}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Phone number:</span>
                                    <span className="value">{booking.contact.phone}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Email:</span>
                                    <span className="value">{booking.contact.email}</span>
                                </div>
                            </div>
                        </div>


                        <div className="price-card">
                            <h4 className="price-card__header">Price details</h4>

                            <div className="price-row">
                                <span>Court price</span>
                                <span>₹{booking.price.court} <img src={editIcon} alt="info" className="info-icon" /></span>
                            </div>
                            <div className="price-row">
                                <span>Convenience fee</span>
                                <span>₹{booking.price.fee} <img src={editIcon} alt="info" className="info-icon" /></span>
                            </div>

                            <hr />

                            <label className="fitness-row">
                                <input
                                    type="checkbox"
                                    checked={fitness}
                                    onChange={() => setFitness(!fitness)}
                                />
                                <span>Fitness cover fee (₹10/session)</span>
                                <span>₹10</span>
                            </label>

                            <button className="apply-coupon-btn" >
                                Apply coupon →
                            </button>

                            <div className="total-row">
                                <span>Total amount</span>
                                <strong>₹{booking.total}</strong>
                            </div>
                        </div>

                        <button className="pay-now" onClick={handlePay}>PAY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
