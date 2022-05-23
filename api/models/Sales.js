const mongoose = require("mongoose");
const moment = require("moment");
const salesSchema = new mongoose.Schema({
  id: String,
  drug_id: String,
  storeId: String,
  drug_name: String,
  quantity: Number,
  cost: Number,
  createdAt: String,
});
module.exports = mongoose.model("Sales", salesSchema);
