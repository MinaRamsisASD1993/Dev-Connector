const express = require("express");
const mongoose = require("mongoose");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

// Load Keys
const keys = require("../../config/keys");

// Load User Model
require("../../models/User");
const User = mongoose.model("User");

// Load jwt Strategy
require("../../config/passport");

// Load validation
const validateRegister = require("../../validation/register");
const validateLogin = require("../../validation/login");

// @route     GET api/users/test
// @desc      TEST users route
// @access    Public
router.get("/test", (req, res) => {
  res.json({ msg: "/users Works" });
});

// @route     POST api/users/register
// @desc      Register a New User
// @access    Public
router.post("/register", (req, res) => {
  // Server Validation First
  const { errors, isValid } = validateRegister(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // There is already a user with the same Email
        // Send a Bad Request (400)
        errors.email = "Email already exists";
        return res.status(400).json({ errors });
      } else {
        // Do The Registeration
        const avatar = gravatar.url(req.body.email, {
          s: "200", //size
          r: "pg", //rating
          d: "mm" //default
        });

        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar
        };
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            const user = new User(newUser);
            user.save().then(newUser => {
              return res.json({ newUser });
            });
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route     POST api/users/login
// @desc      Logging In User & creating JWT For this user
// @access    Public
router.post("/login", (req, res) => {
  // Check Server Validation first
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (user) {
      // Compare the entered password with what's in DB
      const pwdInDB = user.password;
      bcrypt.compare(password, pwdInDB).then(isMatch => {
        if (isMatch) {
          // Matching User
          // JWT Structure
          // Header.Payload.Signature
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: "1h" },
            (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          // Incorrect Password (400 Bad Request Error)
          errors.password = "Incorrect Password";
          res.status(400).json({ errors });
        }
      });
    } else {
      // Not Found
      errors.email = "User Not Found";
      res.status(404).json({ errors });
    }
  });
});

// @route     GET api/users/current
// @desc      Testing Current User
// @access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // If Payload in the token matches a user from db
    // 'req.user' contains logged in user
    res.json({
      loggedInUser: req.user
    });
  }
);

module.exports = router;
