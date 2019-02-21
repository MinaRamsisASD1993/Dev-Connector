const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateLogin(data) {
  // data is an object of email, password
  let errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid Email";
  }
  if (isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }

  if (isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
