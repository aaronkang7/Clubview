import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./Clubinfo.css";

function Clubinfo() {
  const currentURL_string = window.location.href;
  const id = currentURL_string.substring(
    currentURL_string.lastIndexOf("/") + 1
  );

  const [clubInfo, setclubinfo] = useState({});

  axios
    .get("https://clubview-server.herokuapp.com/clubs/" + id)
    .then((res) => setclubinfo(res.data))
    .catch((err) => console.log(err));

  return (
    <div className="row">
      <div className="container-fluid-add col-lg-7 col-md-12">
        <div className="content" style={{ fontSize: "220px" }}>
          {clubInfo.emoji}
        </div>
      </div>
      <div
        className="container-fluid-add col-lg-5 col-md-12"
        style={{ textAlign: "left" }}
      >
        <Paper className="club-paper" elevation="3">
          <h2>{clubInfo.cname}</h2>
          <p>{clubInfo.category}</p>
          <p>
            Application process starts:{" "}
            {String(clubInfo.start).substring(0, 16)}
          </p>
          <p>
            Application process ends: {String(clubInfo.end).substring(0, 16)}
          </p>
          <p>{clubInfo.desc}</p>
          <h6>
            Learn more on <a href={clubInfo.site}>their website</a>
          </h6>
        </Paper>
      </div>
    </div>
  );
}

export default Clubinfo;
