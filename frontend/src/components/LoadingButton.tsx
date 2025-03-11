import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = () => {
  return (
    <Button disabled>
      <Loader2 className="mr-2 animate-spin" />
      Please Wait
    </Button>
  );
};

export { LoadingButton };
