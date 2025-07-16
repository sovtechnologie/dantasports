import { useParams } from 'react-router-dom';

export default function PaymentFailed() {
    const { bookingId } = useParams();

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>❌ Payment Failed</h1>
            <p>Your booking ID: <strong>{bookingId}</strong></p>
            <p>Please try again or contact support.</p>
        </div>
    );
}
