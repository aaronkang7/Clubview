import React, { useContext } from "react";
import { AuthContext } from "../../../context/user";
import Login from "../../GoogleAuth/Login";
import Logout from "../../GoogleAuth/Logout";
import styles from "./LogInOut.module.css";

function LogInOut() {
  const { isSignedIn } = useContext(AuthContext);
  const logoutStyle = isSignedIn === true ? "enable" : "disable";
  const loginStyle = isSignedIn === false ? "enable" : "disable";

  return (
    <>
      <div className={styles["login"]}>
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

export default LogInOut;
