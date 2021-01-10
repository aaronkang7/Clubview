import React from "react";
import {Link} from "react-router-dom";

function Welcome(){
  return (
    <div className="jumbotron jumbotron-fluid mt-2" style={{textAlign:"left"}}>
      <div className="container">
        <h1 className="display-4">Welcome to Cornell Clubview!🐻</h1>
        <p className="lead">Explore clubs and keep track of application due dates!🥳</p>
        <Link to="/clubs">
          <button type="button" className="btn btn-warning">Start Exploring</button>
        </Link>
      </div>
    </div>
  )
}

export default Welcome;