import { useParams } from 'react-router-dom';

export default function PaymentSuccess() {
    const { bookingId } = useParams();

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>Payment Successs</h1>
            <p>Your booking ID: <strong>{bookingId}</strong></p>
        </div>
    );
}