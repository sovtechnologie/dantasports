import { useMutation } from "@tanstack/react-query";
import { BookEvent } from "../../services/LoginApi/BookEventApi/endpointApi";

export const useBookEvent = () => {
  return useMutation({
    mutationKey: ["BookEvent"],
    mutationFn: (payload) => {
      if (!payload) {
        throw new Error("payload must be an required");
      }
      return BookEvent(payload);
    },
    onSuccess: (data) => {
    },
    onError: () => {},
  });
};