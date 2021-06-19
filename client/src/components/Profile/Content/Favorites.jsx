import React, { useContext } from "react";
import { UserContext } from "../../../context/user";

function Favs() {
  const { user, setUser } = useContext(UserContext);

  return <div>{user !== null ? user._id : "Login first!"}</div>;
}

export default Favs;
