import { RestaurantSearchResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSearchRestaurants = (city?: string) => {
  const searchRequest = async (): Promise<RestaurantSearchResult> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.json();
  };

  const { data: restaurantsResult, isLoading } = useQuery({
    queryKey: ["restaurants", city],
    queryFn: searchRequest,
    enabled: !!city, // Only run the query if city is defined
  });

  return { restaurantsResult, isLoading };
};

export { useSearchRestaurants };
