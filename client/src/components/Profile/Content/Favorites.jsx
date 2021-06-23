import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";
import Fab from "@material-ui/core/Fab";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { HangOut } from "../../../images/index";
import moment from "moment";

function Favs() {
  const [favs, setFavs] = useState([]);
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  //TO-DO:
  //Find out why database is giving empty arry for fav array

  const fetchFavData = async () => {
    if (isSignedIn) {
      await axios
        .get("http://localhost:5000/profile/favsFull/" + user.email)
        .then((res) => setFavs(res.data))
        .then(() => console.log("fetched favs"));
    }
  };
  useEffect(() => {
    fetchFavData();
  }, []);

  useEffect(() => {
    console.log("favs is now", favs);
  }, [favs]);

  function renderFavs() {
    // const header = [
    //   "Name",
    //   "Rec. Start",
    //   "Rec. End",
    //   "Category",
    //   "Notification",
    // ];
    // const columns = ["cname", "start", "end", "category"];
    const data = Array.from(favs);
    if (data.length === 0) {
      return (
        <div>
          <h4>You have no favorite clubs...</h4>
          <img className="icon-noFavs" src={HangOut} />
        </div>
      );
    } else {
      return (
        <div className="table-responsive vert">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Rec. Start</th>
                <th scope="col">Rec. End</th>
                <th scope="col">Category</th>
                <th scope="col">Notification</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ cname, start, end, category }) => {
                return (
                  <tr>
                    <td>{cname}</td>
                    <td>{category}</td>
                    <td>{moment(start).format("MM/DD/YYYY")}</td>
                    <td>{moment(end).format("MM/DD/YYYY")}</td>
                    <td>
                      <Fab size="small">
                        <NotificationsIcon fontSize="small" />
                      </Fab>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return <>{renderFavs()}</>;
}

export default Favs;
