import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
function TextInputGroup(props) {
  const {
    type,
    placeholder,
    name,
    value,
    onChange,
    error,
    info,
    disabled
  } = props;

  let invalidFeedback;
  let classNamesValue = classNames({
    "form-control form-control-lg": true,
    "is-invalid": error ? true : false
  });
  if (error) {
    invalidFeedback = <div className="invalid-feedback">{error}</div>;
  }

  return (
    <div className="form-group">
      <input
        type={type}
        className={classNamesValue}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled ? true : false}
      />

      {invalidFeedback}
      {info ? <small className="form-text text-muted">{info}</small> : null}
    </div>
  );
}

TextInputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  disabled: PropTypes.bool
};

export default TextInputGroup;
