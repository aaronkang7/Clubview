import React, { useState } from "react";
import Welcome from "../components/Welcome/Welcome";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import AddArea from "../components/AddArea/AddArea";
import Clubinfo from "../components/Clubinfo/Clubinfo";
import Footer from "../components/Footer/Footer";
import { UserContext, AuthContext } from "../context/user";
import "../styles/Styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [isSignedIn, setSignedIn] = useState(false);

  return (
    <div>
      <div className="container-fluid">
        <AuthContext.Provider value={{ isSignedIn, setSignedIn }}>
          <UserContext.Provider value={{ user, setUser }}>
            <Router>
              <Header />
              <div className="mb-5 pb-1">
                <Switch>
                  <Route path="/clubs" exact component={Dashboard} />
                  <Route path="/profile/edit">
                    <AddArea isEdit={true} />
                  </Route>
                  <Route path="/profile" component={Profile} />
                  <Route path="/clubs/add" exact>
                    <AddArea isEdit={false} />
                  </Route>
                  <Route path="/clubs/" component={Clubinfo} />
                  <Route path="/" exact component={Welcome} />
                </Switch>
              </div>
            </Router>
          </UserContext.Provider>
        </AuthContext.Provider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
