import React, { useContext, useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { UserContext } from "../../context/user";

const clientId = process.env.CLIENT_ID;

function Logout() {
  const { user, setUser } = useContext(UserContext);

  const onLogoutSuccess = () => {
    setUser(null);
  };

  return (
    <div>
      <div>{user == null ? "logged out" : "logged in"}</div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
