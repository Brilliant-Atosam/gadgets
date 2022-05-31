const mongoose = require("mongoose");
const deviceSchema = new mongoose.Schema({
  id: String,
  storeId: String,
  name: String,
  stock: Number,
  brand: String,
  specs: [String],
  price: Number,
  createdAt: String,
  updatedAt: String,
});
module.exports = mongoose.model("Device", deviceSchema);
