import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return <h1>Loading....</h1>;
  if(isAuthenticated) return <Outlet />
  return <Navigate to="/" replace/>
};

export { ProtectedRoute };
