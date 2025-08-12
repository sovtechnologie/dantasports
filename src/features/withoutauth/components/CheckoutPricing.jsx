import React, { useState } from "react";
import "./Stylesheets/CheckoutPricing.css";
import CouponModal from "./CoupanModal";

const CheckoutPricing = () => {
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const basePrice = 1290;
  const convenienceFee = 100;
  const insuranceFee = 20;

  const totalAmount =
    basePrice + convenienceFee + (insuranceSelected ? insuranceFee : 0);

  return (
    <div className="checkout-box">
      <div className="row">
        <span>Passes price x 10</span>
        <span>₹{basePrice}</span>
      </div>
      <div className="row">
        <span>Convenience fee</span>
        <span>₹{convenienceFee}</span>
      </div>
      <div className="row insurance-row">
        <label>
          <input
            type="checkbox"
            checked={insuranceSelected}
            onChange={() => setInsuranceSelected(!insuranceSelected)}
          />
          Insurance cover fee (₹ 20/person)
        </label>
        <span>₹{insuranceFee}</span>
      </div>
      <div className="coupon"
        onClick={() => setIsCouponModalOpen(true)}
        style={{ cursor: "pointer" }}>
        <span>Apply coupon</span>
        <span className="arrow">›</span>
      </div>
      <div className="total">
        <span>Total amount</span>
        <span className="total-amount">₹{totalAmount}</span>
      </div>
      {/* Coupon Modal */}
      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        type={2}
      />
    </div>
  );
};

export default CheckoutPricing;
