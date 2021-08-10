import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./Clubinfo.css";
import moment from "moment";

function Clubinfo() {
  const currentURL_string = window.location.href;
  const id = currentURL_string.substring(
    currentURL_string.lastIndexOf("/") + 1
  );

  const [clubInfo, setclubinfo] = useState({});
  useEffect(() => {
    axios
      .get("https://clubview-server.herokuapp.com/clubs/" + id)
      .then((res) => setclubinfo(res.data))
      .catch((err) => console.log(err));
  }, []);

  function renderBackground(prop) {
    let output = "";
    for (let i = 0; i < 30; i++) {
      output += prop + " ";
    }
    return output;
  }

  return (
    <div>
      <div className="row">
        <div className="container-fluid-info col-lg-7 col-12">
          <Paper elevation="3" className="icon-paper">
            <div className="icon-content">
              {renderBackground(clubInfo.emoji)}
            </div>
          </Paper>
        </div>
        <div className="container-fluid-info col-lg-5 col-12">
          <Paper className="club-paper" elevation="3">
            <div>
              <h2 className="first-row">
                {clubInfo.cname}
                <a target="_blank" href={clubInfo.site} rel="noreferrer">
                  <img className="svg" src={`/assets/internet.svg`}></img>
                </a>
              </h2>
            </div>
            <p>
              <b>{clubInfo.category}</b>
            </p>
            {clubInfo.isAlwaysOpen ? (
              <p>
                <mark>Always open for new members</mark>
              </p>
            ) : (
              <>
                <p>
                  Apps Open:{" "}
                  <mark>
                    <b>{moment(clubInfo.start).format("MMM Do YYYY")}</b>
                  </mark>
                </p>
                <p>
                  Apps Close:{" "}
                  <mark>
                    <b>{moment(clubInfo.end).format("MMM Do YYYY")}</b>
                  </mark>
                </p>
              </>
            )}
            <h5>Description: </h5>
            <p>{clubInfo.desc}</p>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Clubinfo;
