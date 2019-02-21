const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

// Load Profile Model
require("../../models/Profile");
const Profile = mongoose.model("Profile");
// Load User Model
require("../../models/User");
const User = mongoose.model("User");

// Load validateProfileFields
const validateProfileFields = require("../../validation/profile");
// Load validateExperienceFields
const validateExperienceFields = require("../../validation/experience");
// Load validateEducationFields
const validateEducationFields = require("../../validation/education");

// @route     GET api/profile/test
// @desc      Testing Route
// @access    Public
router.get("/test", (req, res) => {
  res.json({ msg: "/profile Works" });
});

// @route     GET api/profile/handle/:handle
// @desc      Getting Profile by handle
// @access    Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("userID", ["name", "avatar"])
    .then(profile => {
      if (profile) {
        res.json({ profile });
      } else {
        errors.noprofile = "There is no profile";
        return res.status(404).json({ errors });
      }
    })
    .catch(err => res.status(400).json({ err }));
});

// @route     GET api/profile/users/:user_id
// @desc      Getting Profile by user_id
// @access    Public
router.get("/users/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ userID: req.params.user_id })
    .populate("userID", ["name", "avatar", "email"])
    .then(profile => {
      res.json({ profile });
    })
    .catch(() => {
      errors.noid = "There is no profile matching this id";
      res.status(400).json({ errors });
    });
});

// @route     GET api/profile/all
// @desc      Getting All Profiles
// @access    Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find({})
    .populate("userID", ["name", "avatar"])
    .then(profiles => {
      if (profiles) {
        res.json({ profiles });
      } else {
        errors.noprofiles = "There are no profiles created yet!";
        return res.status(404).json({ errors });
      }
    })
    .catch(err => res.status(400).json(err));
});

// @route     GET api/profile
// @desc      Getting Current User's Profile
// @access    Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ userID: req.user._id })
      .populate("userID", ["name", "avatar"]) //The 2 Fields I do Want
      .then(profile => {
        if (profile) {
          // There is Profile for this user
          return res.json({ profile });
        } else {
          //There is NO Profile for this user
          errors.noprofile = "There is No Profile";
          return res.status(404).json({ errors });
        }
      })
      .catch(err => res.status(404).json({ err }));
  }
);

// @route     POST api/profile
// @desc      Adding NEW Profile Or Edit an existent One
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // All fields in req.body are required .. to check
    const { errors, isValid } = validateProfileFields(req.body);

    // if There are Errors
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const profileFields = {
      userID: req.user._id,
      // This handle Input must be Unique .. no 2 profiles with the same handle
      handle: req.body.handle,
      company: req.body.company,
      website: req.body.website,
      location: req.body.location,
      status: req.body.status,
      // Skills Comma Seperated Values
      skills: req.body.skills.split(","),
      bio: req.body.bio,
      github_username: req.body.github_username,

      social: {
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        linkedin: req.body.linkedin,
        twitter: req.body.twitter
      }
    };

    Profile.findOne({ userID: req.user._id })
      .populate("userID")
      .then(profile => {
        if (profile) {
          // There is already a profile for this user
          // Update
          Profile.findOneAndUpdate(
            { userID: req.user._id },
            {
              handle: profileFields.handle,
              company: profileFields.company,
              website: profileFields.website,
              location: profileFields.location,
              status: profileFields.status,
              skills: profileFields.skills,
              bio: profileFields.bio,
              github_username: profileFields.github_username,
              social: profileFields.social
            },
            { new: true } // it will return the Updated Record
          ).then(updProfile => {
            res.json({ updProfile });
          });
        } else {
          // There is NO profile for this user
          // Create New One
          // First check if handle is unique
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "There is already a user with that handle";
              return res.status(400).json({ errors });
            } else {
              const profile = new Profile(profileFields);
              profile.save().then(addedProfile => {
                res.json({ addedProfile });
              });
            }
          });
        }
      });
  }
);

