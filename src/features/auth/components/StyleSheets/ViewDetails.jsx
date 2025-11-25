import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../StyleSheets/ViewDetails.css"
import { Container } from "react-bootstrap";
import list from "../../../withoutauth/assets/VenueCardLogo/list.svg";
import map from "../../../withoutauth/assets/VenueCardLogo/map.svg";

function ViewDetails(props) {
  return (
    <>
       <section className="view_details_section">
        <Container>
            <Modal
      {...props}
      size="lg"
        dialogClassName="view_details_section"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100">
         <div className="header_txt mt-3">
             <h2 className="text-center">Booking Details</h2> 
             <p className="m-0 text-center"><em>Booking ID: #123Turf02</em></p>
         </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex mb-4">
             <img src={list} alt="" /><h4 className="ms-3 mb-0">Transaction Details: </h4>
        </div>
         <div className="lsiting">
            <p className="m-0"><span className="me-3">Sports Title :</span>Polar Night Event</p>
         </div>
         <div className="lsiting">
            <p className="m-0"><span className="me-3">Booking Date :</span>24/Nov/2025</p>
         </div>
         <div className="lsiting">
            <p className="m-0"><span className="me-2">Booking Time :</span><span className="time">9:00 Am</span><em className="me-1 ms-1">TO</em><span className="time">10:00 Am</span></p>
         </div>
           <div className="lsiting d-flex justify-content-between">
            <p className="m-0"><span className="me-3">Location :</span>Sarojini Nagar, Lucknow, UP</p>
            <div>
                <img src={map} alt="" />
            </div>
         </div>
         <div className="mb-3">
            <select className="custom-select" aria-label="Default select example">
                <option selected>Booking amount :</option>
                <option value="1">Name: Satish Sahu</option>
                <option value="2">Bill summary:</option>
                <option value="3">Booking amount: </option>
                <option value="4">Convenience fee breakage with gst:</option>
                <option value="5">discount coupons if any applied:</option>
                <option value="6">Total amount paid :</option>
            </select>
            </div>


          <div className="mb-3">
             <select class="custom-select" aria-label="Default select example">
            <option selected>Payment details :</option>
            <option value="1">Payment method</option>
            <option value="2">Payment time:</option>
            
        </select>
         </div>
        
      </Modal.Body>
      
    </Modal>
        </Container>
       </section>
    </>
  );
}

export default ViewDetails;
