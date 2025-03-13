import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/user-profile"
        className="flex items-center font-bold hover:text-orange-500 bg-white justify-center"
      >
        User Profile
      </Link>
      <Button className="flex items-center px-3 font-bold hover:bg-gray-500" onClick={() => logout()}>
        Log Out
      </Button>
    </>
  );
};

export { MobileNavLinks };
