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
router.post("/", authMiddleware, createPost);
// GET: http://localhost:3000/api/posts/
router.get("/", authMiddleware, getAllPosts);
// GET: http://localhost:3000/api/posts/:id
router.get("/:id", authMiddleware, getPost);
// DELETE: http://localhost:3000/api/posts/:id
router.delete("/:id", authMiddleware, deletePost);
// PUT: http://localhost:3000/api/posts/:id
router.put("/:id", authMiddleware, updatePost);

module.exports = router;
