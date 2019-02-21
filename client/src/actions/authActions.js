import {
  GET_ERRORS,
  SET_CURRENT_USER,
  LOGOUT_USER,
  GET_PROFILE
} from "./types";
import axios from "axios";
import { setAuthHeader } from "../utils/setAuthHeader";
import jwt_decode from "jwt-decode";

export const register_user = (newUser, history) => dispatch => {
  axios
    .post("/api/users/register", newUser)
    .then(() => {
      //   Now the user is registered in the DB
      // Redirect to '/login'
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const login_user = (user, history) => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      // if Success and we have token
      // 1-Store it in LS
      // 2-setAuthHeader(token)
      // 3-decode token (using jwt_token(token)) then store it in authReducer
      // 4-Redirect to '/dashboard'

      //   res.data is like this {success: true, token: 'Bearer ....'}
      //   Store token it in local storage
      localStorage.setItem("jwtToken", JSON.stringify(res.data.token));
      //   set token to Auth Header
      setAuthHeader(res.data.token);
      const decoded = jwt_decode(res.data.token);

      //   set current user in authReducer
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
      //   Redirect user to /dashboard
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const logout_user = () => dispatch => {
  // Remove Token from LS
  if (localStorage.getItem("jwtToken")) {
    localStorage.removeItem("jwtToken");
  }
  // Remove auth Header .. call it with no params
  setAuthHeader();
  // dispatch that there is no user in authReducer
  dispatch({
    type: LOGOUT_USER
  });

  // CLEAR Current Profile from profileReducer
  dispatch({
    type: GET_PROFILE,
    payload: {}
  });
};
