const { StatusCodes } = require("http-status-codes");
const { User, Post } = require("../models");
const { PostService } = require("../services");

/**
 * V2 API's
 * POST : /api/v2/posts
 * req-body {}
 */
async function getPosts(req, res) {
  try {
    const posts = await PostService.getPost();
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: "Posts Data",
      data: posts,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch Posts",
      data: {},
      error: error,
    });
  }
}

/**
 * POST : /posts
 * req-body {}
 */
async function createPost(req, res) {
  const { email, password } = req.body;
  const { subject, description, isPublic, status } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    console.log(user);
    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Login Failed",
        data: {},
      });
    }
    const post = await Post.create({
      userId: user.id,
      username: user.name,
      subject,
      description,
      isPublic,
      status,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a Post",
      data: post,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.CREATED).json({
      success: false,
      message: "Failed to create a Post",
      data: {},
      error: error,
    });
  }
}

/**
 * DELETE : /posts/:id
 * req-body { email : "", password : "" }
 */

async function destroyPost(req, res) {
  const { email, password } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Login Failed",
        data: {},
      });
    }

    const deletedRow = await Post.destroy({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (deletedRow === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `Failed to delete a by Id : ${id} `,
        data: {},
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has Successfully Deleted a Post by Id : ${id}`,
      data: deletedRow,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.CREATED).json({
      success: false,
      message: "Failed to Delete Post",
      data: {},
      error: error,
    });
  }
}

/**
 * UPDATE : /posts/update/status/:id
 * req-body { email, password, status }
 * req-params { id }
 */

async function updatePostStatus(req, res) {
  const { email, password } = req.body;
  const { status } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Login Failed",
        data: {},
      });
    }
    const updatedRow = await Post.update(
      { status: status },
      {
        where: {
          id: id,
          userId: user.id,
        },
      }
    );
    const data = updatedRow[0];

    if (data < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to Update Post",
        data: {},
      });
    }
    const updatedData = await Post.findOne({ where: { id } });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has Successfully Updated a Post by Id : ${id}`,
      affectedRow: updatedRow,
      data: updatedData,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to Update Post",
      data: {},
      error: error,
    });
  }
}

/**
 * UPDATE : /posts/update/ispublic/:id
 * req-body { email, password, isPublic }
 * req-params { id }
 */
async function updatePostIsPublic(req, res) {
  const { email, password } = req.body;
  const { isPublic } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Login Failed",
        data: {},
      });
    }

    const updatedRow = await Post.update(
      { isPublic: isPublic },
      {
        where: {
          id: id,
          userId: user.id,
        },
      }
    );
    const data = updatedRow[0];

    if (data < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to Update Post",
        data: {},
      });
    }
    const updatedData = await Post.findOne({ where: { id } });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has Successfully Updated a Post by Id : ${id}`,
      affectedRow: updatedRow,
      data: updatedData,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to Update Post",
      data: {},
      error: error,
    });
  }
}

/**
 * UPDATE : /posts/update/:id
 * req-body { email, password, subject, description, isPublic, status }
 * req-params { id }
 */
async function updatePost(req, res) {
  const { email, password } = req.body;
  const { subject, description, isPublic, status } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (user === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Login Failed",
        data: {},
      });
    }

    const updatedRow = await Post.update(
      {
        subject: subject,
        description: description,
        isPublic: isPublic,
        status: status,
      },
      {
        where: {
          id: id,
          userId: user.id,
        },
      }
    );
    const data = updatedRow[0];

    if (data < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to Update Post",
        data: {},
      });
    }
    const updatedData = await Post.findOne({ where: { id } });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has Successfully Updated a Post by Id : ${id}`,
      affectedRow: updatedRow,
      data: updatedData,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to Update Post",
      data: {},
      error: error,
    });
  }
}
module.exports = {
  createPost,
  destroyPost,
  updatePostStatus,
  updatePostIsPublic,
  updatePost,
  getPosts,
};
