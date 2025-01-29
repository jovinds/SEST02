const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  updatePost,
} = require("../controllers/post");

const { authMiddleware } = require("../middleware/authMiddleWare");

// POST: http://localhost:3000/api/posts/
router.post("/", createPost);
// GET: http://localhost:3000/api/posts/
router.get("/", getAllPosts);
// GET: http://localhost:3000/api/posts/:id
router.get("/:id", getPost);
// DELETE: http://localhost:3000/api/posts/:id
router.delete("/:id", deletePost);
// PUT: http://localhost:3000/api/posts/:id
router.put("/:id", updatePost);

module.exports = router;
