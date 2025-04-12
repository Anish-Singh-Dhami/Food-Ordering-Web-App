import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
      <DropdownMenuTrigger className="border-2 rounded-lg py-1 px-2 font-semibold tracking-tight">
        Sort By: {selectedSortOption}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option, index) => (
          <DropdownMenuItem
            key={index}
            className="w-full gap-2"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export { SortOptionDropDown };
