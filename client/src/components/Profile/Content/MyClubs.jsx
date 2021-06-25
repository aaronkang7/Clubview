import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext, UserContext } from "../../../context/user";
import Toast from "../../Toast/Toast";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { HangOut } from "../../../images/index";

function MyClubs() {
  const { isSignedIn } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [showingToast, setToast] = useState(false);
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
  }, [showingToast]);

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:5000/profile/" + _id)
      .then((res) => setMessage(res.data))
      .then(() => setToast(true));
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
          {showingToast ? <Toast message={message} /> : null}
          <div className="mb-1">
            <h3 className="title">My Clubs</h3>
          </div>
          <div className="table-responsive vert">
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
