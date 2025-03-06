import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";
import { Auth0ProviderWithNavigation } from "./auth/Auth0ProviderWithNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0ProviderWithNavigation>
        <RouterProvider router={router} />
      </Auth0ProviderWithNavigation>
    </QueryClientProvider>
  </StrictMode>
);
