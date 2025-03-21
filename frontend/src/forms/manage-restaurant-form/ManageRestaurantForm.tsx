import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DetailsSection } from "./DetailsSection";
import { CuisinesSection } from "./CuisinesSection";
import { Separator } from "@/components/ui/separator";
import { MenuSection } from "./MenuSection";
import { ImageSection } from "./ImageSection";
import { LoadingButton } from "@/components";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Restaurant name is required.",
    }),
    city: z.string({ required_error: "City is required." }),
    country: z.string({ required_error: "Country is required." }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required.",
      invalid_type_error: "Must be a valid number.",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required.",
      invalid_type_error: "Must be a valid number.",
    }),
    cuisines: z
      .array(z.string())
      .nonempty({ message: "Please select at least one item" }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, { message: "Name is required." }),
        price: z.coerce.number().min(1, { message: "Price is required." }),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required." }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided.",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type ManageRestaurantFormProps = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
const ManageRestaurantForm = ({
  restaurant,
  onSave,
  isLoading,
}: ManageRestaurantFormProps) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: undefined }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    form.reset(restaurant);
  }, [restaurant]);

  // Validation is done prior calling this function by `zod`.
  const onSubmit = (formDataJSON: RestaurantFormData) => {
    const formData = new FormData();
    formData.append("restaurantName", formDataJSON.restaurantName);
    formData.append("city", formDataJSON.city);
    formData.append("country", formDataJSON.country);
    formData.append("deliveryPrice", formDataJSON.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJSON.estimatedDeliveryTime.toString()
    );
    formDataJSON.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJSON.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
    });
    if (formDataJSON.imageFile) {
      formData.append("imageFile", formDataJSON.imageFile);
    }
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export { ManageRestaurantForm };
