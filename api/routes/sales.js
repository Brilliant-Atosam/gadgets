const router = require("express").Router();
const Drug = require("../models/Drug");
// GET ALL SALES
router.get("/", async (req, res) => {
  res.send("Drugs");
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
router.post("/", async (req, res) => {});

// REVERSE SALES
router.delete("/:id", async (req, res) => {});

module.exports = router;
