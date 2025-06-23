import React, { useState } from 'react';
import './Stylesheets/CorporateBookingForm.css';
import { useMutation } from '@tanstack/react-query';
import { submitInquiryForm } from '../../../services/withoutLoginApi/InquiryFormApi/endpointApi';
import checkOutIcon from "../assets/Checkitcon.png";

const CorporateBookingForm = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    individualName: '',
    mobileNumber: '',
    email: '',
    bookingType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: submitInquiryForm,
    onSuccess: () => {
      setResponseMessage('Form submitted successfully!');
      setFormData({
        organizationName: '',
        individualName: '',
        mobileNumber: '',
        email: '',
        bookingType: '',
        message: ''
      });
    },
    onError: (error) => {
      setResponseMessage(
        error?.response?.data?.message || 'Error submitting the form.'
      );
    }
  });

  const validate = () => {
    const newErrors = {};

    if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization is required.';
    if (!formData.individualName.trim()) newErrors.individualName = 'Contact person is required.';
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.bookingType) newErrors.bookingType = 'Booking type is required.';
    if (!formData.message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    setResponseMessage('');

    if (validate()) {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-left">
          <h2>Talk to Our Team</h2>
          <p>For a customized proposal as per your needs.</p>
          <hr />
          <ul>
            <li><img src={checkOutIcon}  alt='check it'/> Trusted By Some Of The Biggest Corporates In Industry</li>
            <li><img src={checkOutIcon} alt='check it'/> 1500+ Venues</li>
            <li><img src={checkOutIcon} alt='check it'/> 60+ Cities</li>
          </ul>
        </div>
        <form className="form-right" onSubmit={handleSubmit}>
          <input type="text" name="organizationName" placeholder="Organization Name*" value={formData.organizationName} onChange={handleChange} required />
          {errors.organizationName && <span className="error">{errors.organizationName}</span>}
          <input type="text" name="individualName" placeholder="Contact Person Name*" value={formData.individualName} onChange={handleChange} required />
          {errors.individualName && <span className="error">{errors.individualName}</span>}
          <input type="tel" name="mobileNumber" placeholder="Mobile*" value={formData.mobileNumber} onChange={handleChange} maxLength={10} minLength={10} required />
          {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
          <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
          <select name="bookingType" value={formData.bookingType} onChange={handleChange}>
            <option value="">Type of Booking</option>
            <option value="1">Corporate Booking</option>
            <option value="2">Bulk Booking</option>
          </select>
          {errors.bookingType && <span className="error">{errors.bookingType}</span>}
          <textarea name="message" placeholder="Message*" value={formData.message} onChange={handleChange} required />
          {errors.message && <span className="error">{errors.message}</span>}
          <button type="submit" disabled={mutation.isLoading} className="form-btn">
            {mutation.isLoading ? 'Sending...' : 'SEND NOW'}
          </button>
          {responseMessage && <p className="response-message">{responseMessage}</p>}
        </form>
      </div>
    </div>
  );

};

export default CorporateBookingForm;