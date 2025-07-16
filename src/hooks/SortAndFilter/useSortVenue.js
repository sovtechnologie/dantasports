import { useMutation} from "@tanstack/react-query";
import { Sort } from "../../services/withoutLoginApi/SortAndFilter/endpointApi";

export const useSortVenue = () => {
    return useMutation({
        mutationKey: ['SortVenue'],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload must be an required");
            }
            console.log("in mutation section payload", payload);
            return Sort( payload );
        },
        onSuccess: (data) => {
            console.log("Sort venue successfully:", data);
            return data;
        },
        onError: (error) => {
            console.error("Error sorting venue:", error);
        },
    })
}