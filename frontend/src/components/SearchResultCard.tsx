import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type SearchResultCardProps = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: SearchResultCardProps) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
          className="rounded-lg h-full w-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((cuisine, index) => (
              <div className="flex" key={index}>
                <span>{cuisine}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} min
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery Price: Rs {restaurant.deliveryPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { SearchResultCard };
