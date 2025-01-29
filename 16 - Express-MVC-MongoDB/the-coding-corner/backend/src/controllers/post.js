const Post = require("../models/post");

// POST: Create a new Post
const createPost = async (request, response) => {
  const { title, author, description, likes, comments } = request.body;
  try {
    const post = await Post.create({
      title,
      author,
      description,
      likes,
      comments,
    });
    response.status(201).json(post);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// GET: Get all the post documents
const getAllPosts = async (request, response) => {
  try {
    const posts = await Post.find();
    response.status(200).json(posts);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// GET: Get a specific post using its ID.
const getPost = async (request, response) => {
  const { id } = request.params;
  try {
    const post = await Post.findById({ _id: id });
    if (!post) return response.status(404).json({ error: "No post found!" });
    response.status(200).json(post);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// DELETE: Delete a specific post using ID.
const deletePost = async (request, response) => {
  const { id } = request.params;
  try {
    const post = await Post.findByIdAndDelete({ _id: id });
    if (!post) return response.status(404).json({ error: "No post found!" });
    response.status(200).json({ message: "The post has been removed" });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

// PUT: Update a specific post using ID
const updatePost = async (request, response) => {
  const { id } = request.params;
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { ...request.body },
      { new: true, runValidators: true }
    );
    if (!post) return response.status(404).json({ error: "No post found!" });
    response.status(200).json({
      message: "The post has been updated successfully!",
      post,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
};
