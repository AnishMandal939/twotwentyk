import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUDIENCE;
  const scopes = process.env.REACT_APP_AUTH0_SCOPE;
  
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    let path = window.location.pathname;
    if (path === "/") {
      path = "/myhub";
    }
    const redirectUri = appState
      ? `${appState.returnTo}${appState.queryParams}`
      : path;
    navigate(redirectUri);
  };
  return (
    <Auth0Provider
      // useRefreshTokens={true}
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      scope={scopes}
      skipRedirectCallback={false}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
