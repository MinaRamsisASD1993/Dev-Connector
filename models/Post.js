const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostModel = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: String,
  name: String,
  email: String,
  avatar: String,
  likes: [
    {
      likeUserID: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ],
  comments: [
    {
      commUserID: String,
      commUserName: String,
      commUserAvatar: String,
      commText: String,
      commDate: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Post", PostModel, "posts");
