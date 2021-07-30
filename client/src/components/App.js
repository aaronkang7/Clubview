import React, { useState } from "react";
import Welcome from "../components/Welcome/Welcome";
import Header from "../components/Header/Header";
import Dashboard from "../components/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import AddArea from "../components/AddArea/AddArea";
import Clubinfo from "../components/Clubinfo/Clubinfo";
import Footer from "../components/Footer/Footer";
import { UserContext, AuthContext } from "../context/user";
import PrivacyPolicy from "../components/Footer/Pp";
import TermsOfService from "../components/Footer/Tos";
import "../styles/Styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [isSignedIn, setSignedIn] = useState(false);

  return (
    <div>
      <Router>
        <div className="container-fluid" style={{ minHeight: "100vh" }}>
          <AuthContext.Provider value={{ isSignedIn, setSignedIn }}>
            <UserContext.Provider value={{ user, setUser }}>
              <Header />
              <div className="mb-5 pb-1">
                <Switch>
                  <Router path="/privacy-policy">
                    <PrivacyPolicy />
                  </Router>
                  <Route path="/terms-of-service" component={TermsOfService} />
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
            </UserContext.Provider>
          </AuthContext.Provider>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
