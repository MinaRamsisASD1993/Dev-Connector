import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../TextInputGroup";
import { addExperience, getCurrentProfile } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false, //if pressed disableToField
      description: "",
      errors: {},
      disableToField: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickCurrent = this.onClickCurrent.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const expFields = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: "on" ? true : false,
      description: this.state.description
    };
    this.props.addExperience(expFields, this.props.history);
  }
  onClickCurrent() {
    this.setState({
      current: !this.state.current,
      disableToField: !this.state.disableToField
    });
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    } else {
      this.props.getCurrentProfile();
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
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      errors,
      disableToField
    } = this.state;
    return (
      <div className="section add-experience mb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextInputGroup
                  type="text"
                  placeholder="* Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextInputGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <h6>From Date</h6>
                <TextInputGroup
                  type="date"
                  name="from"
                  value={from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextInputGroup
                  type="date"
                  name="to"
                  value={to}
                  onChange={this.onChange}
                  disabled={disableToField ? true : false}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    id="current"
                    checked={current}
                    onChange={this.onClickCurrent}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Job Description"
                    name="description"
                    value={description}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Some of your responsabilities, etc
                  </small>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience, getCurrentProfile }
)(withRouter(AddExperience));
