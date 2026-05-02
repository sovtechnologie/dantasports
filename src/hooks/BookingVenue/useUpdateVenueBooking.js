import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/LoginApi/BookingApi/endpointsApi";


export const useUpdateBooking = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateBooking(payload);
      return response;
    },
    onSuccess: (data) => {
    },
    onError: () => {},
  });
};
