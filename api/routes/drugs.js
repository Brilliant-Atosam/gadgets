const router = require("express").Router();
// const { set } = require("mongoose");
const Drug = require("../models/Drug");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./public/drugs",
  filename: (req, file, cb) => {
    cb(null, req.body.name.replace(" ", "_") + path.extname(file.originalname));
  },
});
const uploadDrug = multer({
  storage,
}).single("drug");
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
router.post("/", (req, res) => {
  uploadDrug(req, res, async (err) => {
    if (err || req.file === undefined)
      req.status(500).json("Oooops! Try again.");
    else {
      console.log(req.file);
      const { name, stock, supplier, dosage, implications, price, img } =
        req.body;
      try {
        const newDrug = new Drug({
          name,
          stock,
          supplier,
          implications: implications.split(", "),
          dosage,
          price,
          img: req.file.filename,
          id: Math.floor(1000 + Math.random() * 9000),
        });
        await newDrug.save();
        res.status(200).json(newDrug);
      } catch (err) {
        res.status(500).json("Something went wrong!");
        console.log(err.message);
      }
    }
  });
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
