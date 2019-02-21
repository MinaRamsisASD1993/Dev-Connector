import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
function TextInputGroup(props) {
  const { type, placeholder, name, value, onChange, error } = props;

  let invalidFeedback;
  let classNamesValue = classNames({
    "form-control form-control-lg": true,
    "is-invalid": error ? true : false
  });
  if (error) {
    invalidFeedback = <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={`fa fa-${name}`} />
        </span>
      </div>
      <input
        type={type}
        className={classNamesValue}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {invalidFeedback}
    </div>
  );
}

TextInputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  disabled: PropTypes.bool
};

export default TextInputGroup;
