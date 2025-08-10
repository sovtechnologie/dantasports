import { useQuery } from "@tanstack/react-query";
import { fetchCoachDetails } from "../../services/withoutLoginApi/CoachListApi/endpointApi";

export const useFetchCoachDetails = (id) => {
    return useQuery({
        queryKey: ["CoachDetails",id],
        queryFn: () => {
           return fetchCoachDetails(id);
        },
    });
};