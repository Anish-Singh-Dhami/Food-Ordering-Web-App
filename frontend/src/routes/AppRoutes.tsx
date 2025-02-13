import { Layout } from "@/layouts";
import { HomePage } from "@/pages";
import { createBrowserRouter, Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export { router };
