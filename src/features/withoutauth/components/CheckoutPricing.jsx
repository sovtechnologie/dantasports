import React, { useEffect, useState } from "react";
import "./Stylesheets/CheckoutPricing.css";
import CouponModal from "./CoupanModal";
import toggleIcon from "../assets/toggleIcon.png";

const CheckoutPricing = ({ totalPrice, convenienceFee, type, count = 10, setFinalAmount }) => {
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [couponDetails, setCouponDetails] = useState('');

  // const basePrice = totalPrice;
  // const insuranceFee = 20;

  // const totalAmount =
  //   basePrice + convenienceFee + (insuranceSelected ? insuranceFee : 0);

  const basePrice = totalPrice;
  const insuranceFee = 20;

  // Calculate subtotal before discount
  const subtotal =
    basePrice +
    (basePrice > 0 ? convenienceFee : 0) +
    (insuranceSelected ? insuranceFee : 0);


  // Calculate final total after discount
  const totalAmount = Math.max(subtotal - (discount || 0), 0);

  useEffect(() => {
    if (totalAmount) {
      setFinalAmount(totalAmount);
    }
  }, [setFinalAmount, totalAmount]);


  return (
    <div className="checkout-box">
      <div className="row">
        <div className="toggleicon">
          <span>Passes price x {count}</span>
          <img src={toggleIcon} alt="toggleicon" style={{ height: "15px", width: "15px" }} />
        </div>

        <span>₹{basePrice}</span>
      </div>
      <div className="row">
        <div className="toggleicon">

          <span>Convenience fee</span>
          <img src={toggleIcon} alt="toggleicon" style={{ height: "15px", width: "15px" }} />
        </div>

        <span>₹{convenienceFee}</span>
      </div>
      {/* <div className="row insurance-row">
        <label>
          <input
            type="checkbox"
            checked={insuranceSelected}
            onChange={() => setInsuranceSelected(!insuranceSelected)}
          />
          Insurance cover fee (₹ 20/person)
        </label>
        <span>₹{insuranceFee}</span>
      </div> */}
      <div className="coupon"
        onClick={() => setIsCouponModalOpen(true)}
        style={{ cursor: "pointer" }}>
        <span>Apply coupon</span>
        <span className="arrow">›</span>
      </div>
      {discount && (<span>{discount},{couponDetails.name}</span>)}
      <div className="total">
        <span>Total amount</span>
        <span className="total-amount">₹{totalAmount}</span>
      </div>
      {/* Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        type={type}
        totalAmount={totalAmount}
        onApply={({ coupon, apiResponse }) => {
          setCouponDetails(coupon);
          setDiscount(apiResponse?.discount_amount);
        }}
      />
    </div>
  );
};

export default CheckoutPricing;
