import { useQuery } from "@tanstack/react-query";
import { fetchHostList } from "../../services/withoutLoginApi/HostAndPlayApi/endpointApi";

export const useFetchHostList = (payload) => {
    return useQuery({
        queryKey: ["HostList", payload.lat, payload.lng],
        queryFn: () => {
            return fetchHostList(payload);
        },
        enabled: Boolean(payload.lat && payload.lng),
    })
}