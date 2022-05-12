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
  createdAt: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
  updatedAt: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
});
module.exports = mongoose.model("Drug", drugSchema);
