import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { HangOut } from "../../../images/index";

function MyClubs() {
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [my, setMy] = useState([]);

  const fetchMyData = async () => {
    if (isSignedIn && user != null) {
      await axios
        .get("http://localhost:5000/profile/my/" + user.email)
        .then((res) => setMy(res.data))
        .then(() => console.log("fetched favs"));
    }
  };
  useEffect(() => {
    fetchMyData();
  }, []);

  function renderMy() {
    const data = Array.from(my);
    if (data.length === 0) {
      return (
        <div>
          <h4>You own no clubs...</h4>
          <img className="icon-noFavs" src={HangOut} />
        </div>
      );
    } else {
      return (
        <>
          <h3 className="title">My Clubs</h3>
          <div className="table-responsive vert">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ _id, cname, category }) => {
                  return (
                    <tr>
                      <td>{cname}</td>
                      <td>{category}</td>
                      <td>
                        <Link to={"edit/" + _id}>
                          <Fab size="small">
                            <EditIcon fontSize="small" />
                          </Fab>
                        </Link>
                      </td>
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

  return <>{renderMy()}</>;
}

export default MyClubs;
