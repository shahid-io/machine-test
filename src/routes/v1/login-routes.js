const express = require("express");
const { LoginController } = require("../../controllers");
const { LoginMiddleware } = require("../../middlewares");
const router = express.Router();

/**
 * /api/v1/login GET
 */
router.get("/", LoginMiddleware.validateLoginRequest,LoginController.loginUser);
router.get("/posts", LoginController.userOwnPost);

module.exports = router;
