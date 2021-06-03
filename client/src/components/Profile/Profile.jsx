import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import Login from "../LogInOut/Login";
import Logout from "../LogInOut/Logout";

function Profile() {
  const { user } = useContext(UserContext);

  return <>{user != null ? <Logout /> : <Login />}</>;
}

export default Profile;
