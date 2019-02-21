const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateExperienceFields(data) {
  // data is an object of (all) fields of ExperienceFields
  //   data = req.body
  let {
    title, //Required
    company, //Required
    location, //Required
    from //Required
  } = data;

  let errors = {};
  if (isEmpty(title)) {
    errors.title = "Job title is required";
  }

  if (isEmpty(company)) {
    errors.company = "Company Field is required";
  }

  if (isEmpty(location)) {
    errors.location = "Company location is required";
  }
  if (isEmpty(from)) {
    errors.from = "From Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
