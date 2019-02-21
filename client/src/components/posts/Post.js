import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Spinner from "../Spinner";
import { getPost, postComment, deleteComment } from "../../actions/postActions";
class Post extends Component {
  state = {
    commText: "",
    errors: {}
  };
  onChange = e => {
    this.setState({ commText: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const newComment = {
      commUserID: this.props.auth.user.id,
      commUserName: this.props.auth.user.name,
      commUserAvatar: this.props.auth.user.avatar,
      commText: this.state.commText
    };
    const postID = this.props.match.params.postID;
    this.props.postComment(postID, newComment);
    this.setState({ commText: "" });
  };
  onDeleteClick = commentID => {
    const postID = this.props.match.params.postID;
    this.props.deleteComment(postID, commentID);
  };

  static getDerivedStateFromProps(nextProps) {
    const { errors } = nextProps;
    if (errors) {
      return {
        errors: errors
      };
    } else {
      return {
        errors: {}
      };
    }
  }
  // PRIVATE ROUTE
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    const postID = this.props.match.params.postID;
    this.props.getPost(postID);
  }
  render() {
    const { loading, post } = this.props.post;
    const { errors, commText } = this.state;
    let invalidFeedback;
    let classNamesValue = classNames({
      "form-control form-control-lg": true,
      "is-invalid": Object.keys(errors).length > 0 ? true : false
    });
    if (Object.keys(errors).length > 0) {
      invalidFeedback = (
        <div className="invalid-feedback">{errors.commText}</div>
      );
    }
    if (loading) {
      return <Spinner />;
    } else {
      if (Object.keys(post).length > 0) {
        // NOT Empty ?
        return (
          <div>
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
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
                </div>
              </div>
            </div>
            {/* Comment Form */}
            <div className="post-form mb-3">
              <div className="card card-info">
                <div className="card-header bg-info text-white">
                  Leave your comment...
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <textarea
                        className={classNamesValue}
                        placeholder="Post a comment"
                        name="commText"
                        value={commText}
                        onChange={this.onChange}
                      />
                      {invalidFeedback}
                    </div>
                    <button type="submit" className="btn btn-dark">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* List Comments .. coming from post Reducer */}
            {this.props.post.post.comments.length > 0
              ? this.props.post.post.comments.map(comment => (
                  <div className="card card-body mb-3" key={comment._id}>
                    <div className="row">
                      <div className="col-md-2">
                        <Link to={`/profile/users/${comment.commUserID}`}>
                          <img
                            className="rounded-circle d-none d-md-block"
                            src={comment.commUserAvatar}
                            alt="user avatar"
                          />
                        </Link>
                        <br />
                        <p className="text-center">{comment.commUserName}</p>
                      </div>
                      <div className="col-md-10">
                        <p className="lead">{comment.commText}</p>
                        {comment.commUserID == this.props.auth.user.id ? (
                          <button
                            type="button"
                            className="btn btn-danger mr-1"
                            onClick={this.onDeleteClick.bind(this, comment._id)}
                          >
                            <i className="fa fa-times" />
                          </button>
                        ) : null}
                      </div>
                      {/* {comment.commUserID == this.props.auth.user.id ? (
                        <button
                          type="button"
                          className="btn btn-danger mr-1"
                          onClick={this.onDeleteClick.bind(this, post._id)}
                        >
                          <i className="fa fa-times" />
                        </button>
                      ) : null} */}
                    </div>
                  </div>
                ))
              : null}
          </div>
        );
      } else {
        return <h3>There is no post matching this id</h3>;
      }
    }
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPost, postComment, deleteComment }
)(Post);
