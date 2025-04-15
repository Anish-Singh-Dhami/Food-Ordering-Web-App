import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type MenuItemProps = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItemCard = ({ menuItem, addToCart }: MenuItemProps) => {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg duration-300"
      onClick={addToCart}
    >
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">₹{menuItem.price}</CardContent>
    </Card>
  );
};
export { MenuItemCard };
