const { CrudRepository } = require("./crud-repository");
const { User } = require("../models");

class LoginRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  
}

module.exports = LoginRepository;
