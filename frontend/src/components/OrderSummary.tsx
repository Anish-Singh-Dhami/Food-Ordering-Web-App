import { CartItemType } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type OrderSummaryProps = {
  restaurant: Restaurant;
  cartItems: CartItemType[];
  removeFromCart: (cartItem: CartItemType) => void;
};

const OrderSummary = ({
  restaurant,
  cartItems,
  removeFromCart,
}: OrderSummaryProps) => {
  const getTotalCost = () => {
    const totalCost = cartItems.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
    return totalCost + restaurant.deliveryPrice;
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => {
          return (
            <div key={item._id} className="flex justify-between">
              <span>
                <Badge variant="outline" className="mr-2">
                  {item.quantity}
                </Badge>
                <span>{item.name}</span>
              </span>
              <span className="flex items-center gap-1">
                <Trash
                  size={20}
                  color="red"
                  onClick={() => removeFromCart(item)}
                  className="cursor-pointer"
                />
                <span>₹{(item.quantity * item.price).toFixed(2)}</span>
              </span>
            </div>
          );
        })}
        <Separator />
        <div className="flex justify-between">
          <span className="font-semibold text-lg tracking-tight">
            Delivery Fee
          </span>
          <span>₹{restaurant.deliveryPrice.toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};
export { OrderSummary };
