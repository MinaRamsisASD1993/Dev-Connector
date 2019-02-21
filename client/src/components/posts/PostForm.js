import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { createPost, clearErrorsFormOnMount } from "../../actions/postActions";
import classNames from "classnames";
class PostForm extends Component {
  state = {
    text: "",
    errors: {}
  };
  onChange = e => {
    this.setState({ text: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name, email, avatar } = this.props.auth.user;
    const newPost = {
      text: this.state.text,
      name,
      email,
      avatar
    };
    this.props.createPost(newPost, this.props.history);
    // Whatever happens clear text
    this.setState({ text: "" });
  };
  componentDidMount() {
    // Clear any errors in errors reducer
    this.props.clearErrorsFormOnMount();
  }

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

  render() {
    const { text, errors } = this.state;
    let invalidFeedback;
    let classNamesValue = classNames({
      "form-control form-control-lg": true,
      "is-invalid": Object.keys(errors).length > 0 ? true : false
    });
    if (Object.keys(errors).length > 0) {
      invalidFeedback = <div className="invalid-feedback">{errors.text}</div>;
    }
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className={classNamesValue}
                  placeholder="Create a post"
                  name="text"
                  value={text}
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
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  post: state.post,
  auth: state.auth
});
PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrorsFormOnMount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { createPost, clearErrorsFormOnMount }
)(withRouter(PostForm));
