import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelBooking } from "../../services/LoginApi/PaymentApi/endpointsApi.js";
import { use } from "react";

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId) => CancelBooking(bookingId),
    onSuccess: (data, bookingId) => {
      console.log("Booking Cancelled:", bookingId, data);

      // Optionally invalidate or refetch relevant query to update UI
      queryClient.invalidateQueries(["PaymentAndBookingDetails", bookingId]);
    },
    onError: (error, bookingId) => {
      console.error("Booking Cancelled failed :", bookingId, error);
      // Optional: display toast or notification
    },
  });
};
