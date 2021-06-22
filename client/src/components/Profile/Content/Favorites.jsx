import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";
import { Table } from "@material-ui/core";

function Favs() {
  const [favs, setFavs] = useState([]);
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  //TO-DO:
  //Find out why database is giving empty arry for fav array

  useEffect(() => {
    if (isSignedIn) {
      axios
        .get("http://localhost:5000/profile/favsFull/" + user.email)
        .then((res) => setFavs(res.data));
    }
  }, []);

  useEffect(() => {
    console.log("favs is now", favs);
  }, [favs]);

  function renderFavs() {
    const data = Array.from(favs);
    if (data.length === 0) {
      return <div>You have no clubs</div>;
    } else {
      return data.map((fav) => {
        return <div> {fav}</div>;
      });
    }
  }

  return <>{renderFavs()}</>;
}

export default Favs;
