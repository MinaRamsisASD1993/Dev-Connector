import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteExperience } from "../../actions/profileActions";

class Experiences extends Component {
  onDeleteClick(expID) {
    this.props.deleteExperience(expID);
    window.location.reload();
  }

  render() {
    const experiences = this.props.exps;
    const DATE_OPTIONS = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {experiences.map(exp => (
              <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                  {new Date(exp.from).toLocaleDateString("en-US", DATE_OPTIONS)}{" "}
                  - {new Date(exp.to).toLocaleDateString("en-US", DATE_OPTIONS)}
                </td>
                <td>
                  <i
                    className="fa fa-trash deleteFA"
                    onClick={this.onDeleteClick.bind(this, exp._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
Experiences.propTypes = {
  exps: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experiences);
