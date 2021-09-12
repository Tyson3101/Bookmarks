import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/App.css";
import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";
import Loading from "./components/static/Loading";
import Login from "./components/static/Login";
import NavBar from "./components/static/NavBar";

//https://manage.auth0.com/dashboard/us/dev-jmaenfuw/applications/QopskNe2tUV2pxtzeF1MDyZJEWkxWGlS

ReactDOM.render(
  <>
    <NavBar />
    <Loading />
  </>,
  document.getElementById("root")
);

const auth0Options = {
  domain: process.env.REACT_APP_DOMAIN!,
  client_id: process.env.REACT_APP_CLIENT_ID!,
  redirect_uri: window.location.origin,
};

createAuth0Client(auth0Options).then(async (auth0) => {
  let user = await getUser(auth0);

  if (!user) {
    try {
      await auth0.handleRedirectCallback();
      user = await getUser(auth0);
    } catch (error) {
      ReactDOM.render(<Login auth0={auth0} />, document.getElementById("root"));
      return;
    }
  }

  if (user)
    ReactDOM.render(
      <App auth0={auth0} user={user} />,
      document.getElementById("root")
    );
});

async function getUser(auth0: Auth0Client) {
  try {
    const accessToken = await auth0.getTokenSilently();
    const user = await auth0.getUser();
    return { ...user, accessToken };
  } catch (error) {
    console.log(error);
    return;
  }
}
