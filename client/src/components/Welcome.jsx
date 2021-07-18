import React from "react";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <Paper className="container my-5" elevation="3">
      <div className="py-5">
        <h1 className="display-4">Welcome to Cornell Clubview!🐻</h1>
        <p className="lead">
          Explore clubs and keep track of application due dates!🥳
        </p>
        <Link to="/clubs">
          <button type="button" className="btn btn-warning">
            Start Exploring
          </button>
        </Link>
      </div>
    </Paper>
  );
}

export default Welcome;
