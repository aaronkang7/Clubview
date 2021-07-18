import React from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { Fab } from "@material-ui/core";
import "./Welcome.css";

function Welcome() {
  return (
    <Paper className="container my-5" elevation="3">
      <div className="py-5">
        <h1 className="display-4">Welcome to Cornell Clubview!🐻</h1>
        <p className="lead">
          Explore clubs and keep track of application due dates!🥳
        </p>
        <Link to="/clubs">
          <div className="welcome-button">
            <Fab backgroundColor="red" variant="extended">
              Start Exploring
            </Fab>
          </div>
        </Link>
      </div>
    </Paper>
  );
}

export default Welcome;
