// src/hooks/Payments/useCreatePayment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../../services/LoginApi/PaymentApi/endpointsApi";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId) => createPayment(bookingId),
    onSuccess: (data, bookingId) => {
      console.log("Payment created for booking:", bookingId, data);

      // Optionally invalidate or refetch relevant query to update UI
      queryClient.invalidateQueries(["PaymentAndBookingDetails", bookingId]);
    },
    onError: (error, bookingId) => {
      console.error("Payment creation failed for booking:", bookingId, error);
      // Optional: display toast or notification
    },
  });
};
