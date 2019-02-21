import { SET_CURRENT_USER, LOGOUT_USER } from "../actions/types";
// init state
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: true,
        user: action.payload
      };
    case LOGOUT_USER:
      return {
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
}
