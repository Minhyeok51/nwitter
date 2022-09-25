import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn,userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj}/>
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/" />
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />  
            {/* Redirect 최신버전 리액트에서는 못씀 이것대신에 useNavigation 사용해야함 */}
          </>
        )}
      </Switch>
      {/* Switch는 최신버전에서 Routes임
        <Routes>
          <Route>     이렇게 써야함
          </Route>
        </Routes>
      */}
    </Router>
  );
};

export default AppRouter;
