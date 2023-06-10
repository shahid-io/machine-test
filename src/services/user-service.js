const { UserRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");

//we can keep this local as well as global
const userRepository = new UserRepository();

async function createUser(data) {
  try {
    const user = await userRepository.create(data);
    console.log(user);
    return user;
  } catch (error) {
    if (error.name === "") {
      throw new AppError(
        "Cannot create a new User{}",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
}

async function getUser() {
  try {
    const users = await userRepository.getAll();
    return users;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested Users are not present",
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Users",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUserById(id) {
  try {
    const user = await userRepository.get(id);
    return user;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `The User you requested with Id : ${id}  isn't present`,
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the User",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyUserById(id) {
  try {
    const user = await userRepository.destroy(id);
    return user;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The User you requested to delete isn't present",
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the User",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateUser(id, data) {
  try {
    const user = await userRepository.update(id, data);
    return user;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The User you requested to update isn't present",
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the User",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  destroyUserById,
  updateUser,
};
