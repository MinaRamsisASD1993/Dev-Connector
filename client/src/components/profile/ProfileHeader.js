import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.userID.avatar}
                  alt="user avatar"
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.userID.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {profile.company ? <span>at {profile.company}</span> : null}
              </p>
              <p>{profile.location ? <span>{profile.location}</span> : null}</p>
              <p>
                {profile.website ? (
                  <a href={profile.website} className="text-white p-2">
                    <i className="fa fa-globe fa-2x" />
                  </a>
                ) : null}
                {profile.social.facebook ? (
                  <a href={profile.social.facebook} className="text-white p-2">
                    <i className="fa fa-facebook fa-2x" />
                  </a>
                ) : null}
                {profile.social.instagram ? (
                  <a href={profile.social.instagram} className="text-white p-2">
                    <i className="fa fa-instagram fa-2x" />
                  </a>
                ) : null}
                {profile.social.linkedin ? (
                  <a href={profile.social.linkedin} className="text-white p-2">
                    <i className="fa fa-linkedin fa-2x" />
                  </a>
                ) : null}
                {profile.social.twitter ? (
                  <a href={profile.social.twitter} className="text-white p-2">
                    <i className="fa fa-twitter fa-2x" />
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileHeader;
