import React from "react";
import { Link } from "react-router-dom";
import { Paper } from "@material-ui/core";
import "./Sidebar.css";

function Sidebar() {
  const pages = [
    { pageName: "MyClubs", path: "/my" },
    { pageName: "Favorites", path: "/favs" },
    { pageName: "Settings", path: "/settings" },
  ];

  return (
    <Paper className="sidenav" elevation="3">
      <div className="listContainer">
        {pages.map(({ pageName, path }) => {
          return (
            <Link to={"/profile" + path}>
              <div className="sideItem">{pageName}</div>
            </Link>
          );
        })}
      </div>
    </Paper>
  );
}

export default Sidebar;
