const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const moment = require("moment");
const Store = require("../models/Store");
// GET ALL DEVICES
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// ADD Store
router.post("/", async (req, res) => {
  const { name, password, phone } = req.body;

  try {
    const newStore = new Store({
      name,
      password: await bcrypt.hash(password, 10),
      phone,
      createdAt: moment().format("DD/MM/YYYY h:mm:ss"),
      id: (Math.floor(Math.random() * 100000) + 100000).toString().substring(1),
    });
    await newStore.save();
    res.status(200).json(newStore);
  } catch (err) {
    res.status(500).json("Something went wrong!");
    console.log(err.message);
  }
});
// SUBCRIBE
router.put("/:id", async (req, res) => {
  try {
    await Store.findOneAndUpdate(
      { id: req.params.id },
      {
        lastVerified: moment().format("MM/DD/YYYY"),
        nextVerification: moment().add(30, "days").format("MM/DD/YYYY"),
      }
    );
    res.status(200).json();
    console.log("The work is done");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
    console.log(err.message);
  }
});
// RESTOCK DDEVICE
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
// DELETE DDEVICE
router.delete("/:id", async (req, res) => {
  try {
    await Device.findOneAndDelete({ id: req.params.id });
    res.json("Deletion successful!");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
  }
});
module.exports = router;
