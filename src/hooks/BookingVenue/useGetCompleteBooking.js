import { useQuery } from "@tanstack/react-query";
import { getAllCompletedBooking } from "../../services/LoginApi/BookingApi/endpointsApi.js";

export const useGetCompleteBooking = () => {
  return useQuery({
    queryKey: ["completeBooking"],
    queryFn: getAllCompletedBooking,
  });
};
