// import React, { useEffect, useState } from "react";
// import "./Stylesheets/CheckoutPricing.css";
// import CouponModal from "./CoupanModal";
// import toggleIcon from "../assets/toggleIcon.png";

// const CheckoutPricing = ({ totalPrice, convenienceFee, type, count = 10, setFinalAmount, venueId }) => {
//   const [insuranceSelected, setInsuranceSelected] = useState(false);
//   const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
//   const [discount, setDiscount] = useState(null);
//   const [couponDetails, setCouponDetails] = useState('');

//   // const basePrice = totalPrice;
//   // const insuranceFee = 20;

//   // const totalAmount =
//   //   basePrice + convenienceFee + (insuranceSelected ? insuranceFee : 0);

//   const basePrice = totalPrice;
//   const insuranceFee = 20;

//   // Calculate subtotal before discount
//   // subtotal before discount
//   const subtotal = basePrice + (basePrice > 0 ? convenienceFee : 0) + (insuranceSelected ? insuranceFee : 0);

//   // total after discount
//   const totalAmount = Math.max(subtotal - (discount || 0), 0);



//   useEffect(() => {
//     if (totalAmount) {
//       setFinalAmount(totalAmount);
//     }
//   }, [setFinalAmount, totalAmount]);


//   return (
//     <div className="checkout-box">
//       <div className="row">
//         <div className="toggleicon">
//           <span>Passes price x {count}</span>
//           <img src={toggleIcon} alt="toggleicon" style={{ height: "15px", width: "15px" }} />
//         </div>

//         <span>₹{basePrice}</span>
//       </div>
//       <div className="row">
//         <div className="toggleicon">

//           <span>Convenience fee</span>
//           <img src={toggleIcon} alt="toggleicon" style={{ height: "15px", width: "15px" }} />
//         </div>

//         <span>₹{convenienceFee}</span>
//       </div>
//       {/* <div className="row insurance-row">
//         <label>
//           <input
//             type="checkbox"
//             checked={insuranceSelected}
//             onChange={() => setInsuranceSelected(!insuranceSelected)}
//           />
//           Insurance cover fee (₹ 20/person)
//         </label>
//         <span>₹{insuranceFee}</span>
//       </div> */}
//       {discount ? (
//         <div className="applied-coupon">
//           <div className="coupon-info">
//             <span>Coupon Applied: {couponDetails.name}</span>
//             <span className="discount-amount">- ₹{discount}</span>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="coupon"
//           onClick={() => setIsCouponModalOpen(true)}
//           style={{ cursor: "pointer" }}
//         >
//           <span>Apply Coupon</span>
//           <span className="arrow">›</span>
//         </div>
//       )}

//       {discount && (<span>{discount},{couponDetails.name}</span>)}
//       <div className="total">
//         <span>Total amount</span>
//         <span className="total-amount">₹{totalAmount}</span>
//       </div>
//       {/* Coupon Modal */}
//       <CouponModal
//         isOpen={isCouponModalOpen}
//         onClose={() => setIsCouponModalOpen(false)}
//         type={type}
//         venueId={venueId}
//         totalAmount={subtotal} // pass subtotal (before discount)
//         onApply={({ coupon, apiResponse }) => {
//           console.log("Coupon Apply Response:", apiResponse);
//           const discountAmt =
//             apiResponse?.discount_amount
//               ? parseFloat(apiResponse.discount_amount)
//               : 0;
//           const couponName = coupon?.name || "Applied";
//           setCouponDetails({ name: couponName });
//           setDiscount(discountAmt);
//           setIsCouponModalOpen(false); // <-- CLOSE MODAL HERE
//         }}



//       />


//     </div>
//   );
// };

// export default CheckoutPricing;


import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stylesheets/CheckoutPricing.css";
import CouponModal from "./CoupanModal";
import { InfoCircle } from "react-bootstrap-icons";
import black from "../assets/toggleIcon.png"; // arrow icon
import arrow from "../../withoutauth/assets/icons/black-arrow.svg"
import InfoModal from "../../../components/InfoModal";

