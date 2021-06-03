import React, { useContext } from "react";
import { GoogleLogout } from "react-google-login";
import { UserContext } from "../../context/user";

const clientId = process.env.CLIENT_ID;

function Logout() {
  const { user, setUser } = useContext(UserContext);

  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
    setUser(null);
    console.log(user);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
