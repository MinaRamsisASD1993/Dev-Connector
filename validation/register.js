const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateRegister(data) {
  // data is an object of name, email, password, password2
  let errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = "Name must be from 2 to 12 characters";
  }
  if (isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid Email";
  }
  if (isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (data.password !== data.password2) {
    errors.password2 = "Confirm Password doesn't match Password Field ";
  }
  if (isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