const CheckoutPricing = ({ totalPrice, price, convenienceFee, type, count, setFinalAmount, venueId, bookingData }) => {
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [couponDetails, setCouponDetails] = useState("");
  const [activeModal, setActiveModal] = useState(null); // 'pass' | 'convenience' | null

  // Force clean value (2 decimal max)
  const basePrice = Number((totalPrice || 0).toFixed(2));

  const insuranceFee = 20;

  // Subtotal (before discount)
  // const subtotal = basePrice + (basePrice > 0 ? convenienceFee : 0) + (insuranceSelected ? insuranceFee : 0);
  const totalAmount = Math.max(totalPrice - (discount || 0), 0);

  useEffect(() => {
    setFinalAmount(totalAmount);
  }, [setFinalAmount, totalAmount]);

  const formatConvenienceFee = (fee) => {
    if (fee == null) return "0";
    return Number(fee) % 1 === 0 ? `${fee}` : Number(fee).toFixed(2);
  };


  useEffect(() => {
    setDiscount(null);
    setCouponDetails("");
  }, [totalPrice]);

  return (
    <div className="mb-3">
      <div>
        <h3 className="details_page_titles">Price details</h3>

        {/* Passes Price */}
        <Row className="align-items-center mb-2">
          <Col xs={8} className="pass_price">
            Passes price x {count} <InfoCircle size={13} className="text-primary ms-1" onClick={() => setActiveModal("pass")} />
          </Col>
          <Col xs={4} className="pass_price text-end">
            <span>₹{price}</span>
          </Col>
        </Row>

        {/* Convenience Fee */}
        <Row className="align-items-center mb-3">
          <Col xs={8} className="pass_price">
            Convenience fee <InfoCircle size={13} className="text-primary ms-1" onClick={() => setActiveModal("convenience")} />
          </Col>
          <Col xs={4} className="pass_price text-end">
            <span>₹{formatConvenienceFee(convenienceFee)}</span>
          </Col>
        </Row>

        {/* <div className="line"></div> */}

        {/* Insurance Option */}
        {/* <Row className="align-items-center mb-2 border-top border-bottom ">
          <Col xs={9}>
            <Form.Check
              className="pt-3 pb-3"
              type="checkbox"
              id="insurance"
              label="Insurance cover fee (₹ 20/person)"
              checked={insuranceSelected}
              onChange={() => setInsuranceSelected(!insuranceSelected)}
            />
          </Col>
          <Col xs={3} className="pass_price text-end">
            <span>₹{insuranceFee}</span>
          </Col>
        </Row> */}


        {/* Coupon Section */}
        {discount ? (
          <div className="d-flex justify-content-between align-items-center pb-3 pt-3 ">
            <div className="fw-semibold apply_coupon text-success">
              Coupon Applied: {couponDetails.name}
            </div>
            <div className="pass_price text-end">-₹{discount}</div>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div
              className=" apply_coupon_btn pb-3 pt-3"
              role="button"
              onClick={() => setIsCouponModalOpen(true)}
            >
              Apply coupon
            </div>
            <div>
              <button className="border-0 bg-white" onClick={() => setIsCouponModalOpen(true)}>
                <span><img src={arrow} alt="" /></span>

              </button>
            </div>
          </div>
        )}

        {/* <div className="brd"></div> */}

        {/* Total Amount */}
        <Row className="align-items-center mt-2 border-top ">
          <Col className="total_amount pt-3">Total amount</Col>
          <Col className="text-end total_price pt-3">₹{totalAmount.toFixed(2)}</Col>
        </Row>
      </div>

      {/* Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)}
        type={type}
        venueId={venueId}
        totalAmount={totalPrice} // pass subtotal (before discount)
        onApply={({ coupon, apiResponse }) => {
          console.log("Coupon Apply Response:", apiResponse);
          const discountAmt =
            apiResponse?.discount_amount
              ? parseFloat(apiResponse.discount_amount)
              : 0;
          const couponName = coupon?.name || "Applied";
          setCouponDetails({ name: couponName });
          setDiscount(discountAmt);
          setIsCouponModalOpen(false); // <-- CLOSE MODAL HERE
        }}
      />

      {/* 🔹 Info Modals */}
      <InfoModal
        show={activeModal === "pass"}
        type="pass"
        onClose={() => setActiveModal(null)}
      />

      <InfoModal
        show={activeModal === "convenience"}
        bookingData={bookingData}
        type="convenience"
        onClose={() => setActiveModal(null)}
      />

    </div>
  );
};

export default CheckoutPricing;
