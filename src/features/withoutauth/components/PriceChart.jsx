import React, { useEffect, useState } from 'react'
import "./Stylesheets/PriceChart.css"
import priceData from '../StaticData/PriceChart'
import { useSportPriceChart } from '../../../hooks/favouriteSport/useSportPriceChart'
import { Link } from 'react-router-dom'


// helper to convert 24hr time to 12hr AM/PM
function formatTime(timeStr) {
  const [hour, minute] = timeStr.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHour = ((h + 11) % 12 + 1).toString().padStart(2, '0');
  return `${formattedHour}:${minute} ${ampm}`;
}

function getDaysFromSlot(slot) {
  const daysMap = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    staurday: 'Saturday',
    sunday: 'Sunday',
  };

  const activeDays = Object.entries(daysMap)
    .filter(([key, _]) => slot[key])
    .map(([_, value]) => value);

  return activeDays;
}

function groupDays(days) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];

  const hasWeekdays = weekdays.every(d => days.includes(d));
  const hasWeekends = weekends.every(d => days.includes(d));

  if (hasWeekdays && hasWeekends) return 'All Week';
  if (hasWeekdays) return 'Monday - Friday';
  if (hasWeekends) return 'Saturday - Sunday';
  return days.join(', ');
}

function transformPriceChartData(apiData) {
  return apiData.result.map(court => {
    const slots = court.time_slots.map(slot => {
      const dayLabel = groupDays(getDaysFromSlot(slot));
      const time = `${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}`;
      const price = `₹${slot.price}/Hr`;
      return { day: dayLabel, time, price };
    });

    return {
      title: court.court_name,
      slots,
    };
  });
}





function PriceChart({ onClose, venueId, sportId }) {

  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const { data, isLoading, error } = useSportPriceChart(sportId, venueId);

  const hasValidData = data && Array.isArray(data.result) && data.result.length > 0;
 const transformedPriceData = data && data.result ? transformPriceChartData(data) : priceData;


  useEffect(() => {
    if (!isLoading && (!data || data.result.length === 0)) {
      setShowNoDataMessage(true);
      const timer = setTimeout(() => {
        setShowNoDataMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading price chart: {error.message}</div>;
  }
  if (!hasValidData) {
    if (showNoDataMessage) {
      return <div>No price data available for this sport.</div>;
    } else {
      return null; // 👈 Don't show anything after 3 seconds
    }
  }


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} >
        <div className="price-chart">
          <div className="header">
            <h2>Price Chart</h2>
            <span className="close-icon" onClick={onClose}>✕</span>
          </div>
          <h4 className="venueName">Red Meadows</h4>
          <p className="notes">Pricing is subjected to change and is controlled by venue</p>

          <div className="columns">
            {transformedPriceData.map((column) => (
              <div key={column.title} className="column">
                <h5>{column.title}</h5>
                {column.slots.map((slot, i) => (
                  <div key={i} className="slot">
                    {slot.day && <strong>{slot.day}</strong>}
                    <div className="time-price">
                      <span>{slot.time}</span>
                      <span className="price">{slot.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="book-btn">
            <Link to={`/venueCheckout/${venueId}`} state={{ sportId }} style={{ textDecoration: "none", color: "inherit" }}><button>BOOK NOW</button></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceChart