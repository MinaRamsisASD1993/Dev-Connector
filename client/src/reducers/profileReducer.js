import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  PROFILE_FINISHED_LOADING
} from "../actions/types";
// init state
const initialState = {
  profile: {},
  profiles: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case PROFILE_FINISHED_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
