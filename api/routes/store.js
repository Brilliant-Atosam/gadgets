const router = require("express").Router();
const bcrypt = require("bcryptjs/dist/bcrypt");
const moment = require("moment");
// const { set } = require("mongoose");
const Store = require("../models/Store");
// GET ALL DRUGS
router.get("/", async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.status(200).json(drugs);
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
        id: (Math.floor(Math.random() * 100000) + 100000)
        .toString()
        .substring(1),
      });
      await newStore.save();
      res.status(200).json(newStore);
    } catch (err) {
      res.status(500).json("Something went wrong!");
      console.log(err.message);
    }
  
});
// EDIT DRUG
router.put("/:id", async (req, res) => {
  try {
    const drug = await Drug.findOne({ id: req.params.id });
    await drug.updateOne({ $set: req.body });
    res.json("Updated successfully");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
    console.log(err.message);
  }
});
// RESTOCK DRUG
router.put("/restock/:id", async (req, res) => {
  try {
    await Drug.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { stock: req.body.stock } }
    );
    res.json("Restocked successfully");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
    console.log(err.message);
  }
});
// DELETE DRUG
router.delete("/:id", async (req, res) => {
  try {
    await Drug.findOneAndDelete({ id: req.params.id });
    res.json("Deletion successful!");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
  }
});
module.exports = router;
