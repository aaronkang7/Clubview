import React, { useContext } from "react";
import { AuthContext, UserContext } from "../../context/user";
import Login from "../LogInOut/Login";
import Logout from "../LogInOut/Logout";
import styles from "./profile.module.css";

function Profile() {
  const { isSignedIn } = useContext(AuthContext);
  const logoutStyle = isSignedIn === true ? "enable" : "disable";
  const loginStyle = isSignedIn === false ? "enable" : "disable";

  return (
    <>
      <div>
        <div className={styles[logoutStyle]}>
          <Logout />
        </div>
        <div className={styles[loginStyle]}>
          <Login />
        </div>
      </div>
    </>
  );
}

export default Profile;
