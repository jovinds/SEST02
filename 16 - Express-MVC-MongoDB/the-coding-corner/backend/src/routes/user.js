const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/user");

// POST: http://localhost:3000/api/users/signup
router.post("/signup", signupUser);

// POST: http://localhost:3000/api/users/login
router.post("/login", loginUser);

module.exports = router;
