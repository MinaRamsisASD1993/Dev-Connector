import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profileActions";

import TextInputGroup from "../TextInputGroup";
import SocialLinkGroup from "../SocialLinkGroup";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      handle: "", //TextInputGroup
      status: "",
      company: "", //TextInputGroup
      website: "", //TextInputGroup
      location: "", //TextInputGroup
      skills: "", //TextInputGroup
      github_username: "", //TextInputGroup
      bio: "", //TextInputGroup
      // SocialLinkGroupS
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",

      displaySocialLinks: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const profileFields = {
      handle: this.state.handle,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      github_username: this.state.github_username,
      bio: this.state.bio,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      linkedin: this.state.linkedin
    };

    this.props.createProfile(profileFields, this.props.history);
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    } else {
      return {
        errors: {}
      };
    }
  }

  render() {
    const {
      displaySocialLinks,
      handle,
      status,
      company,
      website,
      location,
      skills,
      github_username,
      bio,
      facebook,
      instagram,
      twitter,
      linkedin,
      errors
    } = this.state;

    let invalidFeedback;
    let classNamesValue = classNames({
      "form-control form-control-lg": true,
      "is-invalid": errors.status ? true : false
    });
    if (errors.status) {
      invalidFeedback = <div className="invalid-feedback">{errors.status}</div>;
    }

    return (
      <div className="create-profile pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name,
                  company name, nickname"
                />
                <div className="form-group">
                  <select
                    className={classNamesValue}
                    name="status"
                    value={status}
                    onChange={this.onChange}
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  {invalidFeedback}
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>

                <TextInputGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextInputGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own or a company website"
                />

                <TextInputGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City & state suggested (eg. Boston, MA)"
                />
                <TextInputGroup
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <TextInputGroup
                  type="text"
                  placeholder="Github Username"
                  name="github_username"
                  value={github_username}
                  onChange={this.onChange}
                  error={errors.github_username}
                  info="If you want your latest repos and a Github link, include
                  your username"
                />

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="A short bio of yourself"
                    name="bio"
                    value={bio}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light mr-3"
                    onClick={() => {
                      this.setState({
                        displaySocialLinks: !this.state.displaySocialLinks
                      });
                    }}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {displaySocialLinks ? (
                  <div className="social-links">
                    <SocialLinkGroup
                      type="text"
                      placeholder="Facebook Page URL"
                      name="facebook"
                      value={facebook}
                      onChange={this.onChange}
                      error={errors.facebook}
                    />
                    <SocialLinkGroup
                      type="text"
                      placeholder="Instagram Page URL"
                      name="instagram"
                      value={instagram}
                      onChange={this.onChange}
                      error={errors.instagram}
                    />
                    <SocialLinkGroup
                      type="text"
                      placeholder="Twitter Page URL"
                      name="twitter"
                      value={twitter}
                      onChange={this.onChange}
                      error={errors.twitter}
                    />
                    <SocialLinkGroup
                      type="text"
                      placeholder="Linkedin Page URL"
                      name="linkedin"
                      value={linkedin}
                      onChange={this.onChange}
                      error={errors.linkedin}
                    />
                  </div>
                ) : null}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
