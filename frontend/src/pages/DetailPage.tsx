import { useGetRestaurantById } from "@/api/RestaurantApi";
import { MenuItemCard, RestaurantInfo, OrderSummary } from "@/components";
import { Card } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItemType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId);

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      if (existingCartItem) {
        return prevCartItems.map((cartItem) => {
          return cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      } else {
        return [
          ...prevCartItems,
          {
            ...menuItem,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItem: CartItemType) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => {
        return item._id !== cartItem._id;
      });
    });
  };

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
              <MenuItemCard
                menuItem={menuItem}
                key={id}
                addToCart={() => addToCart(menuItem)}
              />
            ))}
          </div>
        </div>

        <div id="Order-Details-Card">
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};
export { DetailPage };
