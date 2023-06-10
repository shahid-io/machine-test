const { StatusCodes } = require("http-status-codes");
const { User, Post } = require("../models");
const { LoginService } = require("../services");

/**
 * GET : /api/v2/login
 * req-body {email: "", password: ""}
 */
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await LoginService.userLogin(email, password);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Login Failed (Invalid email or password)",
      });
    }
    console.log("Login success");
    console.log(Post);
    const posts = await Post.findAll({
      where: {
        isPublic: true,
        status: "active",
      },
      limit: 10,
    });
    console.log(posts);

    const filteredPosts = posts.map(
      ({ id, username, subject, description, createdAt }) => {
        return { id, username, subject, description, createdAt };
      }
    );
    
    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has been logged In successfully`,
      data: filteredPosts,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: true,
      message: `Failed to process the data`,
      data: {},
      error: error,
    });
  }
}

/**
 * GET : /login
 * req-body {email: "", password: ""}
 */

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    if (user === null) {
      ErrorResponse.message = "Login failed (credentials doesn't matched)";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    const posts = await Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      where: {
        isPublic: true,
        status: "active",
      },
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has been logged in, Here is the posts to see`,
      data: posts,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.CREATED).json({
      success: false,
      message: "Failed to login",
      data: {},
      error: error,
    });
  }
}

/**
 * User specific Posts (Personal post to see)
 */
async function userOwnPost(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    if (user === null) {
      ErrorResponse.message = "Login failed (credentials doesn't matched)";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    const posts = await Post.findAll({
      where: {
        userId: user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${user.name} has been logged in, Here is the posts to see`,
      data: posts,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.CREATED).json({
      success: false,
      message: "Failed to login",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  loginUser,
  userOwnPost,
  userLogin,
};
