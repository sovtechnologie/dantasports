
import "./Stylesheets/ConfirmSlotCard.css";
import Cookies from 'js-cookie';
import { useSportDetails } from "../../../hooks/favouriteSport/useSportDetails.js";
import { useFetchSingleVenue } from "../../../hooks/VenueList/useFetchSingleVenue.js";
import { useCreateVenueBooking } from "../../../hooks/BookingVenue/useCreateVenueBooking.js";

const getLocalIsoDate = date => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
};

const ConfirmSlotCard = ({ onClose, onSuccess, payload }) => {
  const { sportId, venueId, selectedDate, selectedDuration, selectedTime, selectedPitch } = payload;
  console.log("in my confirsmSlotCard", selectedDate,selectedDuration)
  const isLoggedIn = Boolean(Cookies.get('token'));
  console.log("myPayload", payload)
  const {
    mutate: createBooking,
    isLoading: bookingLoading,
    error: bookingError
  } = useCreateVenueBooking();

  const timeOnly = selectedTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeRead = selectedTime?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const { data: sportDetails, isLoading: sportDetailLoading, error: sportDetailError } = useSportDetails(sportId);
  const { data: venueDetails, isLoading: venueDetailsLoading, error: VenueError } = useFetchSingleVenue(venueId);

  const venueName = venueDetails?.result[0]?.venue_name;
  const selectedSport = venueDetails?.result[0]?.sports.find((sport) => sport.id === sportId);
  const selectedCourt = sportDetails?.result[0]?.courts?.find((court) => court.id === selectedPitch);


  const handleProceed = () => {
    if (!isLoggedIn) {
      alert('Please log in to proceed.')
      return;
    }
    const bookingPayload = {
      sportId: sportId,
      venueId: 1,
      duration: selectedDuration,
      date: getLocalIsoDate(selectedDate),
      startTime: timeRead,
      courtId: selectedPitch,
    };

    createBooking(bookingPayload, {
      onSuccess: (data) => {
        const id = data?.result?.insertId;
        onSuccess(id);
        // setBookingId(data?.result?.insertId);
        console.log("My Booking Id", data?.result?.insertId);
      },
      onError: (error) => alert('Booking failed. ' + (error.message || '')),
    });

  }

  return (
    <div className="slot-card-overlay">
      <div className="slot-card-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Confirm Your Slots</h2>
        <div className="slot-details">
          <p>Venue:<span>{venueName}</span></p>
          <p>sport:<span>{selectedSport?.name}</span></p>
          <p>Day & Date: <span>{getLocalIsoDate(selectedDate)}</span></p>
          <p>Duration: <span>{`${selectedDuration}min`}</span></p>
          <p>Time: <span>{timeOnly}</span></p>
          <p>Court: <span>{selectedCourt?.court_name}</span></p>
        </div>

        <button className="proceed-btn"
          onClick={handleProceed}
          disabled={!isLoggedIn || bookingLoading}
          style={{ opacity: !isLoggedIn ? 0.6 : 1, cursor: !isLoggedIn ? 'not-allowed' : 'pointer' }}
        > {bookingLoading ? 'Booking...' : 'PROCEED'}</button>
      </div>
      {bookingError && <p className="error">Error: {bookingError.message}</p>}
      <div>

      </div>
    </div>
  );
};

export default ConfirmSlotCard;
