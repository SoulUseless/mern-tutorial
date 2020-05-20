import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import Users from "./users/pages/Users.js";
import NewPlace from "./places/pages/NewPlace.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
function App() {
  return (
    <Router>
      {/*Router must always come first*/}
        <MainNavigation />
        <main>
          <Switch> 
            {/* path is the url path, exact means only that path will render this thing */}
            {/* paths can stack (one with exact for only the page one without exact to load all the time) */}
            <Route path="/" exact={true}>
              <Users />
            </Route>

            <Route path="/:userId/places">
              <UserPlaces />
            </Route>
            
            <Route path="/places/new">
              <NewPlace />
            </Route>

            <Redirect to="/" />
          </Switch>
        </main>
    </Router>
  );}

export default App;
