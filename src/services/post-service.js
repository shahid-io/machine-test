const { PostRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/error/app-error");

const postRepository = new PostRepository();

async function createPost(data) {
  try {
    const post = await postRepository.create(data);
    return post;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new AppError(
        "Cannot create a new Post{}",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
}

async function getPost() {
  try {
    const posts = await postRepository.getAll();
    return posts;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested Posts are not present",
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Posts",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getPostById(id) {
  try {
    const post = await postRepository.get(id);
    return post;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        `The Post you requested with Id : ${id}  isn't present`,
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Post",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyPostById(id) {
  try {
    const post = await postRepository.destroy(id);
    return post;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Post you requested to delete isn't present",
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Post",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updatePost(id, data) {
  try {
    const post = await postRepository.update(id, data);
    return post;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Post you requested to update isn't present",
        error.StatusCodes
      );
    }
    throw new AppError(
      "Cannot fetch data of all the Post",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createPost,
  getPost,
  getPostById,
  destroyPostById,
  updatePost,
};
