import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import AddArea from "./AddArea";
import Clubinfo from "./Clubinfo";
import "../styles/Styles.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App(){
  return (
      <div class="container-fluid">
        <Router>
            <Header />
            <Switch>
              <Route path="/clubs" exact>
                <Dashboard />
              </Route>
              <Route path="/profile" exact>
              <h1>Profileeee</h1>
              </Route>
              <Route path="/clubs/add" exact>
                <AddArea />
              </Route>
              <Route path="/clubs/">
                <Clubinfo />
              </Route>
            </Switch>
        </Router>
      </div>
  )
}

export default App;