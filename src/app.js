require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const conn = require("./db/conn.js");

const routes = require("./routes/index.js");

app.use("/api", routes);

const IP = process.env.API_SERVER;
const PORT = process.env.API_PORT;

conn()
  .then((connection) => {
    app.listen(PORT, IP, function () {
      console.log(`API server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`API connection error: ${error}`);
  });
