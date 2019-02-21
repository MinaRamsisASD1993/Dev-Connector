import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/dashboard/CreateProfile";
import EditProfile from "./components/dashboard/EditProfile";
import AddExperience from "./components/dashboard/AddExperience";
import AddEducation from "./components/dashboard/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import ProfileByUserID from "./components/profile/ProfileByUserID";
import Posts from "./components/posts/Posts";
import Post from "./components/posts/Post";

import jwt_decode from "jwt-decode";
import { setAuthHeader } from "./utils/setAuthHeader";
import { SET_CURRENT_USER } from "./actions/types";
import { logout_user } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
// DO THIS FOR EACH ROUTE .. Check for the token in LS
const token = JSON.parse(localStorage.getItem("jwtToken"));

if (token) {
  const decodedToken = jwt_decode(token); //which is user payload
  // Check if token is expired
  const { exp } = decodedToken; //number of seconds elapsed
  const numOfSecondsNow = Date.now() / 1000;

  if (exp < numOfSecondsNow) {
    // expired
    console.log("Expired .. GO TO LOGIN PAGE");
    store.dispatch(logout_user());
    window.location.href = "/login";
  } else {
    console.log("NOT EXPIRED .. Stay in the same page");
    // For each request from any route setAuthHeader(token)
    setAuthHeader(token); //set it as is .. no change

    // dispatch this decodedToken to (authReducer)
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken
    });
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/create-profile" component={CreateProfile} />
              <Route exact path="/edit-profile" component={EditProfile} />
              <Route exact path="/add-experience" component={AddExperience} />
              <Route exact path="/add-education" component={AddEducation} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Route
                exact
                path="/profile/users/:userID"
                component={ProfileByUserID}
              />
              <Route exact path="/feed" component={Posts} />
              <Route exact path="/post/:postID" component={Post} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
