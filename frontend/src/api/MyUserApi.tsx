import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

/**
 * Custom hook to asynchronously sends a fetch request to our backend server
 * on the api endpoint 'domain_name/api/my/user'.
 * @returns `createUser`: Asnychronous function to create new authenticated users entry in our DB.
 * `isPending`: State variable indicating our asynchronous request is in pending state.
 * `isSuccess`: State variable indicating the completion our asynchronous request with success.
 * `isError`: State variable indicating the completion our asynchronous request with failure.
 */
const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };
  const {
    isPending,
    isSuccess,
    isError,
    mutateAsync: createUser,
  } = useMutation({ mutationFn: createMyUserRequest });
  return {
    isSuccess,
    isPending,
    isError,
    createUser,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

/**
 * Custom Hook to asynchronously sends a fetch request to our backend server
 * on the api end point `domain_name/api/my/user`, to update our current user's info on our DB.
 * @returns `updateUser`: Asynchronous function to update the current user's(authencticated) entry in our db.
 * `isPending`: State variable indicating our asynchronous request is in pending state.
 */
const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user!");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isError,
    isPending,
    isSuccess,
    error,
    reset,
  } = useMutation({ mutationFn: updateMyUserRequest });

  if (isSuccess) {
    toast.success("User Profile Updated!");
  }

  if (isError) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isPending };
};

/**
 * Custom Hook to asynchronously sends a fetch request to our backend server
 * on the api end point `domain_name/api/my/user`, to get our current user's info.
 * @returns `currentUser`: Current User object.
 * `isLoading`: State variable indicating our asynchronous request is in pending state.
 */
const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({ queryKey: ["getMyUser"], queryFn: getMyUserRequest });

  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
};
export { useCreateMyUser, useUpdateMyUser, useGetMyUser };
