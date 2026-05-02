import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddReview } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["AddReview"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      return AddReview({ payload });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["completeBooking"]);
    },
    onError: () => {},
  });
};
