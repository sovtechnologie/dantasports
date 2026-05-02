import { useMutation } from "@tanstack/react-query";
import { BookGym } from "../../services/LoginApi/BookGymApi/endpointApi";


export const useBookGym = () => {
  return useMutation({
    mutationKey: ["BookGym"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      return BookGym(payload);
    },
    onSuccess: (data) => {
    },
    onError: () => {},
  });
};