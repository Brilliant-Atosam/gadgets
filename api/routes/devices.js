const router = require("express").Router();
const Device = require("../models/Device");
// GET ALL DEVICES
router.get("/", async (req, res) => {
  const { storeId } = req.query;
  try {
    const devices = await Device.find({ storeId });
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// ADD
router.post("/", async (req, res) => {
  const {
    name,
    brand,
    stock,
    specs,
    price,
    storeId,
    id,
    createdAt,
    updatedAt,
  } = req.body;
  try {
    const newDevice = new Device({
      storeId,
      name,
      brand,
      stock,
      specs,
      price,
      id,
      createdAt,
      updatedAt,
    });
    await newDevice.save();
    res.status(200).json("Item has been added successfully");
  } catch (err) {
    res.status(500).json("Something went wrong!");
    console.log(err.message);
  }
});
// EDIT DEVICE
router.put("/:id", async (req, res) => {
  try {
    await Device.findOneAndUpdate({ id: req.params.id }, { $set: req.body });
    res.json("Updated successfully");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
    console.log(err);
  }
});
// RESTOCK DEVICE
router.put("/restock/:id", async (req, res) => {
  try {
    await Device.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { stock: req.body.stock } }
    );
    res.json("Restocked successfully");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
    console.log(err.message);
  }
});
// DELETE DEVICE
router.delete("/:id", async (req, res) => {
  try {
    await Device.findOneAndDelete({ id: req.params.id });
    res.json("Deletion successful!");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
  }
});
module.exports = router;
