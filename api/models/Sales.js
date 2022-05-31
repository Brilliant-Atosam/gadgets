const mongoose = require("mongoose");
const moment = require("moment");
const salesSchema = new mongoose.Schema({
  id: String,
  storeId: String,
  device_id: String,
  device_name: String,
  quantity: Number,
  cost: Number,
  createdAt: String,
});
module.exports = mongoose.model("Sales", salesSchema);
