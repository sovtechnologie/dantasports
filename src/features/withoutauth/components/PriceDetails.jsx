import React, { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../withoutauth/Stylesheets/Filterpages/PriceDetails.css"
import black from "../../withoutauth/assets/icons/black-arrow.svg"

import { InfoCircle } from "react-bootstrap-icons";

const PriceDetails = () => {
    const [insurance, setInsurance] = useState(false);

    const passesPrice = 1290;
    const platformFee = 100;
    const insuranceFee = 20;
    const totalAmount = passesPrice + platformFee + (insurance ? insuranceFee : 0);

    return (
        <Card className="mb-3 priceing_details border-0">
            <Card.Body className="p-0">
                {/* Heading */}
               
               <h3 className="details_page_titles">Price details</h3>

                {/* Passes Price */}
                <Row className="align-items-center mb-2">
                    <Col xs={8} className="text-muted fw-light">
                        Passes price x 10 <InfoCircle size={13} className="text-primary ms-1" />
                    </Col>
                    <Col xs={4} className="text-end fw-semibold"> <span className="light_txt">₹{passesPrice}</span></Col>
                </Row>

                {/* Platform Fee */}
                <Row className="align-items-center mb-2">
                    <Col xs={8} className="text-muted fw-light">
                        Platform fee <InfoCircle size={13} className="text-primary ms-1" />
                    </Col>
                    <Col xs={4} className="text-end fw-semibold"><span className="light_txt">₹{platformFee}</span></Col>
                </Row>

                

                {/* Insurance Option */}
                <Row className="align-items-center mb-2">
                    <div className="brd"></div>
                    <Col xs={9} className="">
                        <Form.Check className="pt-2 pb-2"
                            type="checkbox"
                            id="insurance"
                            label="Insurance cover fee (₹ 20/person)"
                            checked={insurance}
                            onChange={() => setInsurance(!insurance)}
                        />
                    </Col>
                    
                    <Col xs={3} className="text-end fw-semibold text-muted"><span className="light_txt">₹{insuranceFee}</span></Col>
              
                </Row>
                      <div className="brd"></div>


                {/* Apply Coupon */}
                <div className="d-flex justify-content-between align-items-center ">
                    <div
                    className="fw-semibold apply_coupon pb-3 pt-3"
                    role="button"
                >
                    Apply coupon
                </div>
                <div>
                    <button className="btn"><img src={black} alt="" /></button>
                </div>
                </div>
                 <div className="brd"></div>
                {/* Total Amount */}
                <Row className="align-items-center mt-2">
                    <Col className="fw-semibold">Total amount</Col>
                    <Col className="text-end fw-semibold text-primary">₹{totalAmount}</Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PriceDetails;
