import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  LOGOUT_USER,
  GET_PROFILES,
  PROFILE_FINISHED_LOADING
} from "./types";
import { setAuthHeader } from "../utils/setAuthHeader";

// this action is for dashboard
export const getCurrentProfile = () => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios
    .get("/api/profile")
    .then(res => {
      // There is already a profile for that user
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      // No profile created Yet for this user?
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

export const createProfile = (profileFields, history) => dispatch => {
  axios
    .post("/api/profile", profileFields)
    .then(res => {
      // res.data contains whether new or updated profile
      // BUT we don't need it :)
      // Clear Errors first
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      history.push("/dashboard");
    })
    .catch(err => {
      // whatever error is going to be here
      console.log(err.response.data.errors);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const deleteAccount = history => dispatch => {
  axios
    .delete("/api/profile")
    .then(res => {
      // Set profile state and also auth state(log the user out)
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      dispatch({
        type: LOGOUT_USER
      });
      // Destroy the token & setAuthHeader to nothing
      localStorage.removeItem("jwtToken");
      setAuthHeader();

      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const addExperience = (experienceFields, history) => dispatch => {
  axios
    .post("/api/profile/experience", experienceFields)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const addEducation = (educationFields, history) => dispatch => {
  axios
    .post("/api/profile/education", educationFields)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const deleteExperience = expID => dispatch => {
  axios
    .delete(`/api/profile/experience/${expID}`)
    .then(res => {
      // Just stay in the same page after delete .. handled after delete in component itself
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const deleteEducation = eduID => dispatch => {
  axios
    .delete(`/api/profile/education/${eduID}`)
    .then(res => {
      // Just stay in the same page after delete .. handled after delete in component itself
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const getProfiles = () => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios
    .get("api/profile/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILES,
        payload: []
      });
    });
};

// this action is for getting profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PROFILE_FINISHED_LOADING
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

// this action is for getting profile by userID
export const getProfileByUserID = id => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
  axios
    .get(`/api/profile/users/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: PROFILE_FINISHED_LOADING
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};
