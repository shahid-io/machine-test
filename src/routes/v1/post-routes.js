const express = require("express");
const { PostController } = require("../../controllers");
const router = express.Router();

/**
 * /api/v1/posts POST
 */
router.post("/", PostController.createPost);

/**
 *  /api/v1/posts/:id DELETE
 */

router.delete("/:id", PostController.destroyPost);

/**
 * update : status
 *  /api/v1/posts/update/:id UPDATE
 */
router.patch("/update/:id", PostController.updatePost);


/**
 * update : status
 *  /api/v1/posts/update/status/:id UPDATE
 */
router.patch("/update/status/:id", PostController.updatePostStatus);

/**
 * update : isPublic
 *  /api/v1/posts/update/isPublic/:id UPDATE
 */
router.patch("/update/ispublic/:id", PostController.updatePostIsPublic);

module.exports = router;
