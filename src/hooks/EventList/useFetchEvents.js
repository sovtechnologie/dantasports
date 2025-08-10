import { useQuery } from "@tanstack/react-query";
import { fetchEventRunList,fetchEventRunListById } from "../../services/withoutLoginApi/Event_RunListApi/endpointApi";

export const useFetchEvent = (payload) => {
  return useQuery({
    queryKey: ["EventList", payload.userId],
    queryFn: () => {
      if (payload.userId) {
        return fetchEventRunListById(payload);
      } else {
        return fetchEventRunList(payload);
      }
    },
  });
};
