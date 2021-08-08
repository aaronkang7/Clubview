import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Header.css";
import { AuthContext, UserContext } from "../../context/user";

function Header() {
  const { user } = useContext(UserContext);
  const { isSignedIn } = useContext(AuthContext);

  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (user && isSignedIn) {
      setProfile(user.imageUrl);
    }
  }, [isSignedIn]);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/clubs">
        Club View
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item add-club">
            <Link className="nav-link active" to="/clubs">
              Clubs
            </Link>
          </li>
          <li className="nav-item add-club">
            <Link to={isSignedIn ? "/clubs/add" : "/clubs"}>
              <Fab variant="extended" size="medium" disabled={!isSignedIn}>
                <AddIcon className="classes.extendedIcon" />
                Register Club
              </Fab>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={isSignedIn ? "/profile/my" : "/profile/settings"}>
              <Fab size="medium">
                {isSignedIn ? (
                  <img
                    className="profile-picture"
                    src={profile}
                    alt="profile-picture"
                  ></img>
                ) : (
                  <AccountCircleIcon />
                )}
              </Fab>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
