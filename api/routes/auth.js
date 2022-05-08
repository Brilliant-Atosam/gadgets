const router = require("express").Router();
// LOGIN
router.get("/", async (req, res) => {
    const {email, password} = req.body
  res.send("auth");
});

module.exports = router;
