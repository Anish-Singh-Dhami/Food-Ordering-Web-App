import landingImg from "../assets/landing.png";
import appsDownload from "../assets/appDownload.png";

function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 bg-white py-8 rounded-lg -mt-16 shadow-lg items-center">
        <h1 className="text-4xl font-bold text-orange-500 tracking-tighter">
          Tuck into a takeaway today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
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
}

export { HomePage };
