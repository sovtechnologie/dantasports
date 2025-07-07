import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useGetAllBooking = () => {
  return useQuery({
    queryKey: ["AllBooking"],
    queryFn: getAllBookings,
  });
};
