import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { restaurantsResult } = useSearchRestaurants(city);

  return (
    <>
      <span>User Searched for {city}</span>
      <br />
      <span>
        {restaurantsResult?.data.map((restaurant) => (
          <span>
            found - {restaurant.restaurantName} in {restaurant.city} <br />
          </span>
        ))}
      </span>
    </>
  );
};

export { SearchPage };
