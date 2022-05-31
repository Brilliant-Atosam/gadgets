const router = require("express").Router();
const Drug = require("../models/Device");
const Sales = require("../models/Sales");
// GET ALL SALES
router.get("/", async (req, res) => {
  const { storeId } = req.query;
  try {
    const sales = await Sales.find({ storeId });
    res.json(sales);
  } catch (err) {
    res.status(500).json("Oooops! Try again.");
  }
});
// ADD SALES
router.post("/", async (req, res) => {
  const { id, device_id, device_name, quantity, cost, storeId, createdAt } =
    req.body;
  try {
    const device = await Drug.findOne({ id: device_id });
    if (device.stock < quantity) {
      res.status(401).json("Insufficient stock!");
    } else {
      const newSales = new Sales({
        id,
        storeId,
        device_id,
        device_name,
        quantity,
        cost,
        createdAt,
      });
      await newSales.save();
      await device.updateOne({ stock: device.stock - quantity });
      res.json("Sales completed successfully");
    }
  } catch (err) {
    res.status(500).json("Oooops! Please try again later");
    console.log(err.message);
  }
});
module.exports = router;
