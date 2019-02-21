const isEmpty = require("./isEmpty");
module.exports = function validateComment(data) {
  // data is an object of commText Field
  let errors = {};

  if (isEmpty(data.commText)) {
    errors.commText = "Comment Text Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
