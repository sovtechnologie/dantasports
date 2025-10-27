import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/LoginApi/BookingApi/endpointsApi";


export const useUpdateBooking = () => {
  return useMutation({
    mutationFn: async (payload) => {
      console.log("Update Booking Payload:", payload);
      const response = await updateBooking(payload);
      return response;
    },
    onSuccess: (data) => {
      console.log("Booking updated successfully ", data);
    },
    onError: (error) => {
      console.error("Error updating booking ", error);
    },
  });
};
