import { useMutation } from "@tanstack/react-query";
import { CreateQuery } from "../../services/withoutLoginApi/CoachListApi/endpointApi";

export const useCreateQuery = () => {
  return useMutation({
    mutationFn: (payload) => {
      const {
        academyCoachesId,
        reciverId,
        message,
        chatType,
        title,
        body,
      } = payload;

      if (!academyCoachesId || !reciverId) {
        throw new Error("academyCoachesId & reciverId are required");
      }

      return CreateQuery({
        academyCoachesId,
        reciverId,
        message,
        chatType,
        title,
        body,
      });
    },
  });
};
