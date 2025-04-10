import { cuisinesList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type CuisineFilterProps = {
  selectedCuisines: string[];
  onChange: (cuisines: string[]) => void;
  isExpanded: boolean;
  toggleIsExpanded: () => void;
};

const CuisineFilter = ({
  selectedCuisines,
  onChange,
  isExpanded,
  toggleIsExpanded,
}: CuisineFilterProps) => {
  const handleReset = () => onChange([]);
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id: selectedCuisine, checked } = event.target;
    const newCuisinesList = checked
      ? [...selectedCuisines, selectedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== selectedCuisine);
    onChange(newCuisinesList);
  };
  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h2 className="text-xl font-bold">Filter By Cuisine</h2>
        <button
          className="text-sm font-semibold text-blue-600 underline"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
      
      <div className="flex flex-col space-y-2">
        {cuisinesList
          .slice(0, isExpanded ? cuisinesList.length : 7)
          .map((item) => {
            const isSelected = selectedCuisines.includes(item.cuisine);
            return (
              <div key={item.id} className="flex items-center">
                <input
                  id={item.cuisine}
                  type="checkbox"
                  className="hidden"
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={item.cuisine}
                  className={`flex flex-1 cursor-pointer text-sm font-semibold rounded-full px-4 py-2 ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {item.cuisine}
                </Label>
              </div>
            );
          })}

        <Button onClick={toggleIsExpanded} variant="link" className="flex-1">
          {isExpanded ? (
            <span className="flex items-center gap-2">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
export { CuisineFilter };
