import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import MyClubs from "./Content/MyClubs";
import LogInOut from "./LogInOut/LogInOut";
import Favs from "./Content/Favorites";
import { Paper } from "@material-ui/core";
import "./profile.css";
import { Route, Switch } from "react-router-dom";

function Profile() {
  return (
    <>
      <div className="row">
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <Paper className="profileContent" elevation="3">
            <Switch>
              <Route path="/profile/my" exact component={MyClubs} />
              <Route path="/profile/favs" exact component={Favs} />
              <Route path="/profile/settings" exact component={LogInOut}>
                <LogInOut />
              </Route>
            </Switch>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default Profile;
