import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useGetAllBooking = (enable) => {
  return useQuery({
    queryKey: ["AllBooking"],
    queryFn: getAllBookings,
    enabled: enable,
  });
};
