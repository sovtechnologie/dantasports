import { useQuery } from "@tanstack/react-query";
import { fetchGymDetails } from "../../services/withoutLoginApi/GymListApi/endpointApi";


export const useFetchGymDetail = (payload) => {
    return useQuery({
        queryKey: ["GymDetails", payload.gymId],
        queryFn: () => {
            if (payload.gymId) {
                return fetchGymDetails(payload);
            }
        },
    });
}; 