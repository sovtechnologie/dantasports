import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useCreateVenueBooking = () => {
  return useMutation({
    mutationKey: ["createVenueBooking"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      console.log("in mutation section payload", payload);
      return createBooking({ payload });
    },
    onSuccess: (data) => {
      console.log("Add Review successfully:", data);
    },
    onError: (error) => {
      console.error("Error Add Review:", error);
    },
  });
};
