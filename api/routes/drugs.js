const router = require("express").Router();
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
router.get("/:id", async (req, res) => {});
// ADD
router.post("/", async (req, res) => {
  const { name, stock, supplier, dosage, implications, price, img } = req.body;
  console.log(req.body);
  try {
    const newDrug = new Drug({
      name,
      stock,
      supplier,
      implications: implications.split(", "),
      dosage,
      price,
      img,
      id: 1,
    });
    await newDrug.save();
    res.status(200).json(newDrug);
  } catch (err) {
    res.status(500).json("Something went wrong!");
    console.log(err.message);
  }
});
// EDIT DRUG
router.put("/", async (req, res) => {});
// DELETE DRUG
router.delete("/", async (req, res) => {});
module.exports = router;
