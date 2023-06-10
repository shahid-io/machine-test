const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();

/**
 * /api/v1/users POST
 */
router.post("/", UserController.createUser);

/**
 * /api/v1/users GET
 */
router.get("/", UserController.findAllUser);

/**
 * /api/v1/users/:id GET
 */
router.get("/:id", UserController.findbyIdUser);

/**
 *  /api/v1/users/:id DELETE
 */

router.delete("/:id", UserController.destroyUser);

/**
 *  /api/v1/users/:id UPDATE
 */
router.patch("/:id", UserController.updateUser);

module.exports = router;
