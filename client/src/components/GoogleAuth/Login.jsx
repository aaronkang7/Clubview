import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { refreshTokenSetup } from "../../utils/refreshToken";
import { AuthContext, UserContext } from "../../context/user";
import { GoogleLogin } from "react-google-login";

const clientID =
  "321312020600-t1b4guo1u9dajoegr8ova94veijnm43l.apps.googleusercontent.com";

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [rawData, setRawData] = useState(null);
  const { isSignedIn, setSignedIn } = useContext(AuthContext);

  //TO-DO:
  //make user have imageURL and seperate from raw data so that
  // that we can get rid of null pointer exceptions

  useEffect(() => {
    console.log("CLIENT ID IS: ", clientID);
    console.log("USER IS NOW: ", user);
    console.log("RAW DATA IS: ", rawData);
    console.log("ISSIGNEDIN is: ", isSignedIn);
  }, [user, rawData, isSignedIn]);

  useEffect(() => {
    if (isSignedIn && rawData != null) {
      axios
        .post("http://localhost:5000/profile/user", rawData)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
    //when logging out
    else {
      console.log("logging out", user);
    }
  }, [isSignedIn]);

  const onSuccess = (res) => {
    console.log("login success!!!");
    console.log(process.env.API_URL);
    setRawData(res.profileObj);
    setSignedIn(true);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed", res);
  };

  return (
    <div>
      <GoogleLogin
        client_id={clientID}
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
