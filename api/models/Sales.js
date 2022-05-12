const mongoose = require("mongoose");
const moment = require("moment");
const salesSchema = new mongoose.Schema({
  id: String,
  drug_id: String,
  drug_name: String,
  quantity: Number,
  cost: Number,
  createdAt: { type: String, default: moment().format("DD-MM-YYYY") },
});
module.exports = mongoose.model("Sales", salesSchema);
