const { StatusCodes } = require("http-status-codes");
class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const response = await this.model.findOne({
        where: {
          email: email,
          password: password,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      if (!response) {
        throw new Error({ Message: "response not found" });
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    try {
      const response = await this.model.findByPk(id);
      console.log(response);
      if (!response) {
        throw new Error({ message: "Response not found" });
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    //data is object {col: value}
    try {
      const response = await this.model.update(data, {
        where: { id: id },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { CrudRepository };
