import React, { useContext } from "react";
import axios from "axios";
import { refreshTokenSetup } from "../../utils/refreshToken";
import { UserContext } from "../../context/user";
import { GoogleLogin } from "react-google-login";

const clientID = process.env.CLIENT_ID;

function Login() {
  const { user, setUser } = useContext(UserContext);

  const onSuccess = (res) => {
    setUser(res.profileObj);
    console.log(res.profileObj);
    refreshTokenSetup(res);
    axios.post('/profile',user)
    .then((res)=>{console.log(res)});

  };

  async function secondFunction(res) {
    await setUser(res.profileObj);
    console.log(user.familyName);
  }

  const onFailure = (res) => {
    console.log("Login failed", res,);
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
