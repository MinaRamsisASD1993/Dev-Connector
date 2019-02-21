import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../Spinner";
import ProfileButtons from "./ProfileButtons";
import { deleteAccount } from "../../actions/profileActions";
import Experiences from "./Experiences";
import Education from "./Education";
class Dashboard extends Component {
  onDeleteAccountClick = () => {
    if (window.confirm("Are You Sure? This can NOT be undone!")) {
      this.props.deleteAccount(this.props.history);
    }
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    const { loading, profile } = this.props.profile;
    const { name } = this.props.auth.user;

    let dashboard;
    if (Object.keys(profile).length === 0) {
      console.log("No profile for this user YET");
      dashboard = (
        <div className="noProfileDashBoard">
          <p>You haven't created a profile yet.</p>
          <Link to="/create-profile" className="btn btn-light">
            <i className="fa fa-user-circle text-info mr-1" /> Create a profile
          </Link>
        </div>
      );
    } else {
      console.log("There is a profile");
      dashboard = (
        <div>
          <ProfileButtons />
          {profile.profile.experience.length > 0 ? (
            <Experiences exps={profile.profile.experience} />
          ) : null}

          {profile.profile.education.length > 0 ? (
            <Education edus={profile.profile.education} />
          ) : null}

          <div className="mb-5">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onDeleteAccountClick}
            >
              Delete My Account
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            <p className="lead text-muted">Welcome {name}</p>
            {loading ? <Spinner /> : dashboard}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(withRouter(Dashboard));
