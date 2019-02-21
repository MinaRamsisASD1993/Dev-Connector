import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout_user } from "../../actions/authActions";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.onLogout = this.onLogout.bind(this);
  }

  static getDerivedStateFromProps(nextProps) {
    const { auth } = nextProps;
    if (auth.isAuthenticated) {
      return {
        isLoggedIn: true
      };
    } else {
      return {
        isLoggedIn: false
      };
    }
  }
  onLogout() {
    this.props.logout_user();
  }

  render() {
    const { isLoggedIn } = this.state;
    const { user } = this.props.auth;
    let output;
    if (isLoggedIn) {
      output = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-link">
            <Link className="nav-link postsLink" to="/feed">
              Post Feed
            </Link>
          </li>
          <li className="nav-item dashLink">
            <Link className="nav-link " to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={this.onLogout}>
              <img
                src={user.avatar}
                className="userAvatar rounded-circle"
                title={user.email}
                alt="user"
              />
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      output = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              DevConnector
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {" "}
                    Developers
                  </Link>
                </li>
              </ul>

              {output}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout_user: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout_user }
)(Navbar);
