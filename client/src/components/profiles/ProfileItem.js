import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileItem extends Component {
  render() {
    const profiles = this.props.profiles;
    console.log(profiles);
    if (profiles) {
      if (profiles.length > 0) {
        return profiles.map(profile => (
          <div className="card card-body bg-light mb-3" key={profile._id}>
            <div className="row">
              <div className="col-2">
                <img
                  className="rounded-circle"
                  src={profile.userID.avatar}
                  alt="user avatar"
                />
              </div>
              <div className="col-lg-6 col-8">
                <h3>{profile.userID.name}</h3>
                <div className="mb-2">
                  {profile.status}{" "}
                  {profile.company ? <span> at {profile.company}</span> : null}{" "}
                </div>
                <div className="mb-2">
                  {profile.location ? (
                    <span> at {profile.location}</span>
                  ) : null}{" "}
                </div>
                <Link
                  to={`/profile/${profile.handle}`}
                  className="btn btn-info"
                >
                  View Profile
                </Link>
              </div>
              <div className="col-lg-4 d-none d-lg-block">
                <h4>Skill Set</h4>
                <ul className="list-group">
                  {profile.skills.slice(0, 4).map((skill, index) => (
                    <li className="list-group-item" key={index}>
                      <i className="fa fa-check pr-1" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ));
      } else {
        return <h4>No Profiles created yet</h4>;
      }
    } else {
      return null;
    }
  }
}
ProfileItem.propTypes = {
  profiles: PropTypes.array
};
export default ProfileItem;
