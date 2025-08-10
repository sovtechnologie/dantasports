import { useQuery } from "@tanstack/react-query";
import { fetchGymPrice } from "../../services/withoutLoginApi/GymListApi/endpointApi";


export const useFetchGymPrice = (gymId) => {
    return useQuery({
        queryKey: ["GymPrice", gymId],
        queryFn: () => {
            if (gymId) {
                return fetchGymPrice(gymId);
            }
        },
    });
}; 