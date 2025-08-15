import { useQuery } from "@tanstack/react-query";
import { fetchCoachList } from "../../services/withoutLoginApi/CoachListApi/endpointApi";

export const useFetchCoach = (payload) => {
    return useQuery({
        queryKey: ["CoachList", payload.lat, payload.lng],
        queryFn: () => {
            return fetchCoachList();
        },
        enabled: Boolean(payload.lat && payload.lng),
    });
};
