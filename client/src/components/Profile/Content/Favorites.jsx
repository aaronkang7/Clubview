import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";
import moment from "moment";

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
      return (
        <table className="table table-striped">
          <tbody>
            {data.map(({ cname, start, end, category }) => {
              return (
                <tr>
                  <td>{cname}</td>
                  <td>{category}</td>
                  <td>{moment(start).format("MM/DD/YYYY")}</td>
                  <td>{moment(end).format("MM/DD/YYYY")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }

  return <>{renderFavs()}</>;
}

export default Favs;
