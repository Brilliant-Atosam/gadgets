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
    default: moment(new Date()).format("ddd DD/M/YY h:mm:ss"),
  },
  updatedAt: {
    type: String,
    default: moment(new Date()).format("ddd DD/M/YY h:mm:ss"),
  },
});
module.exports = mongoose.model("Drug", drugSchema);
