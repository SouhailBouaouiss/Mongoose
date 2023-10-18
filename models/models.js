const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating the Post mongoose model in order to creat
// posts

const postsSchema = new Schema({
  description: String,
  imgURL: String,

  // Passing the ObjectId of the user as a property
  // enable refering the User Model in order to get the complet object of the user
  user: {
    // ObjectId of the specific user
    type: mongoose.Types.ObjectId,

    // refering to the Users Model

    ref: "User",
  },

  // creating an array of comments where we can stock the ObjectIds of
  // the comments and refering to them by the Comments Model
  comments: [
    {
      // ObjectId of the specific comment
      type: mongoose.Types.ObjectId,

      // refering to the Comments Model
      ref: "Comment",
    },
  ],
});

const Posts = mongoose.model("Post", postsSchema);

// Users Model

const usersSchema = new Schema({
  name: String,
  email: String,
  pwd: String,
  id: {
    type: String,
    required: true,
    unique: true,
  },
});

const Users = mongoose.model("User", usersSchema);

// Comments Model

const commentsSchema = new Schema({
  text: String,

  // Passing the ObjectId of the user as a property
  // enable refering the User Model in order to get the complet object of the user

  user: {
    // ObjectId of the specific user

    type: mongoose.Types.ObjectId,

    // refering to the Comments Model
    ref: "User",
  },
});

const Comment = mongoose.model("Comment", commentsSchema);

module.exports = { Posts, Users, Comment };
