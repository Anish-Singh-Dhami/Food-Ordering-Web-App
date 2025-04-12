import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetRestaurantById = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch restaurant details");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: getRestaurantByIdRequest,
    enabled: !!restaurantId, // Only run the query if restaurantId is defined
  });

  return { restaurant, isLoading };
};

const useSearchRestaurants = (searchState: SearchState, city?: string) => {
  const queryParams = new URLSearchParams();
  queryParams.set("searchQuery", searchState.searchQuery);
  queryParams.set("page", searchState.page.toString());
  queryParams.set("selectedCuisines", searchState.selectedCuisines.join(","));
  queryParams.set("sortOption", searchState.sortOption);

  const searchRequest = async (): Promise<RestaurantSearchResult> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch restaurants");
    }

    return response.json();
  };

  const { data: restaurantsResult, isLoading } = useQuery({
    queryKey: ["restaurants", city, searchState],
    queryFn: searchRequest,
    enabled: !!city, // Only run the query if city is defined
  });

  return { restaurantsResult, isLoading };
};

export { useGetRestaurantById, useSearchRestaurants };
