const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateEducationFields(data) {
  // data is an object of (all) fields of EducationFields
  //   data = req.body
  let {
    school, //Required
    fieldOfStudy, //Required
    degree, //Required
    from //Required
  } = data;

  let errors = {};
  if (isEmpty(school)) {
    errors.school = "school Field is required";
  }
  if (isEmpty(degree)) {
    errors.degree = "degree Field is required";
  }
  if (isEmpty(fieldOfStudy)) {
    errors.fieldOfStudy = "field of study field is required";
  }
  if (isEmpty(from)) {
    errors.from = "From Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
