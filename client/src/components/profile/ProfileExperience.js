import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileExperience extends Component {
  render() {
    const { expsArr } = this.props;
    const DATE_OPTIONS = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return (
      <div className="col-md-6">
        <h3 className="text-center text-info">Experience</h3>
        <ul className="list-group">
          {expsArr.map(exp => (
            <li className="list-group-item" key={exp._id}>
              <h4>{exp.company}</h4>
              <p>
                {new Date(exp.from).toLocaleDateString("en-US", DATE_OPTIONS)} -{" "}
                {new Date(exp.to).toLocaleDateString("en-US", DATE_OPTIONS)}
              </p>
              <p>
                <strong>Position:</strong> {exp.title}
              </p>
              {exp.description ? (
                <p>
                  <strong>Description:</strong> {exp.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ProfileExperience.propTypes = {
  expsArr: PropTypes.array.isRequired
};

export default ProfileExperience;
