import React, { useContext, useEffect } from "react";
import axios from "axios";
import { refreshTokenSetup } from "../../utils/refreshToken";
import { AuthContext, UserContext } from "../../context/user";
import { GoogleLogin } from "react-google-login";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const { isSignedIn, setSignedIn } = useContext(AuthContext);

  const clientID =
    "321312020600-t1b4guo1u9dajoegr8ova94veijnm43l.apps.googleusercontent.com";

  useEffect(() => {}, [user, isSignedIn]);

  const onSuccess = (res) => {
    axios
      .post(
        "https://clubview-server.herokuapp.com/profile/user",
        res.profileObj
      )
      .then((res) => setUser(res.data))
      .then(() => setSignedIn(true))
      .catch((err) => console.log(err));
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
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
