import React from "react";
import {GoogleLogin} from "react-google-login";

const clientID = '321312020600-t1b4guo1u9dajoegr8ova94veijnm43l.apps.googleusercontent.com';

function Login() {
  const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res);
  };

  const onFailure = (res) => {
    console.log('Login failed', res, 'hello');
  }

  return (
    <div>
      <GoogleLogin 
        clientId={clientID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{marginTop: '100px'}}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;