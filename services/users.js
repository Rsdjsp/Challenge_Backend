const UsersModel = require("../models/users");

class User {
  async create(userData) {
    const newUser = await UsersModel.create(userData);
    return newUser;
  }

  async getAll() {
    const user = await UsersModel.find({});
    return user;
  }

  async getByEmail(email) {
    const user = await UsersModel.findOne({ email: email });
    return user;
  }
}

module.exports = User;
