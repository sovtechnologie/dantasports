// src/hooks/Payments/useCreatePayment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBookingPayment } from "../../services/LoginApi/PaymentApi/endpointsApi";

export const useCreateBookingPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, amount, type }) => CreateBookingPayment({ bookingId, amount, type }),
    onSuccess: (data, variables) => {
      console.log("Payment created for booking:", variables.bookingId, data);

      // Example: redirect if paymentUrl present
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      }

      // Optionally invalidate or refetch relevant query to update UI
    //   queryClient.invalidateQueries(["PaymentAndBookingDetails", variables.bookingId]);
    },
    onError: (error, variables) => {
      console.error("Payment creation failed for booking:", variables.bookingId, error);
      // Optional: display toast or notification
    },
  });
};
