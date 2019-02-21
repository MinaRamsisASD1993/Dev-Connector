import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

class ProfileGithub extends Component {
  _isMounted = false;
  state = {
    repos: [],
    error: ""
  };

  componentDidMount() {
    this._isMounted = true;
    const clientID = "fb2592d9f1c98657a515";
    const clientSecret = "e451456b894d369dd582ec15f51255723a82f6be";

    const { github_username } = this.props;
    // Get Repos from Github API
    fetch(
      `https://api.github.com/users/${github_username}/repos?per_page=5&sort=created:asc?client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ repos: data });
        }
      })
      .catch(err => {
        if (this._isMounted) {
          this.setState({ error: err });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { error, repos } = this.state;
    if (error !== "") {
      return <h3>{error}</h3>;
    } else {
      if (repos.length > 0) {
        return (
          <div className="col">
            <h3 className="mb-4">Latest Github Repos</h3>
            {repos.map(repo => (
              <div className="card card-body mb-2" key={repo.id}>
                <div className="row">
                  <div className="col-md-6">
                    <h4>
                      <a
                        href={repo.html_url}
                        className="text-info"
                        target="_blank"
                      >
                        {" "}
                        {repo.name}
                      </a>
                    </h4>
                    <p>{repo.description}</p>
                  </div>
                  <div className="col-md-6">
                    <span className="badge badge-info mr-1">
                      Stargazers Count: {repo.stargazers_count}
                    </span>
                    <span className="badge badge-secondary mr-1">
                      Watchers: {repo.watchers}
                    </span>
                    <span className="badge badge-success">
                      Forks: {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else {
        return <Spinner />;
      }
    }
  }
}

ProfileGithub.propTypes = {
  github_username: PropTypes.string.isRequired
};

export default ProfileGithub;
