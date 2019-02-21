import {
  GET_POST,
  GET_POSTS,
  POST_LOADING,
  POST_FINISHED_LOADING,
  CREATE_POST,
  GET_ERRORS,
  DELETE_POST
} from "../actions/types";
import axios from "axios";

export const createPost = newPost => dispatch => {
  axios
    .post("/api/posts", newPost)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });

      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const getPosts = () => dispatch => {
  dispatch({
    type: POST_LOADING
  });

  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};

export const getPost = postID => dispatch => {
  dispatch({
    type: POST_LOADING
  });

  axios
    .get(`/api/posts/${postID}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
      window.setTimeout(() => {
        dispatch({
          type: POST_FINISHED_LOADING
        });
      }, 2000);
    });
};

export const deletePost = postID => dispatch => {
  axios
    .delete(`/api/posts/${postID}`)
    .then(res => {
      // dispatch(getPosts());
      // Deleting it gently from UI
      dispatch({
        type: DELETE_POST,
        payload: postID
      });
    })
    .catch(err => {
      console.log(err.response.data.errors);
    });
};

export const likePost = postID => dispatch => {
  axios
    .post(`/api/posts/like/${postID}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      // {alreadyLiked: "there is already a like before"}
      console.log(err.response.data.errors);
    });
};

export const dislikePost = postID => dispatch => {
  axios
    .post(`/api/posts/dislike/${postID}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      console.log(err.response.data.errors);
    });
};

export const clearErrorsFormOnMount = () => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });
};

export const postComment = (postID, newComment) => dispatch => {
  axios
    .post(`/api/posts/comments/${postID}`, newComment)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.errors
      });
    });
};
export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postID}/${commentID}`)
    .then(res => {
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
