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
      console.log("in mutation section payload", payload);
      return AddReview({ payload });
    },
    onSuccess: (data) => {
      console.log("Reviw Add successfully:", data);
      queryClient.invalidateQueries(["completeBooking"]);
    },
    onError: (error) => {
      console.error("Error adding Review:", error);
    },
  });
};
