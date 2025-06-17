import React, { useState } from 'react';
import './Stylesheets/CorporateBookingForm.css';
import checkOutIcon from "../assets/Checkitcon.png";

const CorporateBookingForm = () => {
  const [formData, setFormData] = useState({
    organization: '',
    contactPerson: '',
    mobile: '',
    email: '',
    bookingType: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage('Form submitted successfully!');
        setFormData({
          organization: '',
          contactPerson: '',
          mobile: '',
          email: '',
          bookingType: '',
          message: ''
        });
      } else {
        setResponseMessage(data.message || 'Something went wrong!');
      }
    } catch (error) {
      setResponseMessage('Error submitting the form.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="form-container">
    <div className="form-card">
      <div className="form-left">
        <h2>Talk to Our Team</h2>
        <p>For a customized proposal as per your needs.</p>
        <hr/>
        <ul>
          <li><img src= {checkOutIcon}/> Trusted By Some Of The Biggest Corporates In Industry</li>
          <li><img src= {checkOutIcon}/> 1500+ Venues</li>
          <li><img src= {checkOutIcon}/> 60+ Cities</li>
        </ul>
      </div>
      <form className="form-right" onSubmit={handleSubmit}>
        <input type="text" name="organization" placeholder="Organization Name*" value={formData.organization} onChange={handleChange} required />
        <input type="text" name="contactPerson" placeholder="Contact Person Name*" value={formData.contactPerson} onChange={handleChange} required />
        <input type="tel" name="mobile" placeholder="Mobile*" value={formData.mobile} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
        <select name="bookingType" value={formData.bookingType} onChange={handleChange}>
          <option value="">Type of Booking</option>
          <option value="conference">Conference</option>
          <option value="training">Training</option>
          <option value="workshop">Workshop</option>
        </select>
        <textarea name="message" placeholder="Message*" value={formData.message} onChange={handleChange} required />
        <button type="submit" disabled={loading} className='form-btn'>
          {loading ? 'Sending...' : 'SEND NOW'}
        </button>
        {responseMessage && <p className="response-message">{responseMessage}</p>}
      </form>
    </div>
  </div>
);

};

export default CorporateBookingForm;
