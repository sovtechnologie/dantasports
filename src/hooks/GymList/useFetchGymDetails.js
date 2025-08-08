import { useQuery } from "@tanstack/react-query";
import { fetchGymDetails } from "../../services/withoutLoginApi/GymListApi/endpointApi";


export const useFetchGymDetail = (gymId) => {
    return useQuery({
        queryKey: ["GymDetails", gymId],
        queryFn: () => {
            if (gymId) {
                return fetchGymDetails(gymId);
            }
        },
    });
}; 