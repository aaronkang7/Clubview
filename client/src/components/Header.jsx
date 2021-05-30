import React from "react";
import {Link} from "react-router-dom";
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import "../styles/Styles.css";

function Header(){
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/clubs">Club View</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link active" to="/clubs">Clubs</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/clubs/add">
              <Fab variant="extended" size="large">
                <AddIcon />
                  Add Club
              </Fab>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header;