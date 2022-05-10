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

// routes
server.get("/", (req, res) => {
  res.send("Hello Philomina Fosua");
});
server.use("/auth", require("./routes/auth"));
server.use("/drugs", require("./routes/drugs"));
server.use("/sales", require("./routes/sales"));
server.listen(process.env.PORT || 3000, () => console.log("Server is running"));
