import { useMutation } from "@tanstack/react-query";
import { Sort } from "../../services/withoutLoginApi/SortAndFilter/endpointApi";

export const useSortVenue = () => {
    return useMutation({
        mutationKey: ['SortVenue'],
        mutationFn: (payload) => {
            if (!payload) {
                throw new Error("payload must be an required");
            }
            console.log("in mutation section payload", payload);
            return Sort(payload);
        },
        onSuccess: (data) => {
            console.log("Sort venue successfully:", data);
            return data;
        },
        onError: (error) => {
            let errMsg = "An error occurred";
            if (error.response?.data?.message) {
                errMsg = error.response.data.message;
            } else if (error.message) {
                errMsg = error.message;
            }
            alert(errMsg);
            console.error("Error sorting venue:", error);
        },
    })
}