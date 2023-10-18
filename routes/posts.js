const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { Posts, Comment } = require("../models/models");
const { Users } = require("../models/models");
const { checkCsrf } = require("../midlewares/checkCsrf");

const postsRouter = Router();

postsRouter.get("/", async (req, res, next) => {
  if (req.isAuthenticated()) {
    try {
      const generatedToken = req.cookies["CSRF"];
      Posts.find()
        .populate("user") // 1st level subdoc (get user)
        .populate({
          path: "comments", // 1st level subdoc (get comments)
          populate: {
            // 2nd level subdoc (get comments' user)
            path: "user",
          },
        });
      return;
    } catch (error) {
      console.log(error);
      res.send(error);
      return;
    }
  }
  res.redirect("/auth");
});

postsRouter.post("/share", async (req, res, next) => {
  console.log(req.isAuthenticated(), req.user);
  if (req.isAuthenticated()) {
    const user = req.user._id;
    const { description, imgURL } = req.body;
    await Posts.create({ user, description, imgURL });
    res.redirect("/home");
    return;
  }
  res.send("katkharbaq");
});

postsRouter.post("/comment", async (req, res, next) => {
  if (req.isAuthenticated()) {
    // Getting the user id from Passport deserialize method

    const user = req.user._id;

    // Getting the comment's text and postID which are passed
    //in the form of adding comments

    const { text, post } = req.body;

    // Creating a comment document in the comments collection
    // using the Comment mongoose model

    const comments = await Comment.create({ user, post, text });

    await Posts.updateOne(
      { _id: post },
      { $addToSet: { comments: comments._id } }
    );

    return res.redirect("/home");
  }
  res.send("wa katkharbaaaaaq");
});

module.exports = { postsRouter };
