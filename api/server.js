const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const server = express();
const router = require("./routes/auth");
const moment = require("moment");
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
// console.log(moment(new Date()).format("ddd D/M/YYYY h:mm:ss"));
// const storage = multer.diskStorage({
//   destination: "./public/drugs",
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       req.body?.name?.replace(" ", "_") + path.extname(file.originalname)
//     );
//   },
// });
// const uploadDrug = multer({
//   storage,
// }).single("drug");
// server.post("/upload", uploadDrug, async (req, res) => res.status(200));
// routes
server.use("/auth", require("./routes/auth"));
server.use("/drugs", require("./routes/drugs"));
server.use("/sales", require("./routes/sales"));
console.log(bcrypt.hashSync('pharm', 10));
server.listen(process.env.PORT || 8000, () => console.log("Server is running"));
