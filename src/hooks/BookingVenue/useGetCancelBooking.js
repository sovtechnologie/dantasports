import { useQuery } from "@tanstack/react-query";
import { getAllCancelBooking } from "../../services/LoginApi/BookingApi/endpointsApi.js";

export const useGetCancelBooking = () => {
  return useQuery({
    queryKey: ["CancelBooking"],
    queryFn: getAllCancelBooking,
  });
};
