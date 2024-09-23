import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import Main from "pages/main/Main";

//For Credit Control
import CreditControlDashboard from "../dashboard/creditControlDashboard/CreditControlDashboard";

//For Customer Service
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useEffect } from "react";
// admin end

import { CreditControlRoutes } from "./CreditControlRoutes";
import { setToken } from "redux/slice/shared/tokenSlice";


TopBarProgress.config({
  barColors: {
    0: "#4c00ed",
    "1.0": "#4c00ed",
  },
  shadowBlur: 5,
});

export default function Mainroutes() {
  const dispatch = useDispatch();
  const currentRole = useSelector((state) => state?.userRole?.userRole);

  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => dispatch(setToken(token)));
    } else if (window.location.pathname !== "/") {
      loginWithRedirect({
        appState: {
          returnTo: window.location.pathname,
          queryParams: window.location.search,
        },
      });
    }
    // eslint-disable-next-line
  }, [getAccessTokenSilently, isAuthenticated, loginWithRedirect]);

  return (
    <>
      <Suspense fallback={<TopBarProgress />}>
        <Routes>
          <Route path="/" element={<Main />} />
          {isAuthenticated && (
            <>
            <Route
              path="/myhub"
              element={<CreditControlDashboard /> }
            >
              {CreditControlRoutes.map((routes, index) => (
                <Route
                  key={index}
                  path={routes.path}
                  element={routes.element}
                />
              ))}
            </Route>
            </>
          )}
          <Route
            path="/login"
            element={
              currentRole === null ? (
                <>Loading...</>
              ) : (
                <Navigate to="/myhub" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <Navigate to={currentRole === null ? "/login" : "/myhub"} />
            }
          />

          <Route path="*" element={<>Page not found</>} />
        </Routes>
      </Suspense>
    </>
  );
}
