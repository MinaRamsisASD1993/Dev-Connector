import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInputGroup from "../TextInputGroup";
import { addEducation, getCurrentProfile } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor() {
    super();
    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
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
    const eduFields = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: "on" ? true : false,
      description: this.state.description
    };
    this.props.addEducation(eduFields, this.props.history);
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
      school,
      degree,
      fieldOfStudy,
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
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextInputGroup
                  type="text"
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextInputGroup
                  type="text"
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextInputGroup
                  type="text"
                  placeholder="Field Of Study"
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  onChange={this.onChange}
                  error={errors.fieldOfStudy}
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
                    Current Education
                  </label>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Program Description"
                    name="description"
                    value={description}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    Tell us about your experience and what you learned
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
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
  { addEducation, getCurrentProfile }
)(withRouter(AddEducation));
