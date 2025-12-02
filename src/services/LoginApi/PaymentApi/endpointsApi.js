import api from "../../api";

export const createPayment = async (bookingId) => {
  try {
    const response = await api.post("user/payment/createPayment", {bookingId});
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

export const saveCouponUsesAndConvenienceFess = async (payload) => {
  try {
    const response = await api.post(
      "user/bookings/saveCouponUsesAndConvenienceFess",
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Failed to save coupon uses & convenience fees", error);
    throw error;
  }
};


export const CancelBooking = async ({ bookingId, type }) => {
  try {
    const response = await api.post("user/bookings/cancelBooking", {
      bookingId,
      type
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to Cancel the Booking", error);
    throw error;
  }
};



export const CreateBookingPayment = async(payload) =>{
  try {
    const response  = await api.post("user/payment/createBookingPayments",payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to create booking payments",error);
    throw error;
  }
}

export const getBookedDetailsById = async ({ bookingId, type }) => {
  try {
    const response = await api.post("user/bookings/getBookedDetailsBYId", {
      bookingId,
      type
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch booked details", error);
    throw error;
  }
};