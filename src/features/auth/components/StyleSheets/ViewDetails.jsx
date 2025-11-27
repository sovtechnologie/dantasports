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
             <h2 className="text-center text-white">Booking Details</h2> 
             {/* <p className="m-0 text-center"><em>Booking ID: #123Turf02</em></p> */}
         </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex mb-4">
             <img src={list} alt="" />
             {/* <h4 className="ms-3 mb-0">Transaction Details: </h4> */}
        </div>
         {/* <div className="lsiting">
            <p className="m-0"><span className="me-3">Sports Title :</span>Polar Night Event</p>
         </div> */}
         <div className="lsiting">
          <p className="m-0"><span className="me-3">Booking ID:</span>#123Turf02</p>
         </div>
         <div className="lsiting">
            <p className="m-0"><span className="me-3">Date | time</span>24/Nov/2025 <span className="time ">9:00 Am</span><em className="me-1 ms-1">TO</em><span className="time">10:00 Am</span></p>
         </div>
         <div className="lsiting">
            <p className="m-0"><span className="me-2">Turf Name:</span>Abcd</p>
         </div>
          <div className="lsiting">
            <p className="m-0"><span className="me-2">Pitch / Court:</span>5x5</p>
         </div>
           <div className="lsiting d-flex justify-content-between">
            <p className="m-0"><span className="me-3">Location :</span>Sarojini Nagar, Lucknow, UP</p>
            <div>
                <img src={map} alt="" />
            </div>
         </div>
          <div className="lsiting">
            <p className="mb-2"><span className="me-2">Customer details:</span></p>
          </div>
          <div className="outerbox">
            
            <ul className="p-0 m-0">
              <li><span className="me-3">Customer Name:</span>satish sahu</li>
               <li><span className="me-3">Mail Id:</span>satish@gmail.com</li>
                <li><span className="me-3">Contract Number</span>8429813814</li>
            </ul>
         </div>
          <div className="lsiting">
            <p className="mb-2"><span className="me-2">Bill summary:</span></p>
          </div>
           <div className="outerbox">
            <ul className="p-0 m-0">
              <li><span className="me-3">Booking amount:</span>1000</li>
               <li><span className="me-3">Convenience fee:</span>10.0</li>
                <li><span className="me-3">discount coupons :</span>5%</li>
                <li><span className="me-3">Total amount paid :</span>1250.0</li>
            </ul>
         </div>
           <div className="lsiting">
            <p className="mb-2"><span className="me-2">Payment details</span></p>
          </div>
            <div className="outerbox">
            <ul className="p-0 m-0">
              <li><span className="me-3">Payment method:</span>UPI</li>
               <li><span className="me-3">Payment time:</span>10.00 AM</li>
                <li><span className="me-3">discount coupons :</span>3%</li>
                <li><span className="me-3">Total amount paid :</span>1250.0</li>
            </ul>
         </div>
           <div className="lsiting">
            <div className="booked">
              <p className=" border-bottom-1  text-success">Booked</p>
               <div className="d-flex justify-content-between">
                 <p>Booking Time: 10:00 AM</p>
                 <p> Booking Date: 26/Nov/2025</p>
               </div>
              <p className=" text-danger">Refund processed</p>
              <div className="d-flex justify-content-between">
                <p>Refund Date: 27/Nov/2025</p>
                <p>Refund Time: 12:00 Am</p>
              
              </div>
              <div className="d-flex justify-content-between">
                <p>Refund credited in your account</p>
                <p>Refund with in 7 days</p>
              </div>
            </div>
          </div>
         


        
      </Modal.Body>
      
    </Modal>
        </Container>
       </section>
    </>
  );
}

export default ViewDetails;
