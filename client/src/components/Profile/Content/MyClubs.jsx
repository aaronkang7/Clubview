import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { HangOut } from "../../../images/index";
import "./Content.css";

function MyClubs() {
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [my, setMy] = useState([]);

  const fetchMyData = async () => {
    if (isSignedIn && user != null) {
      await axios
        .get("https://clubview-server.herokuapp.com/profile/my/" + user.email)
        .then((res) => setMy(res.data))
        .then(() => console.log("fetched favs"));
    }
  };
  useEffect(() => {
    fetchMyData();
  }, []);

  const handleDelete = (_id) => {
    axios
      .delete(
        "https://clubview-server.herokuapp.com/profile/" +
          _id +
          "/" +
          user.email
      )
      .then((res) => alert(res.data));
  };

  function renderMy() {
    const data = Array.from(my);
    if (data.length === 0) {
      return (
        <div>
          <h4>You own no clubs...</h4>
          <img alt="hangout" className="icon-noFavs" src={HangOut} />
        </div>
      );
    } else {
      return (
        <>
          <div className="mb-1">
            <h3 className="title">My Clubs</h3>
          </div>
          <div className="table-responsive scrollable">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
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
                      <td>
                        <Fab
                          size="small"
                          onClick={() => {
                            handleDelete(_id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </Fab>
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
