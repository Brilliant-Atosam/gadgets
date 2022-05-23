const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Store = require("../models/Store");
// LOGIN
router.post("/", async (req, res) => {
  const { id, password } = req.body;
  try {
  const store = await Store.findOne({id})
  if(!store || !bcrypt.compare(password, store.password)){
    res.status(401).json('Invalid login details')
  } else{
res.json("Logged")
  }
  } catch (err) {
    res.status(500).json("Oooops! Please try again");
    console.log(err.messsages);
  }
});

module.exports = router;
