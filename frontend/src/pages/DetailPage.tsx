import { useGetRestaurantById } from "@/api/RestaurantApi";
import { RestaurantInfo } from "@/components";
import { MenuItem } from "@/components/MenuItemCard";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);

  if (isLoading || !restaurant) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-10 p-4">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-xl w-full h-full object-cover shadow-md"
        />
      </AspectRatio>
      <div className="grid lg:grid-cols-[repeat(1,minmax(0,2fr)_minmax(0,1fr))] gap-4 md:px-28">
        <div className="flex flex-col gap-4 ">
          <RestaurantInfo restaurant={restaurant} />
          <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
          <div className="flex flex-col gap-4">
            {restaurant.menuItems.map((menuItem, id) => (
              <MenuItem menuItem={menuItem} key={id} />
            ))}
          </div>
        </div>

        <div
          id="Order-Details-Card"
          className="flex flex-col gap-4 border-2 rounded-md p-4 shadow-md h-fit"
        >
          <h2 className="text-xl font-bold tracking-tight">Your Orders</h2>
        </div>
      </div>
    </div>
  );
};
export { DetailPage };
