import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const pages = [
    { pageName: "Profile", path: "/" },
    { pageName: "My Clubs", path: "/my" },
    { pageName: "Favorites", path: "/favs" },
    { pageName: "Settings", path: "/settings" },
  ];

  return (
    <div className="sidenav">
      {pages.map(({ pageName, path }) => {
        return (
          <div className="sideItem" to={path}>
            <Link>{pageName}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
