const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();

// Load Post Model
require("../../models/Post");
const Post = mongoose.model("Post");

// Load postValidation
const validatePost = require("../../validation/post");
// Load commentValidation
const validateComment = require("../../validation/comment");

// Load Passport
require("../../config/passport");

// @route   GET api/posts/test
// @desc    TEST posts route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ msg: "/posts Works" });
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // Validation
    const { errors, isValid } = validatePost(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const newPost = {
      userID: req.user._id,
      text: req.body.text,
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar
    };
    const post = new Post(newPost);
    post
      .save()
      .then(post => {
        return res.json(post);
      })
      .catch(err => res.status(404).json({ err }));
  }
);

// @route   GET api/posts
// @desc    Get All posts
// @access  Public
router.get("/", (req, res) => {
  const errors = {};
  Post.find({})
    .sort({ date: "desc" })
    .then(posts => {
      if (posts) {
        return res.json(posts);
      } else {
        errors.noposts = "There are no posts created yet";
        return res.status(404).json({ errors });
      }
    })
    .catch(err => res.status(404).json({ err }));
});

// @route   GET api/posts/:postID
// @desc    Get a single post
// @access  Public
router.get("/:postID", (req, res) => {
  const errors = {};
  Post.findById(req.params.postID)
    .then(post => {
      return res.json(post);
    })
    .catch(() => {
      errors.noprofile = "There is no profile with this id";
      return res.status(404).json({ errors });
    });
});

// @route   DELETE api/posts/:postID
// @desc    Delete a post
// @access  Private
router.delete(
  "/:postID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOneAndRemove({ userID: req.user._id, _id: req.params.postID })
      .then(post => {
        if (post) {
          return res.json({ msg: "Post successfully deleted" });
        } else {
          return res.status(403).json({ err: "Forbidden to delete that post" });
        }
      })
      .catch(err => res.status(404).json({ err }));
  }
);

// @route   POST api/posts/like/:postID
// @desc    Add a like
// @access  Private
router.post(
  "/like/:postID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.postID)
      .then(post => {
        let alreadyLiked = false;
        post.likes.forEach(like => {
          if (like.likeUserID.toString() === req.user._id.toString()) {
            // There is already a like before
            alreadyLiked = true;
            errors.alreadyLiked = "there is already a like before";
            return res.status(400).json({ errors });
          }
        });
        // No like before ? Continue
        if (alreadyLiked === false) {
          post.likes = [{ likeUserID: req.user._id }, ...post.likes];
          post.save().then(updPost => {
            return res.json(updPost);
          });
        }
      })
      .catch(err => res.status(404).json({ err }));
  }
);

// @route   POST api/posts/dislike/:postID
// @desc    Remove a like
// @access  Private
router.post(
  "/dislike/:postID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postID)
      .then(post => {
        post.likes = post.likes.filter(
          like => like.likeUserID.toString() !== req.user._id.toString()
        );
        post.save().then(updPost => {
          res.json(updPost);
        });
      })
      .catch(err => res.status(404).json({ err }));
  }
);

// @route   POST api/posts/comments/:postID
// @desc    Post a comment
// @access  Private
router.post(
  "/comments/:postID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // commText: "new commmmmmment↵"
    // commUserAvatar: "//www.gravatar.com/avatar/51323ccd86fb1c7782648f385d21272d?s=200&r=pg&d=mm"
    // commUserID: "5c619f5e27d79e1280484b78"
    // commUserName: "Mina"
    const { errors, isValid } = validateComment(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    Post.findById(req.params.postID)
      .then(post => {
        const newComment = {
          commUserID: req.body.commUserID,
          commText: req.body.commText,
          commUserAvatar: req.body.commUserAvatar,
          commUserName: req.body.commUserName
        };
        post.comments.unshift(newComment);

        post.save().then(updPost => {
          res.json(updPost);
        });
      })
      .catch(err => res.status(404).json({ err }));
  }
);
// @route   POST api/posts/comment/:postID/:commID
// @desc    Delete a comment
// @access  Private
router.delete(
  "/comment/:postID/:commID",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Post.findById(req.params.postID)
      .then(post => {
        post.comments.forEach((comment, index) => {
          if (comment._id.toString() === req.params.commID.toString()) {
            // Delete it
            post.comments.splice(index, 1);
          }
        });

        post.save().then(updPost => {
          res.json(updPost);
        });
      })
      .catch(err => {
        errors.nopost = "There is no post found";
        res.status(404).json({ err });
      });
  }
);

module.exports = router;
