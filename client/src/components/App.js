import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import AddArea from "./AddArea";
import Clubinfo from "./Clubinfo";
import "../styles/Styles.css";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App(){
  return (
    <div>
      <div class="container-fluid">
        <Router>
            <Header />
            <Switch>
              <Route path="/clubs" exact>
                <Dashboard />
              </Route>
              <Route path="/profile" exact>
              <div className="jumbotron jumbotron-fluid mt-2" style={{textAlign:"left"}}>
                <div className="container">
                  <h1 className="display-4">User Profiles are not yet available 😔</h1>
                  <p className="lead">User Profile and Favorites Functionality coming soon 💻</p>
                </div>
              </div>
              </Route>
              <Route path="/clubs/add" exact>
                <AddArea isEdit={false}/>
              </Route>
              <Route path="/edit">
                <AddArea isEdit={true}/>
              </Route>
              <Route path="/clubs/">
                <Clubinfo />
              </Route>

              <Route path="/">
              <div className="jumbotron jumbotron-fluid mt-2" style={{textAlign:"left"}}>
                <div className="container">
                  <h1 className="display-4">Welcome to Cornell Clubview!🐻</h1>
                  <p className="lead">Explore clubs and keep track of application due dates!🥳</p>
                  <Link to="/clubs">
                    <button type="button" className="btn btn-warning">Start Exploring</button>
                  </Link>
                </div>
              </div>
              </Route>
            </Switch>
        </Router>
      </div>
</div>
  )
}

export default App;