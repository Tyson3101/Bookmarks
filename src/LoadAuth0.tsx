import React from "react";
import Loading from "./components/static/Loading";
import { useAuth0 } from "@auth0/auth0-react";
import App from "./App";
import Login from "./components/static/Login";

function LoadAuth0() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <App />;
  }

  return <Login />;
}

export default LoadAuth0;
