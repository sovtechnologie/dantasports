import { useQuery } from "@tanstack/react-query";
import {fetchSportList} from "../../services/withoutLoginApi/SportListApi/endpointApi.js";

export const useSportList = () =>{
    return useQuery({
        queryKey: ['sportList'],
        queryFn: fetchSportList,
    });
   
}