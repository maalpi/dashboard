import { useQuery } from "@tanstack/react-query";
import { fetchStravaActivities } from "@/lib/fetchStrava";

export function useStravaData() {
  return useQuery({
    queryKey: ["stravaActivities"],
    queryFn: fetchStravaActivities,
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    refetchOnWindowFocus: false,
  });
}
