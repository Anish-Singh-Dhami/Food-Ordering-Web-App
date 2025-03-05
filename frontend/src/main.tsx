import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { Auth0ProviderWithNavigation } from "./auth/Auth0ProviderWithNavigation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0ProviderWithNavigation>
      <RouterProvider router={router} />
    </Auth0ProviderWithNavigation>
  </StrictMode>
);
