import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from "./users/pages/Users.js";
import NewPlace from "./places/pages/NewPlace.js";
import UpdatePlace from "./places/pages/UpdatePlace.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import Auth from "./users/pages/Auth.js";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    SetIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    SetIsLoggedIn(false);
  }, []);
  
  let routes;

  if (isLoggedIn) {
    {/* path is the url path, exact means only that path will render this thing */}
    {/* paths can stack (one with exact for only the page one without exact to load all the time) */}
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users />
        </Route>

        <Route path="/:userId/places">
          <UserPlaces />
        </Route>

        <Route path="/places/new">
          <NewPlace />
        </Route>

        {/* generic routes must be placed after the more specific ones */}
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users />
        </Route>

        <Route path="/:userId/places">
          <UserPlaces />
        </Route>

        <Route path="/auth">
          <Auth />
        </Route>

        <Redirect to="/auth" />
      </Switch>
    );
  }


  //AuthContext re-binds the variables defined in authcontext.js so that app-wide can modify
  return (
    <AuthContext.Provider 
      value={
        {
          isLoggedIn: isLoggedIn, 
          login: login, 
          logout: logout
        }
      }>
      <Router>
        {/*Router must always come first*/}
          <MainNavigation />
          <main>
            {routes}
          </main>
      </Router>
    </AuthContext.Provider>
  );}

export default App;
