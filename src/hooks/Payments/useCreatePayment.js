// src/hooks/Payments/useCreatePayment.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../../services/LoginApi/PaymentApi/endpointsApi";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId) => createPayment(bookingId),
    onSuccess: (data, bookingId) => {
      console.log("Payment created for booking:", bookingId, data);

      // Example: redirect if paymentUrl present
      if (data?.url) {
         window.open(data?.url, "_blank");
      }

      // Optionally invalidate or refetch relevant query to update UI
      queryClient.invalidateQueries(["PaymentAndBookingDetails", bookingId]);
    },
    onError: (error, bookingId) => {
      let errMsg = "Payment creation failed.";
      if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error.message) {
        errMsg = error.message;
      }
      alert("error",errMsg);
      console.error("Payment creation failed for booking:", bookingId, error);

      // Optional: display toast or notification
    },
  });
};
