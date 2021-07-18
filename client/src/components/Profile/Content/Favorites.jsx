import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";

import { HangOut } from "../../../images/index";
import moment from "moment";

function Favs() {
  const [favs, setFavs] = useState([]);
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  //TO-DO:
  //Find out why database is giving empty arry for fav array

  const fetchFavData = async () => {
    if (isSignedIn && user != null) {
      const uemail = user.email;
      const atInd = uemail.indexOf("@");
      const netId = uemail.substring(0, atInd);
      await axios
        .get("https://clubview-server.herokuapp.com/profile/favsFull/" + netId)
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
          <img alt="hangout" className="icon-noFavs" src={HangOut} />
        </div>
      );
    } else {
      return (
        <>
          <div className="row mb-1">
            <div className="col-auto mr-auto">
              <h3>Favorites</h3>
            </div>
            <div className="col-auto">
              {/* <Fab variant="extended" size="small" onClick={generateFile(data)}>
                <GetAppIcon className="classes.extendedIcon" size="small" />
                Download .ics file
              </Fab> */}
            </div>
          </div>
          <div className="table-responsive vert">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Rec. Start</th>
                  <th scope="col">Rec. End</th>
                  <th scope="col">Category</th>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }

  return <>{renderFavs()}</>;
}

export default Favs;
