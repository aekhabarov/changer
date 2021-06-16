const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: "+7",
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
});

module.exports = model("User", userSchema);
