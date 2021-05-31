import React from "react";
import Welcome from "../components/Welcome";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import AddArea from "../components/AddArea/AddArea";
import Clubinfo from "../components/Clubinfo/Clubinfo";
import "../styles/Styles.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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