const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  handle: String, //for in the URL /profiles/minaramsis
  company: String,
  website: String,
  location: String,
  status: String,
  skills: [String], //Comma Seperated Values like this: HTML, CSS, JS
  bio: String,
  github_username: String,
  experience: [
    {
      title: String,
      company: String,
      location: String,
      from: Date,
      to: Date,
      current: Boolean,
      description: String
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      field_of_study: String,
      from: Date,
      to: Date,
      current: Boolean,
      description: String
    }
  ],
  social: {
    facebook: String,
    instagram: String,
    linkedin: String,
    twitter: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Profile", ProfileSchema, "profiles");
