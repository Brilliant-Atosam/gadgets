const { json } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const server = express();
require("dotenv").config();
// DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION_STRING, (err) => {
  err ? console.log(err.message) : console.log("Connected to DB");
});
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use("static", express.static("public"));
// CORS SETTINGS
server.use(cors());
// UPLOAD
const storage = multer.diskStorage({
  destination: "./public/drugs",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
  },
});
const uploadDrug = multer({
  storage,
});
// routes
server.post("/", uploadDrug.single("drug"), (req, res) => {
  res.send("Hello Philomina Fosua");
});
server.use("/auth", require("./routes/auth"));
server.use("/drugs", require("./routes/drugs"));
console.log(bcrypt.hashSync("philo", 10));
server.listen(process.env.PORT || 3000, () => console.log("Server is running"));
