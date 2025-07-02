import React, { useState } from "react";
import "../StyleSheets/CheckOutModal.css";
import venueImage from "../../assets/image.png";
import editIcon from "../../assets/Edit Square.png"

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



export function CheckoutModal({ isOpen, onClose, }) {
    const [selectedPayment, setPayment] = useState('googlepay');
    const [selectedCard, setCard] = useState('axis-4578');
    const [fitness, setFitness] = useState(false);

    if (!isOpen) return null;

    const handlePay = () => {
        // handle payment logic
        console.log({ selectedPayment, selectedCard, fitness });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <div className="modal-body">
                    <div className="left-panel">
                        <h2>CheckOut</h2>
                        <h2>Payment Method</h2>
                        <div className="method-list">
                            <button
                                className={selectedPayment === 'googlepay' ? 'active' : ''}
                                onClick={() => setPayment('googlepay')}
                            >Google Pay</button>
                            <button
                                className={selectedPayment === 'phonepe' ? 'active' : ''}
                                onClick={() => setPayment('phonepe')}
                            >PhonePe</button>
                            <button
                                className={selectedPayment === 'upi-new' ? 'active' : ''}
                                onClick={() => setPayment('upi-new')}
                            >Add New UPI ID</button>
                            <button
                                className={selectedPayment === 'card' ? 'active' : ''}
                                onClick={() => setPayment('card')}
                            >Debit Card</button>
                        </div>

                        {selectedPayment === 'card' && (
                            <div className="card-list">
                                <label>
                                    <input
                                        type="radio"
                                        name="card"
                                        value="axis-4578"
                                        checked={selectedCard === 'axis-4578'}
                                        onChange={() => setCard('axis-4578')}
                                    />
                                    Axis Bank **** 4578
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="card"
                                        value="hdfc-4521"
                                        checked={selectedCard === 'hdfc-4521'}
                                        onChange={() => setCard('hdfc-4521')}
                                    />
                                    HDFC Bank **** 4521
                                </label>
                                <button
                                    className={selectedPayment === 'new-card' ? 'active' : ''}
                                    onClick={() => setPayment('new-card')}
                                >
                                    + Add New Card
                                </button>
                                {selectedPayment === 'new-card' && (
                                    <div className="new-card-form">
                                        <input type="text" placeholder="Cardholder Name" />
                                        <input type="text" placeholder="Card Number" maxLength="19" />
                                        <div className="inline-fields">
                                            <input type="text" placeholder="MM/YY" maxLength="5" />
                                            <input type="text" placeholder="CVV" maxLength="4" />
                                        </div>
                                        {/* <button className="save-card" onClick={handleSaveCard}>
                                            Save & Use Card
                                        </button> */}
                                    </div>
                                )}

                            </div>
                        )}

                        <h3>More Payment Options</h3>
                        <div className="more-methods">
                            <button>Amazon Pay</button>
                            <button>CRED Pay</button>
                            <button>Pay at Venue</button>
                        </div>
                    </div>
                    <div className="right-panel">
                        <div className="booking-card">
                            <img className="booking-card__img" src={booking.image} alt={booking.name} />
                            <div className="booking-card__content">
                                <h3 className="booking-card__title">{booking.name}</h3>
                                <p className="booking-card__time">{booking.time}, {booking.date}</p>
                                <p className="booking-card__details">{booking.size}, {booking.sport}</p>
                                <div className="booking-card__actions">
                                    <button className="action-btn" onClick={booking.onRemove}>Remove</button>
                                    <button className="action-btn" onClick={booking.onEdit}>Edit</button>
                                </div>
                            </div>
                        </div>

                        <div className="contact-card">
                            <div className="contact-card__header">
                                <h4>Contact info</h4>
                                <button className="edit-btn" onClick={booking.onEdit}>
                                    <img src={editIcon} alt="Edit" />
                                </button>
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

                        {/* <div className="price-details">
                            <div>
                                <span>Court price</span>
                                <span>₹{booking.price.court}</span>
                            </div>
                            <div>
                                <span>Convenience fee</span>
                                <span>₹{booking.price.fee}</span>
                            </div>
                            <label className="fitness">
                                <input
                                    type="checkbox"
                                    checked={fitness}
                                    onChange={() => setFitness(!fitness)}
                                />
                                Fitness cover fee (₹10/session)
                                <span>₹10</span>
                            </label>
                            <button className="apply-coupon">Apply coupon</button>
                            <div className="total">
                                <span>Total amount</span>
                                <strong>₹{booking.total + (fitness ? 10 : 0)}</strong>
                            </div>
                        </div> */}

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
