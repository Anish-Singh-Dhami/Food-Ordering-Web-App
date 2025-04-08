import { Link } from "react-router-dom";

type SearchResultInfoProps = {
  city: string;
  totalRestaurants: number;
};

const SearchResultInfo = ({
  city,
  totalRestaurants,
}: SearchResultInfoProps) => {
  return (
    <div className="flex flex-col justify-between lg:items-center lg:flex-row text-xl font-bold">
      <span>
        {totalRestaurants} Restaurants found in {city}
        <Link
          to="/"
          className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500"
        >
          Change Location
        </Link>
      </span>
      Insert DropDown for sorting here...
    </div>
  );
};

export { SearchResultInfo };
