import { useQuery } from "@tanstack/react-query";
import { fetchpaymentandBookingDetails } from "../../services/LoginApi/PaymentApi/endpointsApi";

export const usePaymentDetails = (bookingId) => {
  console.log("in usePaymentDetaisl", bookingId);
  return useQuery({
    queryKey: ["PaymentAndBookingDetails", bookingId],
    queryFn: () => fetchpaymentandBookingDetails(bookingId),
    enabled: Boolean(bookingId), // optional: skip fetch until bookingId exists
  });
};
