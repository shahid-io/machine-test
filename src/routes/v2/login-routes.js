const express = require("express");
const { LoginController } = require("../../controllers");
const { LoginMiddleware } = require("../../middlewares");
const router = express.Router();

/**
 * /api/v2/login GET
 */
router.get(
  "/",
  LoginMiddleware.validateLoginRequest,
  LoginController.userLogin
);

module.exports = router;
