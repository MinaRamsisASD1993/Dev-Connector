const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");

// Load User Model
require("../models/User");
const User = mongoose.model("User");

const keys = require("./keys");

// fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the "authorization header" with the scheme 'bearer'
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.secretOrKey
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id).then(user => {
      if (user) {
        // Auth
        return done(null, user);
      } else {
        // NOT Auth
        return done(null, false);
      }
    });
  })
);
