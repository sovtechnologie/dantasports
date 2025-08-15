import { useMutation } from "@tanstack/react-query";
import { venueFilter } from "../../services/withoutLoginApi/SortAndFilter/endpointApi";

export const useFilterVenue = () => {
    return useMutation({
        mutationKey: ['FilterVenue'],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload must be an required");
            }
            console.log("in mutation section payload", payload);
            return venueFilter( payload );
        },
        onSuccess: (data) => {
            console.log("filter venue successfully:", data);
            return data;
        },
        onError: (error) => {
            console.error("Error filter venue:", error);
        },
    })
}