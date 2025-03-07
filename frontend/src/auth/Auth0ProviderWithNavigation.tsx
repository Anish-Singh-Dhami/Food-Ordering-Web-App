import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type AuthProviderType = {
  children: React.ReactNode;
};
const Auth0ProviderWithNavigation = ({ children }: AuthProviderType) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URI;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("Unable to initialise auth");
  }

  /**
   * Handles Post-Login Navigation by navigating to auth/callback route.
   */
  const onRedirectCallback = () => {
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export { Auth0ProviderWithNavigation };
