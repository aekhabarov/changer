const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required,
  },
  avatar: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: "+7",
  },
});

module.exports = model("User", schema);
