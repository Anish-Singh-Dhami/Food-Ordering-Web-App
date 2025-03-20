import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type CuisineCheckboxProp = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};
const CuisineCheckbox = ({ cuisine, field }: CuisineCheckboxProp) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            return checked
              ? field.onChange([...field.value, cuisine])
              : field.onChange(
                  field.value.filter((value: string) => value != cuisine)
                );
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export { CuisineCheckbox };
