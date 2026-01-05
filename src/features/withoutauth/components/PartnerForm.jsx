import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../Stylesheets/PartnerFrom.css";

function PartnerForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // API call here
  };

  return (
    <section className="py-5 about_us_form_section">
      <Container>
        {/* gx-4 keeps equal spacing left & right */}
        <Row className="align-items-center gx-4">
          {/* Left Content */}
          <Col lg={5} md={12} className="mb-4 mb-lg-0">
            <h2>Partner with Danta Sports</h2>
            <p>
              Fill out the form below to become a registered vendor and grow
              your sports business with us.
            </p>
          </Col>

          {/* Form */}
          <Col lg={7} md={12}>
  <div className="card p-4 shadow-sm border-0">
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-6 mb-3">
          <input
            type="tel"
            className="form-control"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-6 mb-3">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-6 mb-3">
          <input
            type="text"
            className="form-control"
            name="location"
            placeholder="City / Area"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-lg-6 mb-3">
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Service Category</option>
            <option value="Venue / Turf Owner">Venue / Turf Owner</option>
            <option value="Academy">Academy</option>
            <option value="Personal Trainer">Personal Trainer</option>
            <option value="Event Organiser">Event Organiser</option>
            <option value="Run Club">Run Club</option>
            <option value="Gym Owner">Gym Owner</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-12 mb-4">
          <textarea
            className="form-control"
            name="message"
            rows="5"
            placeholder="Additional Details"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</Col>

        </Row>
      </Container>
    </section>
  );
}

export default PartnerForm;
