import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileByHandle } from "../../actions/profileActions";
import Spinner from "../Spinner";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

class Profile extends Component {
  state = {
    errors: {}
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    this.props.getProfileByHandle(handle);
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
    const { profile, loading } = this.props.profile;
    const { errors } = this.state;
    if (loading) {
      return <Spinner />;
    } else {
      if (Object.keys(errors).length > 0) {
        return <h2>There is no profile matching this handle!!!</h2>;
      } else {
        if (typeof profile.profile !== "undefined") {
          if (Object.keys(profile.profile).length > 0) {
            return (
              <div className="profile">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-6">
                          <Link
                            to="/profiles"
                            className="btn btn-light mb-3 float-left"
                          >
                            Back To Profiles
                          </Link>
                        </div>
                        <div className="col-6" />
                      </div>
                      {/* PROFILE HEADER */}
                      <ProfileHeader profile={profile.profile} />
                      {/* PROFILE ABOUT */}
                      <ProfileAbout profile={profile.profile} />
                      <div className="row mb-3">
                        {/* Profile Exp (if there) */}
                        {profile.profile.experience.length > 0 ? (
                          <ProfileExperience
                            expsArr={profile.profile.experience}
                          />
                        ) : null}
                        {/* Profile Edu (if there) */}
                        {profile.profile.education.length > 0 ? (
                          <ProfileEducation
                            edusArr={profile.profile.education}
                          />
                        ) : null}
                        {/* Github Repos (if there) */}
                        {profile.profile.github_username ? (
                          <ProfileGithub
                            github_username={profile.profile.github_username}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return <h3>NO PROFILE CREATED FOR THAT USER YET</h3>;
          }
        } else {
          return <h3>still waiting</h3>;
        }
      }
    }
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
