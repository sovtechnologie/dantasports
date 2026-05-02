// src/hooks/Payments/useCreatePayment.js
import { useMutation } from "@tanstack/react-query";
import { CreateBookingPayment } from "../../services/LoginApi/PaymentApi/endpointsApi";

export const useCreateBookingPayment = () => {
  return useMutation({
    mutationFn: ({ bookingId, amount, type, couponId, discountAmount, convenienceFees }) =>
      CreateBookingPayment({
        bookingId,
        amount,
        type,
        couponId,
        discountAmount,
        convenienceFees
      }),

    onSuccess: (data, variables) => {

      if (data?.result) {
        window.open(data?.result, "_blank");
      }
    },

    onError: (error, variables) => {
      let errMsg = "Payment creation failed.";
      if (error.response?.data?.message) {
        errMsg = error.response.data.message;
      } else if (error.message) {
        errMsg = error.message;
      }
      alert("error", errMsg);
    },
  });
};
