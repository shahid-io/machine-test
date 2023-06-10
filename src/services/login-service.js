const { LoginRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");

//we can keep this local as well as global
const loginRepository = new LoginRepository();

async function userLogin(email, password) {
  try {
    const user = await loginRepository.login(email, password);
    return user;
  } catch (error) {
    if (error.name === "") {
      throw new AppError("Cannot login", StatusCodes.INTERNAL_SERVER_ERROR);
    }
    throw error;
  }
}

module.exports = {
  userLogin,
};
