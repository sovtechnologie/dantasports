import { useMutation } from "@tanstack/react-query";
import { AddReview } from "../../services/LoginApi/BookingApi/endpointsApi";

export const useAddReview = () => {
  return useMutation({
    mutationKey: ["AddReview"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      console.log("in mutation section payload", payload);
      return AddReview({ payload });
    },
  });
};
