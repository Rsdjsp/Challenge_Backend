const { mongoose } = require("../config/db");
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const UsersModel = mongoose.model("users", usersSchema);

module.exports = UsersModel;
