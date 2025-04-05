import landingImg from "../assets/landing.png";
import appsDownload from "../assets/appDownload.png";
import { SearchBar, SearchForm } from "@/components";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFrom: SearchForm) => {
    console.log("Handle Search Submit is called", searchFrom);
    navigate({
      pathname: `/search/${searchFrom.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 flex flex-col gap-5 bg-white py-8 rounded-lg -mt-16 shadow-lg text-center ">
        <h1 className="text-4xl font-bold text-orange-500 tracking-tighter">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <img src={landingImg} />
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-3xl font-bold tracking-tighter">
            Order takeaway even faster!
          </span>
          <span className="text-center">
            Download the MearEats App for faster ordering and personalised
            recommendations.
          </span>
          <img src={appsDownload} />
        </div>
      </div>
    </div>
  );
};

export { HomePage };
