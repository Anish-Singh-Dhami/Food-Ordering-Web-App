import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import { ManageRestaurantForm } from "@/forms";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm restaurant={restaurant} isLoading={isLoading} onSave={createRestaurant} />
  );
};

export { ManageRestaurantPage };
