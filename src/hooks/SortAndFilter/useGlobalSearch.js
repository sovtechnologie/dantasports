import { useMutation } from "@tanstack/react-query";
import { fetchGlobalSearchQuery } from "../../services/withoutLoginApi/SportListApi/endpointApi";


export const useGlobalSearch = () => {
  return useMutation({
    mutationFn: (searchTerm) => fetchGlobalSearchQuery(searchTerm),
  });
};