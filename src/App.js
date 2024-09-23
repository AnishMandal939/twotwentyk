import "./App.css";
import Mainroutes from "pages/routes/Mainroutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useLayoutEffect } from "react";

function GlobalPreference() {
  const theme = localStorage.getItem("theme");
  const path = window.location.pathname;

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", `${theme}`);
    // eslint-disable-next-line
  }, [theme]);

  useLayoutEffect(() => {
    if (theme === null) {
      localStorage.setItem("theme", `${"Light"}`);
    }
  }, [theme, path]);

  return null;
}

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <GlobalPreference />
      <Mainroutes />

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
