import Auth0ProviderWithHistory from "Auth0ProviderWithHistory";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "context";
import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { store } from "redux/store";
import { toolkitstore } from "redux/toolkitStore";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <Provider store={toolkitstore}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
