import React, { Component } from "react";
import PropTypes from "prop-types";
class ProfileEducation extends Component {
  render() {
    const edusArr = this.props.edusArr;
    const DATE_OPTIONS = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return (
      <div className="col-md-6">
        <h3 className="text-center text-info">Education</h3>
        <ul className="list-group">
          {edusArr.map(edu => (
            <li className="list-group-item" key={edu._id}>
              <h4>{edu.school}</h4>
              <p>
                {new Date(edu.from).toLocaleDateString("en-US", DATE_OPTIONS)} -{" "}
                {new Date(edu.to).toLocaleDateString("en-US", DATE_OPTIONS)}
              </p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldOfStudy}
              </p>
              {edu.description ? (
                <p>
                  <strong>Description:</strong> {edu.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
ProfileEducation.propTypes = {
  edusArr: PropTypes.array.isRequired
};

export default ProfileEducation;
