import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

//OLD eager imports
//import Users from "./users/pages/Users.js";
//import NewPlace from "./places/pages/NewPlace.js";
//import UpdatePlace from "./places/pages/UpdatePlace.js";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
//import UserPlaces from "./places/pages/UserPlaces";
//import Auth from "./users/pages/Auth.js";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

//NEW lazy imports
const Users = React.lazy(() => import("./users/pages/Users.js"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace.js"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace.js"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const Auth = React.lazy(() => import( "./users/pages/Auth.js"));


//only for tracking auto logouts
//let logoutTimer;
function App() {
  const { token, userId, login, logout } = useAuth();
  /* ABSTRACTED TO CUSTOM HOOK
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setUserId(uid);
    
    //either we already have one, or we create a new one
    const tokenExpirationDate = 
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); //plus 1h
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
        "userData",
        JSON.stringify({
            userId: uid,
            token: token,
            expiration: tokenExpirationDate.toISOString(), //special toString => can be converted back to date
        })
    );
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);
  
  //auto logouts
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      //remainingTime calculated to be in miliseconds
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  //auto logins
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
    ) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]); //ensure this runs once
  //useEffect wrapped functions run after renders

  */
  let routes;

  if (token) {
    // path is the url path, exact means only that path will render this thing
    // paths can stack (one with exact for only the page one without exact to load all the time)
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
          value={{
              userId: userId,
              isLoggedIn: !!token,
              token: token, // for convenience
              login: login,
              logout: logout,
          }}
      >
          <Router>
              {/*Router must always come first*/}
              <MainNavigation />
              <main>
                {/*Suspense required to make React Lazy work*/}
                {/* fallback param loads when loading actual takes longer*/}
                  <Suspense
                      fallback={
                          <div className="center">
                              <LoadingSpinner />
                          </div>
                      }
                  >
                    {routes}
                  </Suspense>
              </main>
          </Router>
      </AuthContext.Provider>
  );}

export default App;
