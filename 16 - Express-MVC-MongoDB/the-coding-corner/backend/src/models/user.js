const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const db = mongoose.connection.useDb("blog_db");
const User = db.model("User", userSchema);

module.exports = User;
