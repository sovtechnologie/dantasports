import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useCreateVenueBooking = ({ payload }) => {
  return useMutation({
    mutationKey: ["createVenueBooking"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("paylaod must be an required");
      }
      return createBooking({ payload });
    },
    onSuccess: (data) => {
      console.log("Venue Booked successfully:", data);
    },
    onError: (error) => {
      console.error("Error Create Booking:", error);
    },
  });
};
