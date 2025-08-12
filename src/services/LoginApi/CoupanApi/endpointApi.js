import api from "../../api";

export const fetchCoupanList = async(payload) =>{
    try {
        const response = await api.post("user/bookings/getCouponList",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to Fetch coupan list",error)
        throw error;
    }
}

export const ApplyCoupan = async(payload) =>{
    try {
        const response = await api.post("user/bookings/applyCoupon",payload);
        return response?.data;
    } catch (error) {
        console.error("Failed to Apply coupan",error);
        throw error;
    }
}