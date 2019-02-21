import axios from "axios";

export const setAuthHeader = token => {
  if (token) {
    //   if there is a token attached to function call
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //   if no token attached to function call
    delete axios.defaults.headers.common["Authorization"];
  }
};
