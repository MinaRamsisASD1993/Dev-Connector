import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(expID) {
    this.props.deleteEducation(expID);
    window.location.reload();
  }

  render() {
    const edus = this.props.edus;
    const DATE_OPTIONS = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {edus.map(edu => (
              <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                  {new Date(edu.from).toLocaleDateString("en-US", DATE_OPTIONS)}{" "}
                  - {new Date(edu.to).toLocaleDateString("en-US", DATE_OPTIONS)}
                </td>
                <td>
                  <i
                    className="fa fa-trash deleteFA"
                    onClick={this.onDeleteClick.bind(this, edu._id)}
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
Education.propTypes = {
  edus: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
