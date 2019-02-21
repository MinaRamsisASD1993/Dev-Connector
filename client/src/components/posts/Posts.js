import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import PostForm from "./PostForm";
import classNames from "classnames";
import {
  getPosts,
  deletePost,
  likePost,
  dislikePost
} from "../../actions/postActions";

class Posts extends Component {
  onDeleteClick = postID => {
    this.props.deletePost(postID);
  };
  onLikeClick = postID => {
    this.props.likePost(postID);
  };
  onDislikeClick = postID => {
    this.props.dislikePost(postID);
  };

  checkIfUserLikePost = post => {
    const { user } = this.props.auth;
    let userLiked = false;
    if (post.likes.length > 0) {
      post.likes.forEach(like => {
        if (like.likeUserID.toString() == user.id.toString()) {
          userLiked = true;
        }
      });
    }
    return userLiked;
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postsOutput;
    if (loading) {
      postsOutput = <Spinner />;
    } else {
      if (posts.length > 0) {
        // there are posts
        postsOutput = posts.map(post => (
          <div className="card card-body mb-3" key={post._id}>
            <div className="row">
              <div className="col-md-2">
                {/* USER PROFILE LINK  */}
                <Link to={`/profile/users/${post.userID}`}>
                  <img
                    className="rounded-circle d-none d-md-block"
                    src={post.avatar}
                    alt="user avatar"
                  />
                </Link>
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text}</p>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onLikeClick.bind(this, post._id)}
                >
                  <i
                    className={classNames({
                      "fa fa-thumbs-up": true,
                      "text-success": this.checkIfUserLikePost(post)
                        ? true
                        : false,
                      "text-info": !this.checkIfUserLikePost(post)
                        ? true
                        : false
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  className="btn btn-light mr-1"
                  onClick={this.onDislikeClick.bind(this, post._id)}
                >
                  <i className="text-secondary fa fa-thumbs-down" />
                </button>
                {/* SINGLE POST LINK */}
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.userID == this.props.auth.user.id ? (
                  <button
                    type="button"
                    className="btn btn-danger mr-1"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                  >
                    <i className="fa fa-times" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ));
      } else {
        postsOutput = <h3>There are no posts</h3>;
      }
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              <div className="posts">{postsOutput}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost, likePost, dislikePost }
)(Posts);
