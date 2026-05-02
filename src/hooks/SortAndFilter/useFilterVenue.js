import { useMutation } from "@tanstack/react-query";
import { venueFilter } from "../../services/withoutLoginApi/SortAndFilter/endpointApi";

export const useFilterVenue = () => {
    return useMutation({
        mutationKey: ['FilterVenue'],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload must be an required");
            }
            return venueFilter( payload );
        },
        onSuccess: (data) => {
            return data;
        },
        onError: () => {},
    })
}