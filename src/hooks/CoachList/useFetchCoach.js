import { useQuery } from "@tanstack/react-query";
import { fetchCoachList } from "../../services/withoutLoginApi/CoachListApi/endpointApi";

export const useFetchCoach = () => {
    return useQuery({
        queryKey: ["CoachList"],
        queryFn: () => {
           return fetchCoachList();
        },
    });
};
