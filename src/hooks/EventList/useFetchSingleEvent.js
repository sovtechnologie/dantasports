import { useQuery } from "@tanstack/react-query";
import { fetchSingleEventRunDetail } from "../../services/withoutLoginApi/Event_RunListApi/endpointApi";

export const useFetchSingleEvent = (payload) => {
  return useQuery({
    queryKey: ["EventDetails", payload.id],
    queryFn: () => {
      if (payload) {
        return fetchSingleEventRunDetail(payload);
      }
    },
  });
};
