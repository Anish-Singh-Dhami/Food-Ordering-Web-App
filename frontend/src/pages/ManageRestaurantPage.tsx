import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { ManageRestaurantForm } from "@/forms";

const ManageRestaurantPage = () => {
  const { createRestaurant, isCreateLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isUpdateLoading } = useUpdateMyRestaurant();

  // converts the restaurant value to a boolean, signifies the value is present or not in restaurant variable.
  const isEditing = !!restaurant;
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      isLoading={isCreateLoading || isUpdateLoading}
      onSave={isEditing ? updateRestaurant : createRestaurant}
    />
  );
};

export { ManageRestaurantPage };
