import { useLocation } from 'react-router-dom';
import BookingPopupCard from '../components/BookingPopupCard.jsx';

export default function PaymentSuccess() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const merchantTransactionId = queryParams.get("merchantTransactionId");
    const date = queryParams.get("date");
    const amount = queryParams.get("amount");
    const bookingId = queryParams.get("bookingId");

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <BookingPopupCard bookingId={bookingId} date={date} amount={amount} merchantTransactionId={merchantTransactionId} />
        </div>
    );
}