// @route     POST api/profile/experience
// @desc      Adding NEW Experience Or Edit an existent One
// @access    Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // All fields in req.body are required .. to check
    const { errors, isValid } = validateExperienceFields(req.body);

    // if There are Errors
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const experienceFields = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    const toField = new Date(experienceFields.to);
    const now = new Date();

    if (!experienceFields.to || toField >= now) {
      experienceFields.current = true;
      experienceFields.to = now;
    } else {
      experienceFields.current = false;
    }

    Profile.findOne({ userID: req.user._id })
      .populate("userID")
      .then(profile => {
        if (profile) {
          // There is already a profile for this user
          // Update Experience
          Profile.findOneAndUpdate(
            { userID: req.user._id },
            {
              experience: [experienceFields, ...profile.experience]
            },
            { new: true } // it will return the Updated Record
          ).then(updProfile => {
            res.json({ updProfile });
          });
        } else {
          // There is NO profile for this user
          // Create New One with the new experiences
          const profileFields = {
            userID: req.user._id,
            experience: [experienceFields]
          };
          const profile = new Profile(profileFields);
          profile.save().then(addedProfile => {
            res.json({ addedProfile });
          });
        }
      });
  }
);

// @route     POST api/profile/education
// @desc      Adding NEW Education Or Edit an existent One
// @access    Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // All fields in req.body are required .. to check
    const { errors, isValid } = validateEducationFields(req.body);

    // if There are Errors
    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const educationFields = {
      school: req.body.school,
      degree: req.body.degree,
      fieldOfStudy: req.body.fieldOfStudy,
      from: req.body.from,
      to: req.body.to,
      current: req.body.current,
      description: req.body.description
    };
    const toField = new Date(educationFields.to);
    const now = new Date();

    if (!educationFields.to || toField >= now) {
      educationFields.current = true;
      educationFields.to = now;
    } else {
      educationFields.current = false;
    }

    Profile.findOne({ userID: req.user._id })
      .populate("userID")
      .then(profile => {
        if (profile) {
          // There is already a profile for this user
          // Update Education
          Profile.findOneAndUpdate(
            { userID: req.user._id },
            {
              education: [educationFields, ...profile.education]
            },
            { new: true } // it will return the Updated Record
          ).then(updProfile => {
            res.json({ updProfile });
          });
        } else {
          // There is NO profile for this user
          // Create New One with the new education
          const profileFields = {
            userID: req.user._id, //This is the key for Profile
            education: [educationFields]
          };
          const profile = new Profile(profileFields);
          profile.save().then(addedProfile => {
            res.json({ addedProfile });
          });
        }
      });
  }
);

// @route     DELETE api/profile/experience/:expID
// @desc      Deleting an experience
// @access    Private
router.delete(
  "/experience/:expID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ userID: req.user._id })
      .then(profile => {
        if (profile) {
          // There is a profile
          Profile.findOneAndUpdate(
            { userID: req.user._id },
            {
              experience: profile.experience.filter(
                exp => exp._id != req.params.expID
              )
            },
            { new: true }
          ).then(updProfile => {
            return res.json({ updProfile });
          });
        } else {
          errors.noprofile = "There is no profile for that user";
          return res.status(404).json({ errors });
        }
      })
      .catch(err => res.status(400).json({ err }));
  }
);

// @route     DELETE api/profile/education/:eduID
// @desc      Deleting an education
// @access    Private
router.delete(
  "/education/:eduID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ userID: req.user._id })
      .then(profile => {
        if (profile) {
          // There is a profile
          Profile.findOneAndUpdate(
            { userID: req.user._id },
            {
              education: profile.education.filter(
                edu => edu._id != req.params.eduID
              )
            },
            { new: true }
          ).then(updProfile => {
            return res.json({ updProfile });
          });
        } else {
          errors.noprofile = "There is no profile for that user";
          return res.status(404).json({ errors });
        }
      })
      .catch(err => res.status(400).json({ err }));
  }
);
// @route     DELETE api/profile
// @desc      Deleting a User along with Profile
// @access    Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ userID: req.user._id })
      .then(() => {
        User.findOneAndDelete({ _id: req.user._id }).then(() => {
          return res.json({ msg: "Successful Delete" });
        });
      })
      .catch(err => res.status(400).json({ err }));
  }
);

module.exports = router;
