import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { refreshTokenSetup } from "../../utils/refreshToken";
import { AuthContext, UserContext } from "../../context/user";
import { GoogleLogin } from "react-google-login";

const clientID = process.env.CLIENT_ID;

function Login() {
  const { user, setUser } = useContext(UserContext);
  const { isSignedIn, setSignedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("USER IS", user);
  }, [user]);

  useEffect(() => {
    //when logging in
    if (user !== null) {
      axios
        .post("http://localhost:5000/profile/user", user)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
    //when logging out
    else {
      console.log(user);
    }
  }, [isSignedIn]);

  const onSuccess = (res) => {
    console.log("login success!!!");
    setUser(res.profileObj);
    setSignedIn(true);
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
