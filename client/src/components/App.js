import React from "react";
import Welcome from "./Welcome";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
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
                <Profile />
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
                <Welcome />
              </Route>
            </Switch>
        </Router>
      </div>
</div>
  )
}

export default App;