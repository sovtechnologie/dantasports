import api from "../../api";

export const createBooking = async ({ payload }) => {
  try {
    console.log("in api section payload", payload);
    const response = await api.post("user/bookings/createBookings", payload);
    return response?.data;
  } catch (error) {
    console.error("Failed to create booking");
    throw error;
  }
};

export const cancelBooking = async ({ bookingId }) => {
  try {
    const response = await api.post("user/bookings/cancelBooking", {
      bookingId,
    });
    return response?.data;
  } catch (error) {
    console.error("failed to cancel booking");
    throw error;
  }
};

export const getAllBookings = async ({ venueId }) => {
  try {
    const response = await api.post("user/bookings/getAllBookings", {
      venueId,
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch all booking");
    throw error;
  }
};

export const getBookingDetailsById = async ({ bookingId }) => {
  try {
    const response = await api.post("user/bookings/getBookingDetailsById", {
      bookingId,
    });
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch single booking details");
    throw error;
  }
};

export const getAllCancelBooking = async () => {
  try {
    const response = await api.get("user/bookings/getCancelBookings");
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch All cancel booking", error);
    throw error;
  }
};

export const getAllCompletedBooking = async () => {
  try {
    const response = await api.get("user/bookings/getCompleteBooking");
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch All completed Booking");
    throw error;
  }
};
