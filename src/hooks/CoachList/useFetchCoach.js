import { useQuery } from "@tanstack/react-query";
import { fetchCoachList } from "../../services/withoutLoginApi/CoachListApi/endpointApi";

export const useFetchCoach = (payload) => {
  return useQuery({
    queryKey: ["CoachList", payload.lat, payload.lng, payload.userId || null],
    queryFn: () => fetchCoachList(payload),
    enabled: Boolean(payload.lat && payload.lng), 
  });
};
