import { HomePage } from "@/pages";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export {router};