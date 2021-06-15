import React, { useContext } from "react";
import { UserContext } from "../../context/user";
import Login from "../LogInOut/Login";
import Logout from "../LogInOut/Logout";
import styles from "./profile.module.css";

function Profile() {
  const { user } = useContext(UserContext);
  const logoutStyle = user !== null ? "enable" : "disable";
  const loginStyle = user === null ? "enable" : "disable";

  return (
    <>
      <div className={styles[logoutStyle]}>
        <Logout />
      </div>
      <div className={styles[loginStyle]}>
        <Login />
      </div>
    </>
  );
}

export default Profile;
