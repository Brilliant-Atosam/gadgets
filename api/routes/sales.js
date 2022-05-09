const router = require("express").Router();
const Drug = require("../models/Drug");
const Sales = require("../models/Sales");
// GET ALL SALES
router.get("/", async (req, res) => {
  const sales = await Sales.find();
  res.json(sales)
});
// GET ALL SALES PER DAY
router.get("/day", async (req, res) => {
  res.send("Drugs");
});
// GET ALL SALES PER WEEK
router.get("/week", async (req, res) => {
  res.send("Drugs");
});
// GET ALL SALES PER MONTH
router.get("/month", async (req, res) => {
  res.send("Drugs");
});
// GET ALL SALES PER YEAR
router.get("/year", async (req, res) => {
  res.send("Drugs");
});
// ADD SALES
router.post("/", async (req, res) => {
  const { drug_id, drug_name, quantity } = req.body;
  console.log(req.body);
  try {
    const drug = await Drug.findOne({ id: drug_id });
    const newSales = new Sales({
      id: (Math.floor(Math.random() * 10000) + 10000).toString().substring(1),
      drug_id,
      drug_name,
      quantity,
      price: quantity * drug.price,
    });
    await newSales.save();
    await drug.updateOne({ stock: drug.stock - quantity });
    res.json(newSales);
  } catch (err) {
    res.status(500).json("Oooops! Please try again later");
    console.log(err.message);
  }
});

// REVERSE SALES
router.delete("/:id", async (req, res) => {

});

module.exports = router;
