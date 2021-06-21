import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { AuthContext, UserContext } from "../../context/user";

const clientId = process.env.CLIENT_ID;

function Logout() {
  const { setUser } = useContext(UserContext);
  const { setSignedIn } = useContext(AuthContext);

  const onLogoutSuccess = () => {
    setUser(null);
    setSignedIn(false);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onLogoutSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
