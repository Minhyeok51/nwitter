import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({refreshUser, isLoggedIn,userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj}/>}
      <Switch>
        {isLoggedIn ? (
          <div style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}>
            <Route exact path="/">
              <Home userObj={userObj}/>
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
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
