import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import NavBar from "./NavBar";

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <div className="loginContainer">
        <div className="login">
          <h1>Log in</h1>
          <span>Log in to access your bookmarks</span>
          <button onClick={() => loginWithRedirect()}>Log in</button>
        </div>
      </div>
    </>
  );
}

export default Login;
