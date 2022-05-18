const mongoose = require("mongoose");
const moment = require("moment");
const drugSchema = new mongoose.Schema({
  name: String,
  id: String,
  stock: Number,
  supplier: String,
  implications: [String],
  dosage: String,
  price: Number,
  img: String,
  createdAt: String,
  updatedAt: String,
});
module.exports = mongoose.model("Drug", drugSchema);
