import { useSearchRestaurants } from "@/api/RestaurantApi";
import {
  CuisineFilter,
  PaginationSelector,
  SearchBar,
  SearchForm,
  SearchResultCard,
  SearchResultInfo,
} from "@/components";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setCuisines = (cuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines: cuisines,
      page: 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <CuisineFilter
        onChange={setCuisines}
        selectedCuisines={searchState.selectedCuisines}
        isExpanded={isExpanded}
        toggleIsExpanded={() => setIsExpanded((prev) => !prev)}
      />

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

        <PaginationSelector
          page={restaurantsResult.pagination.currentPage}
          totalPages={restaurantsResult.pagination.totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export { SearchPage };
