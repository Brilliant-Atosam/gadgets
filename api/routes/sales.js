const router = require("express").Router();
const moment = require("moment");
const Drug = require("../models/Drug");
const Sales = require("../models/Sales");
// GET ALL SALES
router.get("/", async (req, res) => {
  const sales = await Sales.find();
  res.json(sales);
});
// ADD SALES
router.post("/", async (req, res) => {
  const { drug_id, drug_name, quantity, cost, time } = req.body;
  console.log(req.body);
  try {
    const drug = await Drug.findOne({ id: drug_id });
    if (drug.stock < quantity) {
      res.status(401).json("Insufficient stock!");
    } else {
      const newSales = new Sales({
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
        drug_id,
        drug_name,
        quantity,
        cost,
      });
      await newSales.save();
      await drug.updateOne({ stock: drug.stock - quantity });
      res.json("Sales completed successfully");
    }
  } catch (err) {
    res.status(500).json("Oooops! Please try again later");
    console.log(err.message);
  }
});
module.exports = router;
