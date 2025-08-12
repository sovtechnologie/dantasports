import React, { useState } from "react";
import styles from "./Stylesheets/CouponModal.module.css";
import { useFetchCoupan } from "../../../hooks/Coupans/useFetchCoupan";
import { useApplyCoupan } from "../../../hooks/Coupans/useApplyCoupan";
import { useSelector } from "react-redux";

const mapCoupanData = (apiData) => {
    // Format discount text based on type
    const discountText =
        apiData?.coupon_type === "percentage"
            ? `Get ${parseFloat(apiData?.value)}% off up to ₹${parseFloat(apiData?.maximum_discount_value)}`
            : `Get ₹${parseFloat(apiData?.value)} off`;

    // Build details array
    const detailsList = [
        `Minimum booking value ₹${parseFloat(apiData?.minium_booking_value)}`,
        `Valid from ${apiData?.start_date ? new Date(apiData.start_date).toLocaleDateString() : "N/A"} to ${apiData?.expiry_date ? new Date(apiData.expiry_date).toLocaleDateString() : "N/A"
        }`,
        // `Applicable on sports IDs: ${(apiData?.sports_id || []).join(", ")}`,
        apiData?.coupon_description || "No description available",
    ];

    return {
        id: apiData?.id,
        name: apiData?.coupon_code || "",
        discount: discountText,
        details: detailsList,
        type: apiData?.coupon_type || "",
        value: parseFloat(apiData?.value) || 0,
        maxDiscount: parseFloat(apiData?.maximum_discount_value) || 0,
        minBooking: parseFloat(apiData?.minium_booking_value) || 0,
        sportsIds: apiData?.sports_id || [],
        startDate: apiData?.start_date ? new Date(apiData.start_date) : null,
        expiryDate: apiData?.expiry_date ? new Date(apiData.expiry_date) : null,
        vendorId: apiData?.vendor_id || null,
        venueId: apiData?.venue_id || null,
    };
};



export default function CouponModal({ isOpen, onClose, type, totalAmount ,onApply }) {
    const userId = useSelector((state) => state.auth?.id);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { data: coupanlistdata } = useFetchCoupan({ type: type })

    const coupons = Array.isArray(coupanlistdata?.result) && coupanlistdata.result.length > 0
        ? coupanlistdata.result.map(mapCoupanData)
        : [];
    console.log("coupanlist", coupons);

    const filteredCoupons = coupons?.filter(coupon =>
        coupon?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const { mutateAsync: applyCoupan, isLoading, error } = useApplyCoupan();

    // Handle Apply button click
    const handleApply = async () => {
        if (!selected) return;
        const couponToApply = coupons.find((c) => c.id === selected);
        if (!couponToApply) return;

        const payload = {
            userId,
            totalAmount,
            couponCode: couponToApply.name,
            sportsIdArrays: couponToApply.sportsIds,
            type,
        };

        try {
            const response = await applyCoupan(payload);
             if (onApply) onApply({ coupon: couponToApply, apiResponse: response?.result[0] });
            onClose();
        } catch (e) {
            console.error("Failed to apply coupon", e);
        }
    };




    if (!isOpen) return null;



    return (

        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Enter Coupon"
                        className={styles.couponInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingRight: "24px" }}
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            style={{
                                position: "absolute",
                                right: "50%",
                                top: "40%",
                                transform: "translateY(-50%)",
                                background: "transparent",
                                border: "none",
                                fontSize: "20px",
                                cursor: "pointer",
                                color: "#666",
                                padding: 0,
                                lineHeight: 1,
                            }}
                            aria-label="Clear search"
                            type="button"
                        >
                            &times;
                        </button>
                    )}
                </div>


                {/* Scrollable area */}
                <div className={styles.couponList}>
                    {filteredCoupons.length > 0 ? (
                        filteredCoupons?.map((coupon, index) => (
                            <label
                                key={index}
                                className={`${styles.couponCard} ${selected === coupon.id ? styles.selected : ""
                                    }`}
                            >
                                <div className={styles.couponInfo}>
                                    <h4>{coupon.name}</h4>
                                    <p className={styles.discount}>{coupon.discount}</p>
                                    <ul>
                                        {coupon?.details.map((d, idx) => (
                                            <li key={idx}>{d}</li>
                                        ))}
                                    </ul>
                                </div>
                                <input
                                    type="radio"
                                    name="coupon"
                                    checked={selected === coupon.id}
                                    onChange={() => setSelected(coupon.id)}
                                    className={styles.coupanRadio}
                                />
                            </label>
                        ))
                    ) : (
                        <p>No coupons found</p>
                    )
                    }

                </div>

                <button
                    className={styles.applyBtn}
                    onClick={handleApply}
                    disabled={!selected || isLoading}
                    aria-disabled={!selected || isLoading}>
                    {isLoading ? "Applying..." : "APPLY"}
                </button>
                {error && <p className={styles.errorText}>Failed to apply coupon. Please try again.</p>}
            </div>
        </div>

    );
}
