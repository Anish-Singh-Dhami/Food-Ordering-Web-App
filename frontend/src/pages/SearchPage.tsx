import { useSearchRestaurants } from "@/api/RestaurantApi";
import {
  SearchBar,
  SearchForm,
  SearchResultCard,
  SearchResultInfo,
} from "@/components";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { restaurantsResult, isLoading } = useSearchRestaurants(
    searchState,
    city
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!restaurantsResult || !city) {
    return <span>No restaurants found</span>;
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines list here...</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder={"Search by Cuisine or Restaurant Name"}
          onReset={resetSearch}
        />
        <SearchResultInfo
          city={city}
          totalRestaurants={restaurantsResult.pagination.countMatchedRestaurant}
        />
        {restaurantsResult.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export { SearchPage };
