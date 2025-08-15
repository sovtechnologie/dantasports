import { useQuery } from "@tanstack/react-query";
import { fetchCoupanList } from "../../services/LoginApi/CoupanApi/endpointApi";

export const useFetchCoupan = (payload) =>{
    return useQuery({
        queryKey: ["CoupanList",payload?.type],
        queryFn: () => {
           return fetchCoupanList(payload);
        },
        enabled: !!payload
    });
}