const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
