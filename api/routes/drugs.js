const router = require("express").Router();
// const { set } = require("mongoose");
const Drug = require("../models/Drug");
// GET ALL DRUGS
router.get("/", async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.status(200).json(drugs);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// GET SINGLE DRUG
router.get("/:id", async (req, res) => {
  try {
    const drug = await Drug.findOne({ id: req.params.id });
    drug
      ? res.json(drug)
      : res.status(404).json(`Drug with id '${req.params.id}' not found.`);
  } catch (err) {
    res.status(500).json("Oooops! Please try again.");
  }
});
// ADD
router.post("/", async (req, res) => {
  const { name, stock, supplier, dosage, implications, price, img } = req.body;
  console.log(req.body);
  try {
    const newDrug = new Drug({
      name,
      stock,
      supplier,
      implications,
      dosage,
      price,
      img,
      id: Math.floor(10000 + Math.random() * 10000),
    });
    console.log(newDrug);
    await newDrug.save();
    res.status(200).json("Drug has been added successfully");
  } catch (err) {
    res.status(500).json("Something went wrong!");
    console.log(err.message);
  }
});
// EDIT DRUG
router.put("/:id", async (req, res) => {
  try {
    const drug = await Drug.findOne({ id: req.params.id });
    await drug.updateOne({ $set: req.body }, { new: true });
    res.json("Updated successfully");
  } catch (err) {
    res.status(500).json("Oooops! Try again");
    console.log(err.message);
  }
});
// RESTOCK DRUG
router.put("/restock/:id", async (req, res) => {
  console.log(req.body);
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
