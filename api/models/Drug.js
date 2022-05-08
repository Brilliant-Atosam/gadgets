const mongoose = require("mongoose");
const drugSchema = new mongoose.Schema(
  {
    name: String,
    id: String,
    stock: Number,
    supplier: String,
    implications: [String],
    dosage: String,
    price: Number,
    img: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Drug", drugSchema);
