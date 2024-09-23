import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthCallback() {
  const navigate = useNavigate();
  const { handleRedirectCallback } = useAuth0();

  useEffect(() => {
    async function redirectCallBack() {
      const result = await handleRedirectCallback(
        `${window.location.href}${window.location.pathname}`
      );
      if (result.appState) {
        onRedirectCallback(result.appState);
      }
    }
    redirectCallBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <>Loading...</>;
}
