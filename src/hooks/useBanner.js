import { useQuery } from "@tanstack/react-query";
import { FetchBanner } from "../services/withoutLoginApi/GetBannerApi/endpointApi";

export const useBanner = (pageNo = 1) => {
  return useQuery({
    queryKey: ['banner', pageNo],
    queryFn: () => FetchBanner({ pageNo }),
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
