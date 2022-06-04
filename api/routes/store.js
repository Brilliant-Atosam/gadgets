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
// RESET PASSWOR DDEVICE
router.put("/password/reset", async (req, res) => {
  const { oldPassword, password } = req.body;
  try {
    const store = await Store.findOne({ id: req.query.id });
    if (!(await bcrypt.compare(oldPassword, store.password))) {
      res.status(401).json("Wrong password!");
    } else {
      await store.updateOne({ password: await bcrypt.hash(password, 10) });
      res.json("Reset was successful!");
    }
  } catch (err) {
    res.status(500).json("Oooops! Try again");
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
