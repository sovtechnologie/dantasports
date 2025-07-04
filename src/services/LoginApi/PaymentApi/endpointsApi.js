import api from "../../api";

export const createPayment = async (bookingId) => {
  try {
    const response = await api.post("user/payment/createPayment", {
      bookingId,
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to create payment");
    throw error;
  }
};

export const fetchpaymentandBookingDetails = async (bookingId) => {
  try {
    console.log("inapi", bookingId);
    const response = await api.post(
      "user/bookings/getPaymentAndBookingDetails",
      { bookingId }
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch payment and booking deatils");
    throw error;
  }
};
