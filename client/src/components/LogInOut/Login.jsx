import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { refreshTokenSetup } from "../../utils/refreshToken";
import { UserContext } from "../../context/user";
import { GoogleLogin } from "react-google-login";

const clientID = process.env.CLIENT_ID;

function Login() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("auth useEffect says: " + user);
    console.log(user);
    //when logging in
    if (user !== null) {
      console.log(user.familyName);
    }
    //when logging out
    else {
      console.log(user);
    }
  }, [user]);

  const onSuccess = (res) => {
    console.log("login success!!!");
    setUser(res.profileObj);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientID}
        accessType="offline"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        approvalPrompt="force"
        prompt="consent"
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
