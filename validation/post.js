const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validatePost(data) {
  // data is an object of text
  let errors = {};

  if (!validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Text field must be at least 10 characters";
  }
  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
