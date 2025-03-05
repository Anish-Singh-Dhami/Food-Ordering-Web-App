import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

const onRedirectCallback = (appState?: AppState, user?: User) => {
	console.log("User : ", user);
};

type AuthProviderType = {
  children: React.ReactNode;
};
const Auth0ProviderWithNavigation = ({ children }: AuthProviderType) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTHO_CALLBACK_URI;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Unable to initialise auth");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export { Auth0ProviderWithNavigation };
