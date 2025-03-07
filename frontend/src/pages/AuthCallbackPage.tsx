import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { createUser } = useCreateMyUser(); 
  const { user } = useAuth0();
  const navigate = useNavigate();

  const hasUserCreated = useRef(false);

  useEffect(() => {
    if (user?.sub && user.email && !hasUserCreated.current) {
      createUser({
        auth0Id: user.sub,
        email: user.email,
      });
      hasUserCreated.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export { AuthCallbackPage };
