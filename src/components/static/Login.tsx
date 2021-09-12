import { Auth0Client } from "@auth0/auth0-spa-js";
import React from "react";
import NavBar from "./NavBar";

function Login({ auth0 }: { auth0: Auth0Client }) {
  return (
    <>
      <NavBar />
      <div className="loginContainer">
        <div className="login">
          <h1>Log in</h1>
          <span>Log in to access your bookmarks</span>
          <button onClick={() => auth0.loginWithRedirect()}>Log in</button>
        </div>
      </div>
    </>
  );
}

export default Login;
