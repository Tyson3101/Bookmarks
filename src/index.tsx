import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import "./css/App.css";

import NavBar from "./components/static/NavBar";
import LoadAuth0 from "./LoadAuth0";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
      scope:
        "openid profile email scope: read:current_user update:current_user_metadata",
    }}
  >
    <NavBar />
    <LoadAuth0 />
  </Auth0Provider>
);
