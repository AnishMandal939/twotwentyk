import { lazy } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
const Homepage = lazy(() =>
  import("pages/dashboard/creditControlDashboard/pages/Homepage")
);

const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        loading...
      </div>
    ),
  });

  return <Component />;
};

export const CreditControlRoutes = [
  {
    path: "/myhub",
    element: <AuthenticationGuard component={Homepage} />,
  },
];
