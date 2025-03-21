import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const RESTAURANT_END_POINT = "api/my/restaurant";

const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/${RESTAURANT_END_POINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant!");
    }

    return response.json();
  };

  const {
    data: restaurant,
    isError,
    isLoading: isGetLoading,
  } = useQuery({
    queryKey: ["getMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  if (isError) {
    toast.error("Unable to fetch user's restaurant details");
  }

  return { restaurant, isGetLoading };
};

const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/${RESTAURANT_END_POINT}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant!");
    }

    return response.json();
  };

  const {
    isSuccess,
    isError,
    isPending: isCreateLoading,
    mutate: createRestaurant,
  } = useMutation({ mutationFn: createMyRestaurantRequest });

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (isError) {
    toast.error("Unable to create restaurant!");
  }
  return { createRestaurant, isCreateLoading };
};

const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/${RESTAURANT_END_POINT}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to updated user's restaurant.");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isPending: isUpdateLoading,
    isSuccess,
    isError,
  } = useMutation({ mutationFn: updateRestaurantRequest });

  if (isSuccess) {
    toast.success("Restaurant details updated successfully!");
  }

  if (isError) {
    toast.error("Falied to updated restaurant details!");
  }

  return { updateRestaurant, isUpdateLoading };
};

export { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant };
