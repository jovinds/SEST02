const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/user");

// POST: http://localhost:3000/users/signup
router.post("/signup", signupUser);

// POST: http://localhost:3000/users/login
router.post("/login", loginUser);

module.exports = router;
