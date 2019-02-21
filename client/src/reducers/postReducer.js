import {
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  POST_FINISHED_LOADING,
  CREATE_POST,
  DELETE_POST
} from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case POST_FINISHED_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
