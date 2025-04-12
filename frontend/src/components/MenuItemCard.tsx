import { MenuItem } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";

type MenuItemProps = {
  menuItem: MenuItem;
};

const MenuItemCard = ({ menuItem }: MenuItemProps) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg duration-300">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">₹{menuItem.price}</CardContent>
    </Card>
  );
};
export { MenuItemCard as MenuItem };
