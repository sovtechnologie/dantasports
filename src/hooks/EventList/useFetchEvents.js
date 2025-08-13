import { useQuery } from "@tanstack/react-query";
import { fetchEventRunList, fetchEventRunListById } from "../../services/withoutLoginApi/Event_RunListApi/endpointApi";

export const useFetchEvent = (payload) => {
  return useQuery({
    queryKey:
      payload.type === 1
        ? ["EventList", payload.userId]
        : ["RunList", payload.userId],
    queryFn: () => {
      if (payload.userId) {
        return fetchEventRunListById(payload);
      } else {
        return fetchEventRunList(payload);
      }
    },
  });
};
