import { useParams } from 'react-router-dom';
import BookingPopupCard from '../components/BookingPopupCard.jsx';

export default function PaymentStatus() {
    const { id } = useParams();

    return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
            <BookingPopupCard bookingId={id} />
        </div>
    );
}