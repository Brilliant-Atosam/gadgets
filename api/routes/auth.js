const router = require("express").Router();
const bcrypt = require("bcryptjs");
// LOGIN
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const isEmail = await bcrypt.compare(email, process.env.LOGIN_EMAIL),
      isPassword = await bcrypt.compare(password, process.env.LOGIN_PASSWORD);
    isEmail && isPassword
      ? res.json("Logged")
      : res.status(401).json("Invalid login credentials");
  } catch (err) {
    res.status(500).json("Oooops! Please try again");
    console.log(err);
  }
});

module.exports = router;
