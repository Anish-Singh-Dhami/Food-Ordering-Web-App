import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: RestaurantInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold text-3xl tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap">
        {restaurant.cuisines.map((cuisines, index) => (
          <span key={index} className="flex">
            <span>{cuisines}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};
export { RestaurantInfo };
