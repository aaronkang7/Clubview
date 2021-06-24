import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { refreshTokenSetup } from "../../utils/refreshToken";
import { AuthContext, UserContext } from "../../context/user";
import { GoogleLogin, GoogleButton } from "react-google-login";

const clientID = process.env.CLIENT_ID;

function Login() {
  const { user, setUser } = useContext(UserContext);
  const [rawData, setRawData] = useState(null);
  const { isSignedIn, setSignedIn } = useContext(AuthContext);

  //TO-DO:
  //make user have imageURL and seperate from raw data so that
  // that we can get rid of null pointer exceptions

  useEffect(() => {
    console.log("USER IS NOW: ", user);
    console.log("RAW DATA IS: ", rawData);
    console.log("ISSIGNEDIN is: ", isSignedIn);
  }, [user, rawData, isSignedIn]);

  useEffect(() => {
    console.log("IS IN isSignedIn USEEFFECT");
    console.log("ISSIGNEDIN is: ", isSignedIn);
    console.log("RAWDATA is: ", rawData);
    if (isSignedIn && rawData != null) {
      console.log("in if");
      console.log("Raw data is: ", rawData);
      console.log("raw data is", rawData);
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
