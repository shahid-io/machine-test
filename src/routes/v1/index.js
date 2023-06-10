const express = require("express");

const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const loginRoutes = require("./login-routes");

const router = express.Router();

//  /users
router.use("/users", userRoutes);

// /posts
router.use("/posts", postRoutes);

// /login
router.use("/login", loginRoutes);

module.exports = router;
