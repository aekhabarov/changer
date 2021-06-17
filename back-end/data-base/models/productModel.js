const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    min: 2,
  },
  description: {
    type: String,
    min: 50,
  },
  mapCoords: {
    type: Array,
    default: [50.0, 50.0],
  },
});

module.exports = model("Product", schema);
