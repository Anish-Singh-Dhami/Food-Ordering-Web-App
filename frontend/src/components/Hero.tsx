import hero from "../assets/hero.png";

export function Hero() {
  return (
    <div>
      <img src={hero} className="w-full max-h-[600px] object-cover" />
    </div>
  );
}
