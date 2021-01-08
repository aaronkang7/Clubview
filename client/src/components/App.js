import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import AddArea from "./AddArea";
import "../styles/Styles.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Clubinfo from "./Clubinfo";

function App(){
  return (
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
  )
}

export default App;