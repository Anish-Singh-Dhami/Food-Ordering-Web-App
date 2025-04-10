import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const SORT_OPTIONS = [
  {
    label: "Best Match",
    value: "bestMatch",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
];

type SortOptionDropDownProps = {
  sortOption: string;
  onChange: (option: string) => void;
};

const SortOptionDropDown = ({
  sortOption,
  onChange,
}: SortOptionDropDownProps) => {
  const selectedSortOption =
    SORT_OPTIONS.find((option) => option.value === sortOption)?.label ||
    SORT_OPTIONS[0].label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"} className="w-full">
          Sort By: {selectedSortOption}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem>
            <Button
              variant={"ghost"}
              className="w-full justify-start"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { SortOptionDropDown };
