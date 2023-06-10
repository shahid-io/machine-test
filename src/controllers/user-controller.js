const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
/**
 * POST : /users
 * req-body {
 *  name: "shahid",
 *  phone: "XXXXXXXXXX",
 *  email: "shahid@gmail.com",
 *  password: "xxxxxxxxx"
 * }
 */
async function createUser(req, res) {
  try {
    const user = await UserService.createUser({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
    });
    // SuccessResponse.data = user;
    // return res.status(StatusCodes.CREATED).json(SuccessResponse);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created an User",
      data: user,
      error: {},
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while creating User.",
      data: {},
      error: error,
    });
    // ErrorResponse.error = error;
    // res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET : /users
 * req-body {}
 */
async function findAllUser(req, res) {
  try {
    const users = await UserService.getUser();
    SuccessResponse.data = users;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET : /users/:id
 * req-body {}
 */
async function findbyIdUser(req, res) {
  try {
    const user = await UserService.getUserById(req.params.id);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * DELETE : /users/:id
 * req-body {}
 */
async function destroyUser(req, res) {
  try {
    const user = await UserService.destroyUserById(req.params.id);
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * UPDATE : /users/:id
 * req-body {req.params.id, req.body}
 */
async function updateUser(req, res) {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);

    if (user[0] === 0) {
      throw new Error("User Not found");
    }
    SuccessResponse.data = user;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}
module.exports = {
  createUser,
  findAllUser,
  findbyIdUser,
  destroyUser,
  updateUser,
};
