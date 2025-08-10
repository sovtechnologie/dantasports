import { useQuery } from "@tanstack/react-query";
import { fetchGymList,fetchGymListById } from "../../services/withoutLoginApi/GymListApi/endpointApi";

export const useFetchGym = (payload) => {
  return useQuery({
    queryKey: ["GymList", payload.userId],
    queryFn: () => {
      if (payload.userId) {
        return fetchGymListById(payload);
      } else {
        return fetchGymList(payload);
      }
    },
  });
};
