const mongoose = require("mongoose");
const salesSchema = new mongoose.Schema(
  {
    id: String,
    drug_id: String,
    drug_name: String,
    quantity: Number,
    price: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Sales", salesSchema);
