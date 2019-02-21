const validator = require("validator");
const isEmpty = require("./isEmpty");
module.exports = function validateProfileFields(data) {
  // data is an object of (all) fields of profileFields
  //   data = req.body
  let {
    handle, //required and between 2 and 30 chars
    website, //NOT Required .. but if not empty .. format as URL
    status, //required
    skills, //required
    facebook, //NOT Required .. but if not empty .. format as URL
    instagram, //NOT Required .. but if not empty .. format as URL
    linkedin, //NOT Required .. but if not empty .. format as URL
    twitter //NOT Required .. but if not empty .. format as URL
  } = data;

  let errors = {};
  if (!validator.isLength(handle, { min: 2, max: 30 })) {
    errors.handle = "handle field must be from 2 to 30 charcters";
  }
  if (isEmpty(handle)) {
    errors.handle = "handle field is required";
  }
  if (isEmpty(status)) {
    errors.status = "status field is required";
  }
  if (isEmpty(skills)) {
    errors.skills = "skills field is required";
  }
  if (!isEmpty(website)) {
    if (!validator.isURL(website)) {
      errors.website = "website field is not a valid URL";
    }
  }
  if (!isEmpty(facebook)) {
    if (!validator.isURL(facebook)) {
      errors.facebook = "facebook field is not a valid URL";
    }
  }
  if (!isEmpty(instagram)) {
    if (!validator.isURL(instagram)) {
      errors.instagram = "instagram field is not a valid URL";
    }
  }
  if (!isEmpty(linkedin)) {
    if (!validator.isURL(linkedin)) {
      errors.linkedin = "linkedin field is not a valid URL";
    }
  }
  if (!isEmpty(twitter)) {
    if (!validator.isURL(twitter)) {
      errors.twitter = "twitter field is not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
