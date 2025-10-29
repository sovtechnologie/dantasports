// import React, { useState } from "react";
// import { Card, Row, Col, Form } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { InfoCircle } from "react-bootstrap-icons";

// const PriceDetails = () => {
//   const [insurance, setInsurance] = useState(false);

//   const passesPrice = 1290;
//   const platformFee = 100;
//   const insuranceFee = 20;
//   const totalAmount = passesPrice + platformFee + (insurance ? insuranceFee : 0);

//   return (
//     <Card className="shadow-sm border-0 rounded-4 p-3" style={{ maxWidth: "400px" }}>
//       <Card.Body>
//         {/* Heading */}
//         <h5 className="fw-semibold mb-3">Price details</h5>

//         {/* Passes Price */}
//         <Row className="align-items-center mb-2">
//           <Col xs={8} className="text-muted">
//             Passes price x 10 <InfoCircle size={13} className="text-primary ms-1" />
//           </Col>
//           <Col xs={4} className="text-end fw-semibold">₹{passesPrice}</Col>
//         </Row>

//         {/* Platform Fee */}
//         <Row className="align-items-center mb-2">
//           <Col xs={8} className="text-muted">
//             Platform fee <InfoCircle size={13} className="text-primary ms-1" />
//           </Col>
//           <Col xs={4} className="text-end fw-semibold">₹{platformFee}</Col>
//         </Row>

//         <hr className="my-2" />

//         {/* Insurance Option */}
//         <Row className="align-items-center mb-2">
//           <Col xs={9}>
//             <Form.Check
//               type="checkbox"
//               id="insurance"
//               label="Insurance cover fee (₹ 20/person)"
//               checked={insurance}
//               onChange={() => setInsurance(!insurance)}
//             />
//           </Col>
//           <Col xs={3} className="text-end fw-semibold text-muted">₹{insuranceFee}</Col>
//         </Row>

//         <hr className="my-2" />

//         {/* Apply Coupon */}
//         <div
//           className="fw-semibold text-warning mb-2"
//           role="button"
//         >
//           Apply coupon
//         </div>

//         {/* Total Amount */}
//         <Row className="align-items-center mt-2">
//           <Col className="fw-semibold">Total amount</Col>
//           <Col className="text-end fw-semibold text-primary">₹{totalAmount}</Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// };

// export default PriceDetails;
