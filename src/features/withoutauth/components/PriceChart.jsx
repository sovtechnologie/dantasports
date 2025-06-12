import React from 'react'
import "./Stylesheets/PriceChart.css"
import priceData from '../StaticData/PriceChart'
import { Link } from 'react-router-dom'

function PriceChart({ sport, onClose }) {
  return (
    <div className="price-chart">
      <div className="header">
        <h2>Price Chart</h2>
        <span className="close-icon" onClick={onClose}>✕</span>
      </div>
      <h4 className="venueName">Red Meadows</h4>
      <p className="notes">Pricing is subjected to change and is controlled by venue</p>

      <div className="columns">
        {priceData.map((column) => (
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
       <Link to="/venueCheckout/id" style={{ textDecoration: "none", color: "inherit" }}><button>BOOK NOW</button></Link>
      </div>
    </div>
  )
}

export default PriceChart