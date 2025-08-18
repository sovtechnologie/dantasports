import { useLocation } from 'react-router-dom';

export default function PaymentFailed() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const bookingId = queryParams.get("bookingId");
    // const merchantTransactionId = queryParams.get("merchantTransactionId");
    // const date = queryParams.get("date");
    // const amount = queryParams.get("amount");

    // const hostName = queryParams.get("hostName");
    // const venueName = queryParams.get("venueName");
    // const bookingdate = queryParams.get("bookingDate")

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <h1>❌ Payment Failed</h1>
            <p>Your booking ID: <strong>{bookingId}</strong></p>
            <p>Please try again or contact support.</p>
        </div>
    );
}


