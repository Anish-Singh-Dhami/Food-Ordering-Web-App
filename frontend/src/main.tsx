import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Auth0ProviderWithNavigation } from "./auth/Auth0ProviderWithNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Auth0ProviderWithNavigation>
          <Toaster visibleToasts={1} position="top-right" richColors/>
          <AppRoutes />
        </Auth0ProviderWithNavigation>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
