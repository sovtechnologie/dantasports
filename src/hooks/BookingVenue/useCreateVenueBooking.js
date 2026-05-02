import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useCreateVenueBooking = () => {
  return useMutation({
    mutationKey: ["createVenueBooking"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      return createBooking(payload);
    },
    onSuccess: (data) => {
    },
    onError: () => {},
  });
};
