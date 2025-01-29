const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: String }],
});

// _id : Unique identifier for each of the documents.
// __v : Tracks how many times you updated that document.

const db = mongoose.connection.useDb("blog_db");
const Post = db.model("Post", postSchema);

module.exports = Post;
