const mongoose = require("mongoose");
const moment = require("moment");
const salesSchema = new mongoose.Schema({
  id: String,
  drug_id: String,
  drug_name: String,
  quantity: Number,
  cost: Number,
  createdAt: {
    type: String,
    default: moment(new Date()).format("ddd D/M/YY h:mm:ss"),
  },
});
module.exports = mongoose.model("Sales", salesSchema);
